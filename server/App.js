import express from 'express'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

const PORT = 8000
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))