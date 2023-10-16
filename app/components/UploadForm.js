// import React from "react";
"use client";
import { useRef, useState } from "react";
import PhotoCard from "./PhotoCard";
import ButtonSubmit from "./ButtonSubmit";
import { revalidate, uploadPhoto } from "@/actions/uploadActions";

const UploadForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleInputFiles(e) {
    const files = e.target.files;

    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        //only accept image files less than 1mb in size.
        return file;
      }
    });

    setFiles((prev) => [...newFiles, ...prev]);
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
    // if (!files.length > 3) return alert("Upload up to 3 image files.");

    /*FormData is a built-in JavaScript object that allows you to construct a set of key/value pairs representing 
    form fields and their values, which can be easily sent as the body of a POST request. */
    const formData = new FormData();

    /*This loop iterates over each file in the files array and appends it to the formData object using the append method. 
    The key "files" and the file itself are paired in the formData object. */
    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadPhoto(formData);
    // if (res?.msg) alert(`Success: ${res?.msg}`); // <==> await delay(2000)
    if (res?.errMsg) alert(`Error: ${res?.errMsg}`);

    //clears the files state after successful or unsuccessful file uploads to reset the selection.
    setFiles([]);
    //reset the form element and ensures that users can easily select new files for upload.
    formRef.current.reset();

    //wait about 2sec to update cloudinary dtb
    //then revalidatPath => call getAllPhotos()
    // revalidate("/");
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
