import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { generateRandomId } from './utils.js'
dotenv.config()

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

await db.execute('CREATE TABLE IF NOT EXISTS links (id VARCHAR(10) PRIMARY KEY UNIQUE, url TEXT UNIQUE);')

export class ModelLink {
  static async saveUrl ({ url }) {
    // Verifica si existe ya la url en la BBD, de ser asi retorna el id existente
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM links WHERE url=?',
        args: [url]
      })
      const { id } = result.rows[0]
      return id
    } catch {}

    // Si no existe, genera un nuevo id y guarda la nueva url y retorna el nuevo id
    // De generarse un id duplicado retorna un string vacío que se interpreta como un conflicto
    const id = generateRandomId()
    try {
      await db.execute({
        sql: 'INSERT INTO links (id, url) VALUES (:id, :url);',
        args: { id, url }
      })
      return id
    } catch {
      return ''
    }
  }

  static async getUrlById (id) {
    // Verifica si existe una url con el id indicado. Si existe retorna la url correspondiente, de lo contrario retorna un string vacío
    try {
      const result = await db.execute({
        sql: 'SELECT * FROM links WHERE id=?',
        args: [id]
      })
      const { url } = result.rows[0]
      return url
    } catch {
      return ''
    }
  }

  static async updateUrlById (id, newUrl) {
    // Verifica si existe una url con el id indicado. Si no existe retorna false. Si existe intenta actualizarlo y retorna true, de lo contrario retorna error.
    try {
      await db.execute({
        sql: 'SELECT * FROM links WHERE id=?',
        args: [id]
      })
    } catch {
      return false
    }

    try {
      await db.execute({
        sql: 'UPDATE links SET url=? WHERE id=?',
        args: [newUrl, id]
      })
      return true
    } catch (error) {
      return error.code
    }
  }
}
