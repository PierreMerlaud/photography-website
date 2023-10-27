"use client";
import PhotoCardPublic from "./PhotoCardPublic";

const PhotoListPublic = ({ photos }) => {
  return (
    <div className="photoListDiv">
      {photos.map((photo) => (
        <PhotoCardPublic
          //uses the optional chaining operator (?.) to handle cases where the public_id property may not exist, preventing potential errors.
          key={photo?.public_id}
          url={photo?.secure_url}
        />
      ))}
    </div>
  );
};

export default PhotoListPublic;
