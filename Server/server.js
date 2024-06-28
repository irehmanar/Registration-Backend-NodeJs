import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToMongo from '../DataBaseConnection/index.js'
import ErrorMiddleWare from '../Middlewares/ErrorMiddleware.js'

dotenv.config({ path: '../.env' })
const app = express()
app.use(cors())
app.use(express.json())

import userRoute from '../Routes/UserRoutes.js'

app.use('/api/v1/user', userRoute)
app.use(ErrorMiddleWare)

connectToMongo()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.log('Error occurred during Database connection. Error is: ', err)
  })
