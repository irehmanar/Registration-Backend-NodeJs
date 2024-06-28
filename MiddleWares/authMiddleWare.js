import JWT from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // if(!authHeader || !authHeader.startsWith("Bearer")){
  if (!authHeader) {
    next('Token is not provided')
  }
  const token = authHeader
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET)
    const userId = req.body.userId
    if (userId != payload.auth_user._id) {
      next('Id does not match')
    }
    next()
  } catch (error) {
    next('Invalid Token')
  }
}

export default userAuth
