import verify from 'jsonwebtoken'

// ============================
// verify token
// ============================

export const tokenAuth = (req, res, next) => {
  const token = req.get('token')

  verify(token, process.env.USER_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ ok: false, err })
    }
    req.user = decoded.user
    next()
  })
}

export const roleAuth = (req, res, next) => {
  const user = req.user

  if (user.role === 'ADMIN_ROLE') {
    next()
  } else {
    return res.json({
      ok: false,
      message: 'the user is not admin',
    })
  }
}

export default {
  tokenAuth,
  roleAuth,
}
