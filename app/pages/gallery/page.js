"use client";

import React, { useEffect, useState } from "react";
import PhotoListPublic from "@/app/components/PhotoListPublic";
import { getAllPhotos } from "@/actions/uploadActions";
import Link from "next/link";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [colorSorting, setColorSorting] = useState("none"); // Default to no color sorting
  const [supportSorting, setSupportSorting] = useState("none"); // Default to no sorting by support

  // Function to fetch photos and set the state
  const fetchPhotos = async () => {
    const photos = await getAllPhotos();
    setPhotos(photos);
  };

  // Call fetchPhotos when the component mounts
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Function to handle sorting by color
  const handleColorSort = (choice) => {
    setColorSorting(choice);
  };

  // Function to handle sorting by support
  const handleSupportSort = (choice) => {
    setSupportSorting(choice);
  };

  // Function to reset the filters and show all photos
  const handleReset = () => {
    setColorSorting("none");
    setSupportSorting("none");
  };

  // Modify the filteredPhotos array to include both color and support filtering
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

    return colorFiltered && supportFiltered;
  });

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <label htmlFor="colorSorting">Filter by Color:</label>
        <select
          id="colorSorting"
          value={colorSorting}
          onChange={(e) => handleColorSort(e.target.value)}
        >
          <option value="none">None</option>
          <option value="color">Color</option>
          <option value="nb">Black & White</option>
        </select>
      </div>
      <div>
        <label htmlFor="supportSorting">Filter by Support:</label>
        <select
          id="supportSorting"
          value={supportSorting}
          onChange={(e) => handleSupportSort(e.target.value)}
        >
          <option value="none">None</option>
          <option value="analog">Analog</option>
          <option value="digital">Digital</option>
        </select>
      </div>
      <button onClick={handleReset}>Reset Filters</button>
      <PhotoListPublic photos={filteredPhotos} />
      <Link href="/">Home</Link>
    </div>
  );
};

export default Gallery;
