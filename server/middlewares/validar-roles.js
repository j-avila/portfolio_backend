import { response } from "express"

export const isAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    })
  }

  const { rol, nombre } = req.usuario

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    })
  }

  next()
}

export const checkRole = (...roles) => {
  return (req, res = response, next) => {
    console.log("roles2: ", req.user)
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      })
    }

    next()
  }
}
