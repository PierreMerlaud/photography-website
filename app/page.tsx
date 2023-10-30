import React from "react";
import PhotoListPublic from "./components/PhotoListPublic";
import Link from "next/link";
import { getLatestPhotos } from "@/actions/getLatestPhotos";

const Home = async () => {
  const photos = await getLatestPhotos();

  return (
    <div>
      <h1>Latest photos.</h1>
      <PhotoListPublic photos={photos || []} />
      <Link href="/pages/gallery">gallery</Link>
      <Link href="/pages/addNewPhotos">add new photos</Link>
    </div>
  );
};

export default Home;
