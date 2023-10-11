// import React from "react";
"use client";
import { useRef, useState } from "react";
import PhotoCard from "./PhotoCard";

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

  return (
    //formRef will point to this specific <form>
    <form action="" ref={formRef}>
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
        <div>
          {files.map((file, index) => (
            <PhotoCard
              key={index}
              url={URL.createObjectURL(file)}
              onClick={() => handleDeleteFile(index)}
            />
          ))}
        </div>
      </div>
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
