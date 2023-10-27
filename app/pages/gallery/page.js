"use client";

import React, { useEffect, useState } from "react";
import PhotoListPublic from "@/app/components/PhotoListPublic";
import { getAllPhotos } from "@/actions/uploadActions";
import Link from "next/link";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [colorSorting, setColorSorting] = useState("none"); // Default to no color sorting
  const [supportSorting, setSupportSorting] = useState("none"); // Default to no sorting by support
  const [cameraSorting, setCameraSorting] = useState("none");

  // Function to fetch photos and set the state
  const fetchPhotos = async () => {
    const photos = await getAllPhotos();
    setPhotos(photos);
  };

  // Call fetchPhotos when the component mounts
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Function to reset the filters and show all photos
  const handleReset = () => {
    setColorSorting("none");
    setSupportSorting("none");
    setCameraSorting("none");
  };

  // Modify the filteredPhotos array to include both filterings
  const filteredPhotos = photos.filter((photo) => {
    const colorFiltered =
      colorSorting === "color"
        ? photo.color === true
        : colorSorting === "nb"
        ? photo.color === false
        : true;

    const supportFiltered =
      supportSorting === "analog"
        ? photo.analog === true
        : supportSorting === "digital"
        ? photo.analog === false
        : true;

    const cameraFiltered =
      cameraSorting === "none" ? true : photo.camera === cameraSorting;

    return colorFiltered && supportFiltered && cameraFiltered;
  });

  // Get the list of unique camera models from the photos
  //   const cameraOptions = Array.from(
  //     new Set(photos.map((photo) => photo.camera))
  //   );
  const getAllCameras = (data) => {
    const cameras = [];
    for (const photo of data) {
      if (photo.camera && !cameras.includes(photo.camera)) {
        cameras.push(photo.camera);
      }
    }
    return cameras;
  };
  const allCameras = getAllCameras(photos);

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <h3>Filtres</h3>
        <label htmlFor="colorSorting">Couleur / Noir et blanc:</label>
        <select
          id="colorSorting"
          value={colorSorting}
          onChange={(e) => setColorSorting(e.target.value)}
        >
          <option value="none">Toutes les photos</option>
          <option value="color">Color</option>
          <option value="nb">Black & White</option>
        </select>
      </div>
      <div>
        <label htmlFor="supportSorting">Argentique / Numérique</label>
        <select
          id="supportSorting"
          value={supportSorting}
          onChange={(e) => setSupportSorting(e.target.value)}
        >
          <option value="none">Toutes les photos</option>
          <option value="analog">Argentique</option>
          <option value="digital">Numérique</option>
        </select>
      </div>
      <div>
        <label htmlFor="cameraSorting">Appareils</label>
        <select
          id="cameraSorting"
          value={cameraSorting}
          onChange={(e) => setCameraSorting(e.target.value)}
        >
          <option value="none">Tous les appareils</option>
          {allCameras.map((cameraModel, index) => (
            <option key={index} value={cameraModel}>
              {cameraModel}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleReset}>Réinitialiser tous les filtres</button>
      <PhotoListPublic photos={filteredPhotos} />
      <Link href="/">Home</Link>
    </div>
  );
};

export default Gallery;
