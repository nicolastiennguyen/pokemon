// import express from 'express'
// const app = express()

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

// const PORT = 8000
// app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))

import WebSocket, { WebSocketServer } from 'ws'

const wss = new WebSocketServer({port:8080})

wss.on('connection', (ws) => {
  let timeConnected = new Date().toLocaleTimeString()
  console.log(`A new client has connected at ${timeConnected}`)
  ws.send(`Welcome new client, you have joined at ${timeConnected}`)

  ws.on('message', (message) => {
    let timeSent = new Date().toLocaleTimeString()
    console.log(`A client has sent this message: ${message} at ${timeSent}`)
    ws.send(`You've sent this message: ${message} at ${timeSent}`)

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`You've received a message: ${message} at ${timeSent}`)
      }
    })
  })
})

