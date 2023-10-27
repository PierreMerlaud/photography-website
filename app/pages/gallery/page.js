"use client";

import React, { useEffect, useState } from "react";
import PhotoList from "@/app/components/PhotoList";
import { getAllPhotos } from "@/actions/uploadActions";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [sorting, setSorting] = useState("none"); // Default to no sorting

  // Function to fetch photos and set the state
  const fetchPhotos = async () => {
    const photos = await getAllPhotos();
    setPhotos(photos);
  };

  // Call fetchPhotos when the component mounts
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Function to handle sorting
  const handleSort = (choice) => {
    setSorting(choice);
  };

  // Filter and sort the photos based on the sorting choice
  const filteredPhotos = photos.filter((photo) => {
    if (sorting === "color") {
      return photo.color === true; // Filter by color photos
    } else if (sorting === "nb") {
      return photo.color === false; // Filter by black & white photos
    }
    return true; // No filtering
  });

  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <label htmlFor="sorting">Filter by color:</label>
        <select
          id="sorting"
          value={sorting}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="none">None</option>
          <option value="color">Color</option>
          <option value="nb">Black & White</option>
        </select>
      </div>
      <PhotoList photos={filteredPhotos} />
    </div>
  );
};

export default Gallery;
