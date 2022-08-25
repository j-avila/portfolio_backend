import express from "express"
const app = express()
import { compareSync } from "bcrypt"
import sign from "jsonwebtoken"
import userModel from "../models/user.js"

app.post("/login", function (req, res) {
  const body = req.body

  userModel.findOne({ email: body.email }, (err, userDB) => {
    console.log(body.email)
    if (err) {
      return res.status(500).json({ ok: false, err })
    }
    if (!userDB) {
      return res.status(400).json({ ok: false, message: "usuario incorrecto" })
    }
    if (!compareSync(body.password, userDB.password)) {
      return res.status(400).json({ ok: false, message: "password incorrecto" })
    }

    const token = sign(
      {
        user: userDB,
      },
      process.env.USER_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES }
    )

    res.json({
      ok: true,
      user: userDB,
      token,
    })
  })
})

export default app
