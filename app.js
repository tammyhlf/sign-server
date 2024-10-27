const express = require('express')
const routes = require('./routes/index')

const app = express()

app.use(express.json())

// 使用 /api/users 前缀的路由
app.use('/api', routes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
