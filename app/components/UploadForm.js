// import React from "react";
"use client";
import { useRef, useState } from "react";
import PhotoCard from "./PhotoCard";
import ButtonSubmit from "./ButtonSubmit";
import { revalidate, uploadPhoto } from "@/actions/uploadActions";

const UploadForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState(""); // Define the title state
  const [analog, setAnalog] = useState("");
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState(""); // Define the description state

  async function handleInputFiles(e) {
    const files = e.target.files;

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        //only accept image files less than 1mb in size.
        return file;
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
    // console.log("newFiles", newFiles);
    //reset a form element to its initial state, to prepare it for a new set of inputs after a user submit.
    formRef.current.reset();
  }

  //iterate in files array and push in the newFiles array only indexes not equal to the selected file.
  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  //handles the preparation of form data for uploading selected image files.
  async function handleUpload() {
    if (!files.length) return alert("No image files are selected.");
    if (files.length > 3) return alert("Upload up to 3 image files.");

    const formData = new FormData();
    formData.append("title", title); // Add title to the formData
    formData.append("analog", analog);
    formData.append("camera", camera);
    formData.append("film", film);
    formData.append("color", color);
    formData.append("description", description); // Add description to the formData

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadPhoto(formData);
    if (res?.msg) alert(`Success: ${res?.msg}`);
    if (res?.errMsg) alert(`Error: ${res?.errMsg}`);

    setFiles([]);
    formRef.current.reset();
    revalidate("/");
  }

  return (
    //formRef will point to this specific <form>
    <form action={handleUpload} ref={formRef}>
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputFiles}
        />
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Analog ?"
            value={analog}
            onChange={(e) => setAnalog(e.target.value)}
          />
          <input
            type="text"
            placeholder="Camera"
            value={camera}
            onChange={(e) => setCamera(e.target.value)}
          />
          <input
            type="text"
            placeholder="Film"
            value={film}
            onChange={(e) => setFilm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Color ?"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <h5>
          (*) Only accept image files less than 1mb in size. Up to 3 photo
          files.
        </h5>

        {/* Preview images */}
        <div className="uploadFormDiv">
          {files.map((file, index) => (
            <PhotoCard
              key={index}
              url={URL.createObjectURL(file)}
              onClick={() => handleDeleteFile(index)}
            />
          ))}
        </div>
      </div>

      <ButtonSubmit value="Upload to Cloudinary" />
    </form>
  );
};

export default UploadForm;

/*
By creating a reference to the form element using useRef, you can access and manipulate this form element 
and its properties directly in your component code.

This is particularly useful when you want to interact with the form element or its properties 
(e.g., submitting the form, accessing form fields' values) without the need for a state variable. 
Instead of querying the DOM using traditional JavaScript, you can use the formRef to interact with the form in a more React-friendly way.
*/
