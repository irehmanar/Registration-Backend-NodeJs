// importing modules
import User from '../Models/User.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

// http://localhost:3001/api/v1/user/signup TYPE:POST
const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    next('Not Data')
  }
  const alreadyExistUsername = await User.findOne({ username })
  const alreadyExistEmail = await User.findOne({ email })

  if (alreadyExistUsername || alreadyExistEmail) {
    next('User already exist')
  } else {
    try {
      // const verificationToken = generateVerificationToken()
      const hashed_password = await bcryptjs.hash(password, 10)
      const userDetails = await User.create({
        email: email,
        name: username,
        password: hashed_password
      })

      return res
        .status(200)
        .json({ message: 'User added successfully', success: true })
    } catch (error) {
      next('Server Error while signup')
    }
  }
}

// http://localhost:3001/api/v1/user/login   TYPE:POST

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email | !password) {
      return res.status(202).json({ message: 'Data is not completed' })
    } else {
      const auth_user = await User.findOne({ email })
      if (!auth_user) {
        return res
          .status(401)
          .json({ message: `User with ${email} not found`, success: false })
      } else {
        const verify = await bcryptjs.compare(password, auth_user.password)
        if (!verify) {
          return res
            .status(401)
            .json({ message: 'Incorrect Password', success: false })
        } else {
          auth_user.password = undefined
          console.log(auth_user)
          const success = true
          const token = jsonwebtoken.sign(
            { auth_user },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
          )
          res.cookie('authorization', `Bearer ${token}`)

          return res.status(200).json({
            message: 'login successfully',
            success,
            userId: auth_user._id
          })
        }
      }
    }
  } catch (error) {
    next('Server Error while signin')
  }
}

export default { login, signup }
