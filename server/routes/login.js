import { Router } from "express"
import { check } from "express-validator"

import validateFields from "../middlewares/validateFields.js"

import login from "../controllers/auth.js"

const router = Router()

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
)

export default router
