import axios from "axios"
import { Router } from "express"
import { tokenPost } from "../../controllers/spotify.js"

const router = Router()

// Callback route to handle the authorization code and exchange it for tokens
router.get("/spotify/auth/callback", tokenPost)

export default router
