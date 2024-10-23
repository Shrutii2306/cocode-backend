require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const ws = require('ws');
const cors = require('cors')
const http = require('http')
const WebSocket = require('ws');
const app = express();
const routes = require('./route/routes');
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());


// connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri,{dbName: 'CoCode'})
        .then(() => console.log("MongoDB Atlas connected"))
        .catch(err => console.log(err));

const server = http.createServer(app);

const wss = new ws.Server({server});

// Store connected clients
let clients = [];

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);
  // clients.filter(client => client.sessionId == ws.sessionId);
 
  // Listen for incoming messages from a client
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    // console.log(data);
    // Broadcast the code update to all connected clients
    if (data.type === 'codeUpdate') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {

            // console.log(wss.clients)
          client.send(JSON.stringify({
            type: 'codeUpdate',
            code: data.code,
            sessionId : data.sessionId
          }));
        }
      });
    }
  });

  // Remove the client on disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients = clients.filter(client => client !== ws);
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

app.use('/',routes);

app.get('/',(req, res) =>{

    res.send('WebSocket server with Express is running!');
});

// Start the server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

















// const httpServer = app.listen(PORT, () => {

//     console.log(`Server running on port ${PORT}`);
// })

// const wsServer = new ws.Server({ noServer: true })

// httpServer.on('upgrade', (req, socket, head) => {
//   wsServer.handleUpgrade(req, socket, head, (ws) => {
//     wsServer.emit('connection', ws, req)
//   })
// })

