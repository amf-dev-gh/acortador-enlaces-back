import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
dotenv.config()

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

await db.execute('CREATE TABLE IF NOT EXISTS links (id INTEGER PRIMARY KEY, url TEXT);')
