import mongoose from 'mongoose'

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: String,
  description: String,
  link: String,
  repo: String,
  languages: String,
  thumbnail: String,
})

export default mongoose.model('Project', projectSchema)
