import mongoose from "mongoose"

const Schema = mongoose.Schema

const RoleSchema = new Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
})

const Role = mongoose.model("Role", RoleSchema)

export default Role
