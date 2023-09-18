import { Router } from "express"
import { currentTrack, tokensGet } from "../../controllers/spotify.js"
import refreshToken from "../../middlewares/getRefreshToken.js"

const router = new Router()

const requestHandler = async (req = request, res = response) => {
  let track = await currentTrack()

  if (track?.error?.status != 200) {
    console.log("error 🫠", track)
    const resp = await refreshToken()
    track = resp
  }
  res.json({ track })
}

router.get("/api/spotify-current-track", requestHandler)

export default router
