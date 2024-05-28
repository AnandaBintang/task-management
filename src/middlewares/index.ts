import express from 'express'
import cors from 'cors'
import router from '../routes'

const middleware = express()

middleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE']
  })
)

middleware.options('*', cors())
middleware.use(express.json())
middleware.use(router)

export default middleware
