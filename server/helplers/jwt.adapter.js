import jsonWebtoken from "jsonwebtoken"

const sign = jsonWebtoken.sign

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject("No se pudo generar el token")
        } else {
          resolve(token)
        }
      }
    )
  })
}

export default generarJWT
