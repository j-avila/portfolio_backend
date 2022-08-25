import mongoose from "mongoose"

const Schema = mongoose.Schema

const userRoles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
}

const userModel = new Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: userRoles,
    default: "USER_ROLE",
  },
  state: {
    type: Boolean,
    default: true,
  },
})

const userSchema = mongoose.model("User", userModel)

export default userSchema
