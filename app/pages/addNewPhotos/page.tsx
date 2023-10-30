import React from "react";
import UploadForm from "@/app/components/UploadForm";
import { getLatestPhotos } from "@/actions/getLatestPhotos";
import PhotoList from "@/app/components/PhotoList";
import Link from "next/link";

const Home = async () => {
  const photos = await getLatestPhotos();

  return (
    <div>
      <h1>Next JS server actions upload image files</h1>
      <UploadForm />

      <h1>All photos.</h1>
      <PhotoList photos={photos || []} />
      <Link href="/">Home</Link>
    </div>
  );
};

export default Home;
