/* To create a server-only form, define the Server Action in a Server Component. The action can either be defined 
inline with the "use server" directive at the top of the function, or in a separate file with the directive at the top of the file.*/
"use server";
import path from "path";
import fs from "fs/promises";

async function savePhotosToLocal(formData) {
  /*extracts all the files with the key "files" from the formData object. 
    This step assumes that the "files" key was used to append files to the formData object during the upload process.*/
  const files = formData.getAll("files");

  //ArrayBuffer object is used to represent a generic raw binary data buffer.
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      //creates a Buffer object from the binary data contained in the data variable
      const buffer = Buffer.from(data);

      //creates a file path for where the image file will be saved
      const uploadDir = path.join(process.cwd(), "public", `/${file.name}`);

      //This line uses the Node.js fs.writeFile method to write data to a file specified by the uploadDir
      fs.writeFile(uploadDir, buffer);
    })
  );
}

export async function uploadPhoto(formData) {
  try {
    //save photo files to temporary folder
    const newFiles = await savePhotosToLocal(formData);
  } catch (error) {
    return { errMsg: error.message };
  }
}

/* Buffer Object: In environments like Node.js, the Buffer object is used to represent raw binary data. 
It is particularly useful for working with binary data, such as images, audio, and other types of files. 

Buffer.from(data): This is a method of the Buffer class. It creates a new Buffer object by copying the contents of 
the data variable. data is assumed to be an ArrayBuffer, Uint8Array, or another compatible binary data representation.

const uploadDir = path.join(process.cwd(), "public", /${file.name});: This line creates a file path for where 
the image file will be saved. Let's break down this line step by step:

process.cwd(): process.cwd() is a Node.js method that returns the current working directory (the directory where your 
Node.js script is executed). It represents the root directory of your Node.js application.

"public": This is a subdirectory within the current working directory. It's specified as a string.

file.name: This part is assumed to be the name of the file, which you are embedding in the path as a string.

path.join(): The path.join method is used to concatenate the parts of the file path. It ensures that the 
path is correctly formatted for the operating system (using the appropriate path separators, such as / or \).

So, the uploadDir variable contains a path to a directory where the file will be saved, and it's constructed 
based on the current working directory, a subdirectory called "public," and the name of the file.

fs.writeFile(uploadDir, buffer);: This line uses the Node.js fs.writeFile method to write data to a file specified 
by the uploadDir. It's used to save the image to the local filesystem. Here's what the parameters represent:

uploadDir: The first argument is the file path where you want to save the data.

buffer: The second argument is the data you want to write to the file. In this case, it's the binary data of the 
image stored in a Buffer object.
*/
