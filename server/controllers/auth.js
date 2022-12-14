import bcryptjs from "bcryptjs"
import { response } from "express"
import JWTGenerator from "../helplers/jwt.adapter.js"

import User from "../models/user.js"

const login = async (req, res = response) => {
  const { email, password } = req.body
  console.log(req.body)
  try {
    // Verificar si el email existe
    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      })
    }

    // SI el usuario está activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      })
    }

    // Generar el JWT
    const token = await JWTGenerator(usuario.id)

    res.json({
      usuario,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Hable con el administrador",
    })
  }
}

export default login
