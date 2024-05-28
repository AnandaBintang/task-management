import express, { type Application } from 'express'
import 'dotenv/config'
import middleware from './middlewares'

const app: Application = express()
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

app.use(middleware)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
