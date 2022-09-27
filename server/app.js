import express from "express"
import cors from "cors"
import dbConnection from "./config/config.js"
import bodyParser from "body-parser"
import "dotenv/config"

// routes
import Login from "./routes/login.js"
import Projects from "./routes/projects.js"
import Users from "./routes/users.js"

const app = express()

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// intializers
app.use(cors())
app.use(bodyParser.json())
app.use(Login)
app.use(Projects)
app.use(Users)

// db connection
dbConnection()

// start server
app.listen(process.env.PORT, () => {
  console.log(`escuchando puerto ${process.env.PORT} 🔌`)
})
