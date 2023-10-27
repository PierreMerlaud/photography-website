import React from "react";
import PhotoList from "@/app/components/PhotoList";
import { getAllPhotos } from "@/actions/uploadActions";

const Home = async () => {
  const photos = await getAllPhotos();

  return (
    <div>
      <h1>Gallery</h1>
      <PhotoList photos={photos || []} />
    </div>
  );
};

export default Home;
