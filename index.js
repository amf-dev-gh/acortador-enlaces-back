import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(json())
app.use(cors())

// Prueba de funcionamiento
app.get('/test', (req, res) => {
  res.json({ message: 'Acortador de enlaces OK' })
})

// Recibe un ID como parametro y devuelve el link original correspondiente
app.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({ id: `${id}`, url: 'https://example.com/12ewr345/98745wer' })
})

// Recibe en el cuerpo de la petición una URL, la guarda en la bbdd y retorna el ID generado
app.post('/', (req, res) => {
  const { url } = req.body
  console.log(url)
  res.json({ id: 'a9e3y6' })
})

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT} -> http://localhost:${PORT}`)
})
