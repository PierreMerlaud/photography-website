"use client";
import PhotoCard from "./PhotoCard";
import { deletePhoto } from "@/actions/uploadActions";

const PhotoList = ({ photos }) => {
  async function handleDeletePhoto(public_id) {
    await deletePhoto(public_id);
  }
  return (
    <div className="photoListDiv">
      {Array.isArray(photos) ? (
        photos.map((photo) => (
          <PhotoCard
            key={photo?.public_id}
            url={photo?.secure_url}
            onClick={() => handleDeletePhoto(photo?.public_id)}
          />
        ))
      ) : (
        // Handle the case when photos is not an array, e.g., display a message or an empty state.
        <p>No photos available</p>
      )}
    </div>
  );
};

export default PhotoList;
