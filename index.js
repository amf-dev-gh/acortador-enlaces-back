import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ModelLink } from './model.js'
dotenv.config()

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(json())
app.use(cors({
  origin: [
    'https://amf-dev.site',
    'https://portafolio-amf-dev.vercel.app',
    'https://lnk-to.site',
    'https://acortador-enlaces.vercel.app'
  ]
}))

// Prueba de funcionamiento
app.get('/test', (req, res) => {
  res.json({ message: ' Server - Short Link running' })
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

// Recibe un ID como parametro y una URL en el cuerpo de la petición para actualizarla en la bbdd
app.put('/:id', async (req, res) => {
  const { id } = req.params
  const { url } = req.body
  const isUpdated = await ModelLink.updateUrlById(id, url)
  if (isUpdated === true) return res.json({ id, url })
  if (isUpdated === false) return res.status(404).json({ error: 'Resource not found' })
  res.status(409).json({ message: 'Is trying to update a URL with an existing one.', error: isUpdated })
})

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`)
})
