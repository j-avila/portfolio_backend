import axios from "axios"
import { response, request } from "express"
import spotifyToken from "../models/spotify.js"

export const tokenPost = async (req = request, res = response) => {
  const { code, redirectUrl } = req.query

  const authHeader = `Basic ${Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64")}`

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUrl || process.env.CLIENT_URL,
      }),
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    const { access_token, refresh_token } = tokenResponse.data
    console.log("Access Token:", access_token)
    console.log("Refresh Token:", refresh_token)

    // Store the tokens securely or handle them as needed
    const token = new SpotifyToken({ access_token })
    await token.save(token)

    res.send("Authorization successful. You can now use the access token.")
  } catch (error) {
    console.error("Error exchanging code for tokens:", error.message)
    res.status(500).send("Error exchanging code for tokens.")
  }
}

export const tokensGet = async () => {
  try {
    const resp = await spotifyToken.find()
    const token = resp[0].token

    return token
  } catch (err) {
    console.log("🫠 refresh", err)
    return ""
  }
}

export const currentTrack = async (token) => {
  const apiUrl = "https://api.spotify.com/v1/me/player/recently-played?limit=1"
  let savedToken = token?.access_token || (await tokensGet())
  let payload

  const headers = {
    Authorization: `Bearer ${savedToken}`,
  }

  try {
    const data = await axios.get(apiUrl, { headers })
    payload = data.data

    return payload
  } catch (error) {
    console.log("CT", {
      error: { code: error.response.status, error: error.response.statusText },
      payload,
    })
  }
}
