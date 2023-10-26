"use server";
import Photo from "@/models/photoModel";

export async function getLatestPhotos() {
  try {
    const photos = await Photo.find().sort("-createdAt").limit(6);
    const resources = photos.map((photo) => ({
      ...photo._doc,
      _id: photo._id.toString(),
    }));

    return resources;
  } catch (error) {
    return { errMsg: error.message };
  }
}
