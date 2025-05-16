import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Acortador de enlaces' })
})

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT} -> http://localhost:${PORT}`)
})
