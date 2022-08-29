import { response, request } from "express"
import Project from "../models/project.js"

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

export const projectPost = async (req = request, res = response) => {
  const { name, description, thumbnail, link, repo, tags } = req.body
  const project = new Project({
    name,
    description,
    thumbnail,
    link,
    repo,
    tags,
  })

  await project.save(project)

  res.json({
    project,
  })
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
