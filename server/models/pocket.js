import mongoose from "mongoose"

const Schema = mongoose.Schema

const pocketTockenSchema = new Schema({
  token: {
    type: String,
    required: [true, "El token es obligatorio"],
  },
})

export default mongoose.model("Token", pocketTockenSchema)
