import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ModelLink } from './model.js'
dotenv.config()

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(json())
app.use(cors({
  origin: '*'
}))

// Prueba de funcionamiento
app.get('/test', (req, res) => {
  res.json({ message: 'Acortador de enlaces OK' })
})

// Recibe un ID como parametro y devuelve el link original correspondiente
app.get('/:id', async (req, res) => {
  const { id } = req.params
  const url = await ModelLink.getUrlById(id)
  if (url !== '') return res.json({ id: `${id}`, url })
  res.status(404).json({ error: 'Resource not found' })
})

// Recibe en el cuerpo de la petición una URL, la guarda en la bbdd y retorna el ID generado
app.post('/', async (req, res) => {
  const { url } = req.body
  const id = await ModelLink.saveUrl({ url })
  if (id !== '') return res.json({ id })
  res.status(409).json({ error: 'Failed to save your record to the database' })
})

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT} -> http://localhost:${PORT}`)
})
