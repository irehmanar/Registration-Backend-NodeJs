import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String
    },
    tokenExpires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
export default User