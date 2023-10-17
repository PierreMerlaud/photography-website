"use client";
import PhotoCard from "./PhotoCard";
import { deletePhoto } from "@/actions/uploadActions";

const PhotoList = ({ photos }) => {
  async function handleDeletePhoto(public_id) {
    await deletePhoto(public_id);
  }
  return (
    <div className="photoListDiv">
      {photos.map((photo) => (
        <PhotoCard
          //uses the optional chaining operator (?.) to handle cases where the public_id property may not exist, preventing potential errors.
          key={photo?.public_id}
          url={photo?.secure_url}
          onClick={() => handleDeletePhoto(photo?.public_id)}
        />
      ))}
    </div>
  );
};

export default PhotoList;
