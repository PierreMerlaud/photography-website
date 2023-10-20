import { Schema, model, models } from "mongoose";

const photoSchema = new Schema(
  {
    public_id: String,
    secure_url: String,
    title: String,
    analog: Boolean,
    camera: String,
    film: String,
    color: Boolean,
    description: String,
  },
  { timestamps: true }
);

const Photo = models.photos || model("photos", photoSchema);

export default Photo;
