import mongoose from "mongoose"

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: { type: String, required: [true, "El nombre es obligatorio"] },
  description: { type: String },
  link: { type: String, required: [true, "El enlace es requerido"] },
  repo: { type: String },
  tags: { type: [String] },
  image: { type: String },
  active: { type: Boolean, default: true },
})

export default mongoose.model("Project", projectSchema)
