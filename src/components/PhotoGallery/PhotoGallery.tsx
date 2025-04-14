"use client";

import {Dialog} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useState} from "react";


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

  // Filter out albums with no photos
  const nonEmptyAlbums = albums.filter(album => album.photos.length > 0);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-[#BD3C3F] mb-4">Photo Albums</h2>

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nonEmptyAlbums.map((album) => (
          <div
            key={album.name}
            className="cursor-pointer bg-white border border-gray-200 shadow-sm rounded overflow-hidden hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedAlbum(album)}
          >
            <div className="relative h-40">
              {album.photos.length > 0 && (
                <Image
                  src={album.photos[0]}
                  alt={album.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-black">{album.name}</h3>
              <p className="text-xs text-[#606060]">{album.photos.length} photos</p>
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
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50" />

            <div className="relative bg-white rounded-lg max-w-6xl w-full mx-auto p-6 z-10">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-lg font-medium text-[#BD3C3F]">
                  {selectedAlbum.name}
                </Dialog.Title>
                <button
                  type="button"
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setSelectedAlbum(null)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {selectedAlbum.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative h-40 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <Image
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
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
            <div className="fixed inset-0 bg-black opacity-90" />
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
              <button
                type="button"
                className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                onClick={() => setSelectedPhotoIndex(null)}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>

              <div className="relative w-full max-w-4xl h-[80vh]">
                <Image
                  src={selectedAlbum.photos[selectedPhotoIndex]}
                  alt={`Photo ${selectedPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex justify-between w-full max-w-4xl mt-4">
                <button
                  className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition"
                  onClick={() => setSelectedPhotoIndex((prev) => (prev === 0 ? selectedAlbum.photos.length - 1 : prev! - 1))}
                >
                  Previous
                </button>
                <div className="text-white">
                  {selectedPhotoIndex + 1} / {selectedAlbum.photos.length}
                </div>
                <button
                  className="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition"
                  onClick={() => setSelectedPhotoIndex((prev) => (prev === selectedAlbum.photos.length - 1 ? 0 : prev! + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}