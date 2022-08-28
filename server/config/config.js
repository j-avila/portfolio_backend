/* global Configurations */

/* function getConfig() {
  // port
  process.env.PORT = process.env.PORT || 3000

  // envairoment
  process.env.NODE_ENV = process.env.NODE_ENV || "dev"

  // // expiring token
  process.env.TOKEN_EXPIRES = 60 * 60 * 60 * 30

  // seeds
  let usrSEED

  process.env.MODE_ENV === "dev"
    ? (usrSEED = "devsercret")
    : (usrSEED = process.env.SEED_TOKEN)

  process.env.USER_SECRET = usrSEED

  // database
  let urlDB

  process.env.NODE_ENV === "dev"
    ? (urlDB = "mongodb://localhost:27017/personal_portfolio")
    : (urlDB = process.env.MONGO_URI)

  process.env.URLDB = urlDB
}

export default getConfig */

import "dotenv/config"
import mongoose from "mongoose"

const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })

    console.log("Base de datos online")
  } catch (error) {
    console.log(error)
    throw new Error("Error a la hora de iniciar la base de datos")
  }
}

export default dbConnection
