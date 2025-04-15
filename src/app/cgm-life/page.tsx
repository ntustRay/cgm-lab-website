// src/app/cgm-life/page.tsx
import PhotoGallery from "@/components/PhotoGallery/PhotoGallery";
import Banner from "@/components/shared/Banner";
import photosData from "../../../public//data/photos.json";
import photosInfo from "../../../public//data/photosInfo.json";

export default function CGMLifePage() {
  // Create maps for both dates and titles
  const albumInfoMap = photosInfo.reduce((map, item) => {
    if (item.name) {
      map[item.name] = {
        date: item.date,
        title: item.title
      };
    }
    return map;
  }, {} as Record<string, { date: string, title: string }>);

  // Add dates and titles to albums
  const albumsWithInfo = photosData.map(album => ({
    ...album,
    date: albumInfoMap[album.name]?.date || "1900-01-01", // Default date for items without a match
    title: albumInfoMap[album.name]?.title || album.name // Use title if available, otherwise use name
  }));

  // Sort albums by date (newest first)
  const sortedAlbums = [...albumsWithInfo].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <>
      <Banner />
      <div>
        <div className="container mx-auto px-4 py-8">
          <section>
            <PhotoGallery albums={sortedAlbums} />
          </section>
        </div>
      </div>
    </>
  );
}