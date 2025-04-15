"use client";

import {Dialog} from "@headlessui/react";
import {ChevronLeftIcon, ChevronRightIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useCallback, useEffect, useState} from "react";

type Album = {
  name: string;
  photos: string[];
};

type PhotoGalleryProps = {
  albums: Album[];
};

export default function PhotoGallery({albums}: PhotoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Only use albums with photos
  const nonEmptyAlbums = albums.filter(album => album.photos.length > 0);

  // Handlers for previous/next navigation
  const handlePrevious = useCallback(() => {
    if (selectedAlbum && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(selectedPhotoIndex === 0 ? selectedAlbum.photos.length - 1 : selectedPhotoIndex - 1);
    }
  }, [selectedAlbum, selectedPhotoIndex]);

  const handleNext = useCallback(() => {
    if (selectedAlbum && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === selectedAlbum.photos.length - 1 ? 0 : selectedPhotoIndex + 1
      );
    }
  }, [selectedAlbum, selectedPhotoIndex]);

  // Handle keyboard events for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious, selectedPhotoIndex]);

  return (
    <div className="mt-8 px-4 sm:px-6 md:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-[#BD3C3F] mb-4 sm:mb-6">Photo Albums</h2>

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {nonEmptyAlbums.map(album => (
          <div
            key={album.name}
            className="cursor-pointer bg-white border border-gray-200 shadow-sm rounded overflow-hidden hover:shadow-lg hover:scale-[1.03] hover:border-[#1b1b1b] transition-all duration-200"
            onClick={() => setSelectedAlbum(album)}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={album.photos[0]}
                alt={album.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm sm:text-base text-black">{album.name}</h3>
              <p className="text-xs sm:text-sm text-[#606060]">{album.photos.length} photos</p>
            </div>
          </div>
        ))}
      </div>

      {/* Album Photos Modal */}
      {selectedAlbum && (
        <Dialog
          open={true}
          onClose={() => setSelectedAlbum(null)}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
            <div className="fixed inset-0 bg-black opacity-50" />
            <Dialog.Panel className="relative bg-white rounded-lg max-w-6xl w-full mx-auto p-3 sm:p-4 md:p-6 z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-3 sm:mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
                <Dialog.Title className="text-base sm:text-lg font-medium text-[#BD3C3F] truncate pr-2">
                  {selectedAlbum.name}
                </Dialog.Title>
                <button
                  type="button"
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setSelectedAlbum(null)}
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {selectedAlbum.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity duration-200 rounded overflow-hidden"
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}

      {/* Individual Photo Modal */}
      {selectedAlbum && selectedPhotoIndex !== null && (
        <Dialog
          open={true}
          onClose={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-95" aria-hidden="true"></div>
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10 px-2 sm:px-4">
              {/* Photo Container */}
              <div className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh]">
                <Image
                  src={selectedAlbum.photos[selectedPhotoIndex]}
                  alt={`Photo ${selectedPhotoIndex + 1}`}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />

                {/* Close button repositioned to overlay on the photo area */}
                <button
                  type="button"
                  className="absolute top-2 right-2 z-20 bg-black/40 p-1.5 rounded-[10px] text-white hover:bg-black/60 focus:outline-none cursor-pointer transition-colors"
                  onClick={() => setSelectedPhotoIndex(null)}
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                {/* Navigation Buttons (Absolutely Positioned) */}
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/30 p-1 sm:p-2 rounded-[10px] text-white hover:bg-black/50 transition cursor-pointer"
                  onClick={handlePrevious}
                  aria-label="Previous photo"
                >
                  <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>

                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 p-1 sm:p-2 rounded-[10px] text-white hover:bg-black/50 transition"
                  onClick={handleNext}
                  aria-label="Next photo"
                >
                  <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8" />
                </button>
              </div>

              {/* Photo Navigation Controls */}
              <div className="flex justify-between items-center w-full max-w-5xl mt-2 sm:mt-4 px-2">
                {!isMobile && (
                  <button
                    className="bg-white/20 py-1 px-3 rounded-full text-white hover:bg-white/30 transition text-xs sm:text-sm"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}

                <div className="text-white text-xs sm:text-sm mx-auto">
                  {selectedPhotoIndex + 1} / {selectedAlbum.photos.length}
                </div>

                {!isMobile && (
                  <button
                    className="bg-white/20 py-1 px-3 rounded-full text-white hover:bg-white/30 transition text-xs sm:text-sm"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}