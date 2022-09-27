import * as fs from "node:fs"
import { response, request } from "express"
import Project from "../models/project.js"
import { v2 as cloudinary } from "cloudinary"

export const projectsGet = async (req = request, res = response) => {
  const { to = 10, from = 0 } = req.query
  const query = { active: true }

  const [total, projects] = await Promise.all([
    Project.countDocuments(query),
    Project.find(query).skip(Number(from)).limit(Number(to)),
  ])

  res.json({
    total,
    projects,
  })
}

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
}

export const projectPost = async (req = request, res = response) => {
  try {
    const { name, description, link, repo, tags } = req.body
    const imgFile = req.file
    const image = await cloudinary.uploader.upload(imgFile.path, options)

    let project = new Project({
      name,
      description,
      image: image.url,
      link,
      repo,
      tags,
    })

    fs.unlink("./public/data/uploads/" + req.file.filename, (err) => {
      if (err) {
        console.log("failed to delete local image:" + err)
      } else {
        console.log("successfully deleted local image")
      }
    })

    project.save(project)
    res.json({
      project,
    })
  } catch (error) {
    console.log(error)
    res.json({
      error,
    })
  }
}

export const projectPatch = async (req, res = response) => {
  const { ...payload } = req.body
  console.log(id)
  const project = await Project.findByIdAndUpdate(id, { ...payload })

  res.json(project)
}

export const projectDelete = async (req, res = response) => {
  const { id } = req.query
  console.log(id)
  const project = await Project.findByIdAndUpdate(id, { active: false })

  res.json(project)
}
