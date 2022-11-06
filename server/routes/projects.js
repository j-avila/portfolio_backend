import { Router } from "express"
import { check } from "express-validator"
import upload from "multer"
import {
  projectById,
  projectDelete,
  projectPatch,
  projectPost,
  projectsGet,
} from "../controllers/project.js"
import validateJWT from "../middlewares/validateJWT.js"

const router = Router()
const projectsRoute = "/api/projects"
const uploader = new upload({ dest: "./public/data/uploads/" })

router.get(projectsRoute, projectsGet)

router.get(`${projectsRoute}/:id`, projectById)

router.post(
  projectsRoute,
  uploader.single("image"),
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
  uploader.single("image"),
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
