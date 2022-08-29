import { Router } from "express"
import { check } from "express-validator"
import {
  projectDelete,
  projectPatch,
  projectPost,
  projectsGet,
} from "../controllers/project.js"
import validateJWT from "../middlewares/validateJWT.js"

const router = Router()
const projectsRoute = "/api/projects"

router.get(projectsRoute, projectsGet)

router.post(
  projectsRoute,
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("link", "El enlace es obligatorio").not().isEmpty(),
    check("repo", "El repo es obligatorio").not().isEmpty(),
  ],
  projectPost
)

router.patch(
  projectsRoute,
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("link", "El enlace es obligatorio").not().isEmpty(),
    check("repo", "El repo es obligatorio").not().isEmpty(),
  ],
  projectPatch
)

router.delete(projectsRoute, projectDelete)

export default router
