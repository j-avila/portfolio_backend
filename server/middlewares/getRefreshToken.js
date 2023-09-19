import { Buffer } from "buffer"
import axios from "axios"
import { currentTrack } from "../controllers/spotify.js"
// import spotifyToken from "../models/spotify.js"

// Route to refresh the access token using the refresh token
const refreshToken = async () => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64")

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${authHeader}`,
  }

  try {
    const data = new URLSearchParams()
    data.append("grant_type", "refresh_token")
    data.append("refresh_token", refreshToken)
    1
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers,
      }
    )

    // Use the new access token or store it securely
    /* console.log("TK res", tokenResponse.data)

    TODO: store it in DB
    try {
      const saved = await spotifyToken.findByIdAndUpdate({
        id: "0",
        body: JSON.stringify({ token: tokenResponse.data.access_token }),
      })
      console.log(saved)
      return currentTrack(tokenResponse.data)
    } catch (err) {
      console.log("🤌🏽", err)
      return []
    } */

    return currentTrack(tokenResponse.data)
  } catch (error) {
    console.error("Error refreshing token:", error.message)
    return "Error refreshing token."
  }
}

export default refreshToken
