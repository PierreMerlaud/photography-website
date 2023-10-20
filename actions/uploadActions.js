/* To create a server-only form, define the Server Action in a Server Component. The action can either be defined 
inline with the "use server" directive at the top of the function, or in a separate file with the directive at the top of the file.*/
"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import Photo from "@/models/photoModel";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function savePhotosToLocal(formData) {
  /*extracts all the files with the key "files" from the formData object. 
    This step assumes that the "files" key was used to append files to the formData object during the upload process.*/
  const files = formData.getAll("files");

  //ArrayBuffer object is used to represent a generic raw binary data buffer.
  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      //creates a Buffer object from the binary data contained in the data variable
      const buffer = Buffer.from(data);

      //create a unique name
      const name = uuidv4();

      //the file type (here 'jpeg')
      const ext = file.type.split("/")[1];

      //creates a file path for where the image file will be saved
      // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`); DOESN't WORK IN VERCEL

      //tmpdir()	Returns the operating system's default directory for temporary files
      const tempdir = os.tmpdir();

      const uploadDir = path.join(tempdir, `/${name}.${ext}`); //works in Vercel

      //This line uses the Node.js fs.writeFile method to write data to a file specified by the uploadDir
      fs.writeFile(uploadDir, buffer);

      return { filepath: uploadDir, filename: file.name };
    })
  );
  //ensures that the function will not proceed until all image processing and saving tasks are finished.
  return await Promise.all(multipleBuffersPromise);
}

async function uploadPhotosToCloudinary(newFiles) {
  const multiplePhotosPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, { folder: "nextjs-upload" })
  );

  return await Promise.all(multiplePhotosPromise);
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export async function uploadPhoto(formData) {
  try {
    //save photo files to temporary folder
    const newFiles = await savePhotosToLocal(formData);
    // console.log("newFiles", newFiles);

    //upload to the cloud after saving the photo file to the temp folder
    const photos = await uploadPhotosToCloudinary(newFiles);
    // console.log("photosssss", photos);

    //delete photo files in temp folder after successfull upload
    //uses the Node.js fs module to delete a file specified by its file path (file.filepath).
    newFiles.map((file) => fs.unlink(file.filepath));

    //delay about 2sec to update cloudinary dtb
    //then revalidatPath => call getAllPhotos()
    await delay(2000);

    //save photo files to my mongodb => no delay needed
    const newPhotos = photos.map((photo) => {
      const newPhoto = new Photo({
        public_id: photo.public_id,
        secure_url: photo.secure_url,
        title: formData.get("title"), // Get title from form data
        analog: formData.get("analog"),
        camera: formData.get("camera"),
        film: formData.get("film"),
        color: formData.get("color"),
        description: formData.get("description"), // Get description from form data
      });
      return newPhoto;
    });
    await Photo.insertMany(newPhotos);

    revalidatePath("/");
    return { msg: "Upload success !" };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function getAllPhotos() {
  try {
    // FROM CLOUDINARY
    // const { resources } = await cloudinary.v2.search
    //   .expression("folder:nextjs-upload/*")
    //   .sort_by("created_at", "desc")
    //   .max_results(500)
    //   .execute();

    //FROM MONGODB
    const photos = await Photo.find().sort("-createdAt");

    console.log("photos", photos);

    const resources = photos.map((photo) => ({
      ...photo._doc,
      _id: photo._id.toString(),
    }));
    console.log("resources", resources);
    return resources;
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function deletePhoto(public_id) {
  try {
    await Promise.all([
      Photo.findOneAndDelete({ public_id }),
      cloudinary.v2.uploader.destroy(public_id),
    ]);

    revalidatePath("/");

    return { msg: "Delete Success!" };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function revalidate(path) {
  revalidatePath(path);
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

"UUID" stands for "Universally Unique Identifier." It is a 128-bit identifier that is standardized 
to be unique across both space and time. UUIDs are often used in databases, distributed systems, and various 
applications where uniqueness is critical. One of the most common versions of UUID is Version 4, which is generated using 
random or pseudo-random numbers.

The Node.js os module is a built-in module in Node.js that provides a set of operating system-related utility functions 
and information. It allows you to interact with and retrieve information about the operating system on which your Node.js 
application is running.

Promise.all() is a built-in method in JavaScript that takes an array of promises and returns a new promise.

{...photo._doc,_id: photo._id.toString()}: This is object destructuring and the spread syntax (...). It's used to create a 
shallow copy of the photo._doc object, which likely contains properties of the photo object.
...photo._doc takes all the properties of the photo._doc object and includes them in the new object.
_id: photo._id.toString(): This is adding a new property to the new object. It sets the _id property to the result of calling 
the toString() method on photo._id.
In the context of MongoDB and Mongoose (a popular MongoDB object modeling library for Node.js), the _doc property is used to 
access the raw data of a document retrieved from the database.


*/
