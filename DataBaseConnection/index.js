import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGOURI
console.log(mongoURI)
const connectToMongo = async () => {
  mongoose
    .connect(mongoURI, {
      serverSelectionTimeoutMS: 500000, // Increase timeout
      connectTimeoutMS: 300000,
      socketTimeoutMS: 450000
    })
    .then(() => {
      console.log('Connected to mongodb successfully')
    })
    .catch(error => {
      console.log('Error connecting to mongo db:', error)
    })
}

export default connectToMongo
