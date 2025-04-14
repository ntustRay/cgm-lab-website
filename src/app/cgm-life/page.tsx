// src/app/cgm-life/page.tsx
import PhotoGallery from "@/components/PhotoGallery/PhotoGallery";
import Banner from "@/components/shared/Banner";
import photosData from "@/data/photos.json";
import photosOrderByDate from "@/data/photosOrderByDate.json";

export default function CGMLifePage() {
  // Create a map of album names to dates from photosOrderByDate
  const albumDatesMap = photosOrderByDate.reduce((map, item) => {
    if (item.name) {
      map[item.name] = item.date;
    }
    return map;
  }, {} as Record<string, string>);

  // Add dates to albums
  const albumsWithDates = photosData.map(album => ({
    ...album,
    date: albumDatesMap[album.name] || "1900-01-01" // Default date for items without a match
  }));

  // Sort albums by date (newest first)
  const sortedAlbums = [...albumsWithDates].sort((a, b) => {
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