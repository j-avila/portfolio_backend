import * as fs from "node:fs"
import { response, request } from "express"
import Project from "../models/project.js"
import { v2 as cloudinary } from "cloudinary"
import assetsConfig from "../config/cloudinary.js"

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

export const projectById = (req, res) => {
  const id = req.params.id
  Project.findById(id, (err, project) => {
    if (err) {
      return req.status?.anchor(500).json({
        ok: false,
        err,
      })
    }
    res.json({
      ok: true,
      project,
    })
  })
}

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
}

export const projectPost = async (req = request, res = response) => {
  assetsConfig()

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

export const projectPatch = async (req = request, res = response) => {
  assetsConfig()
  console.log("da body:", req.body)
  try {
    const { description, link, repo, tags, id, name } = req.body
    let body = { description, link, repo, tags, name }

    if (req.file) {
      const imgFile = req.file
      const image = await cloudinary.uploader.upload(imgFile.path, options)
      body = { ...body, image }

      fs.unlink("./public/data/uploads/" + req.file.filename, (err) => {
        if (err) {
          console.log("failed to delete local image:" + err)
        } else {
          console.log("successfully deleted local image")
        }
      })
    }

    Project.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true },
      (err, dbResp) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          })
        }
        if (!dbResp) {
          return res.status(400).json({
            ok: false,
            err,
          })
        }

        res.json({
          ok: true,
          project: dbResp,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.json({
      error,
    })
  }
}

export const projectDelete = async (req, res = response) => {
  const { id } = req.query
  const project = await Project.findByIdAndUpdate(id, { active: false })

  res.json({ ok: true, id: project._id })
}
