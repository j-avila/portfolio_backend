import Role from "../models/role.js"
import Usuario from "../models/user.js"

export const esRoleValido = async (role = "USER_ROLE") => {
  console.log("check role: ", role)

  const existeRol = await Role.findOne({ role })
  // console.log("check role: ", existeRol)
  if (!existeRol) {
    throw new Error(`El role ${role} no está registrado en la BD`)
  }
}

export const emailExiste = async (email = "") => {
  // Verificar si el correo existe
  console.log("check email:", email)
  const existeEmail = await Usuario.findOne({ email })
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`)
  }
}

export const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`)
  }
}

// * Categorias
export const existeCategoriaPorId = async (id) => {
  // Verificar si el correo existe
  const existeCategoria = await Categoria.findById(id)
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`)
  }
}

// * Productos

export const existeProductoPorId = async (id) => {
  // Verificar si el correo existe
  const existeProducto = await Producto.findById(id)
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`)
  }
}

// * Validar colecciones permitidas

export const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion)
  if (!incluida) {
    throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
  }
  return true
}
