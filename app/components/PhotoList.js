import React from "react";
import PhotoCard from "./PhotoCard";

const PhotoList = ({ photos }) => {
  return (
    <div>
      {photos.map((photo) => (
        <PhotoCard key={photo?.public_id} url={photo?.secure_url} />
      ))}
    </div>
  );
};

export default PhotoList;
