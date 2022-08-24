/* global Configurations */

function getConfig() {
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
    ? (urlDB = "mongodb://localhost:27017/cafe")
    : (urlDB = process.env.MONGO_URI)

  process.env.URLDB = urlDB
}

export default getConfig
