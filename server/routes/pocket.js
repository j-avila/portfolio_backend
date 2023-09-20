import { Router } from "express"
import { getReadingList } from "../controllers/pocket.js"

const router = new Router()

router.get("/api/reading-list", getReadingList)

export default router
