import { Router } from "express"
import { check } from "express-validator"

import {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} from "../helplers/db-validators.js"

import {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} from "../controllers/user.js"

import validateJWT from "../middlewares/validateJWT.js"
import validateFields from "../middlewares/validateFields.js"
import { checkRole } from "../middlewares/validar-roles.js"

const router = Router()
const userRoute = "/api/user"

router.get(`${userRoute}`, usersGet)

router.put(
  `${userRoute}:id`,
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validateFields,
  ],
  usersPut
)

router.post(
  `${userRoute}`,
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(esRoleValido),
    validateFields,
  ],
  usersPost
)

router.delete(
  `${userRoute}/:id`,
  [
    validateJWT,
    // isAdminRole
    checkRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],
  usersDelete
)

router.patch("/", usersPatch)

export default router
