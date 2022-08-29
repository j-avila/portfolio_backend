import { response, request } from "express"
import User from "../models/user.js"
import { genSaltSync, hashSync } from "bcrypt"

export const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ])

  res.json({
    total,
    usuarios,
  })
}

export const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const usuario = new User({ name, email, password, role })

  // Encriptar la contraseña
  const salt = genSaltSync()
  usuario.password = hashSync(password, salt)

  // Guardar en BD
  await usuario.save()

  res.json({
    usuario,
  })
}

export const usersPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto } = req.body

  if (password) {
    // Encriptar la contraseña
    const salt = genSaltSync()
    resto.password = hashSync(password, salt)
  }

  const usuario = await findByIdAndUpdate(id, resto)

  res.json(usuario)
}

export const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  })
}

export const usersDelete = async (req, res = response) => {
  const { id } = req.params
  const usuario = await User.findByIdAndUpdate(id, { estado: false })

  res.json(usuario)
}
