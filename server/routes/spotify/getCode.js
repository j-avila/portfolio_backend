import { Router } from "express"

const router = Router()

router.get("/spotify/auth/gen-code", async (req, res) => {
  const { clientId, redirecturl } = req.query

  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${
    redirecturl || process.env.CLIENT_URL
  }&scope=user-read-recently-played`

  console.log("code", url)
  res.redirect(301, url)
})

export default router
