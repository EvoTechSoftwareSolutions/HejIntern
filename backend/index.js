const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()
const PORT = process.env.PORT || 4000

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from backend' })
})

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  const { email, name } = req.body
  try {
    const user = await prisma.user.create({ data: { email, name } })
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

