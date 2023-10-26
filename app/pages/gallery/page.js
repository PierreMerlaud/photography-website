// "use client";
// import React from "react";
// import PhotoCard from "@/app/components/PhotoCard";
// import { getAllPhotos } from "@/actions/uploadActions";
// import { useState } from "react";

// const PhotoSortingPage = async ({ photos }) => {
//   const photos = await getAllPhotos();
//   // State variables
//   const [sortingPreference, setSortingPreference] = useState("color"); // Default to sorting by color
//   const [sortedPhotos, setSortedPhotos] = useState(photos);

//   // Handle sorting preference change
//   const handleSortingPreferenceChange = (event) => {
//     const preference = event.target.value;
//     setSortingPreference(preference);
//     sortPhotos(preference);
//   };

//   // Sorting function
//   const sortPhotos = (preference) => {
//     // Create a copy of the photos array to avoid mutating the original array
//     const sorted = [...photos];

//     // Sort the photos based on the preference
//     if (preference === "color") {
//       sorted.sort((a, b) => a.color - b.color);
//     } else if (preference === "blackAndWhite") {
//       sorted.sort((a, b) => b.color - a.color);
//     }

//     // Update the sorted photos in the state
//     setSortedPhotos(sorted);
//   };

//   return (
//     <div>
//       <h1>Photo Sorting Page</h1>
//       <div>
//         <label>Sort by:</label>
//         <select
//           value={sortingPreference}
//           onChange={handleSortingPreferenceChange}
//         >
//           <option value="color">Color</option>
//           <option value="blackAndWhite">Black & White</option>
//         </select>
//       </div>
//       <div className="photoListDiv">
//         {sortedPhotos.map((photo) => (
//           <PhotoCard key={photo.public_id} url={photo.secure_url} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PhotoSortingPage;
