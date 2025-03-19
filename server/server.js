import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app = express();
const httpServer = createServer(app);
const port = 4000; 

const clientUrl =  "http://localhost:8080"
app.use(cors({ origin:clientUrl }));

const io = new Server(httpServer , {
  cors: {
    origin: clientUrl, 
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
    console.log('Cliente conectado:', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

httpServer.listen(port)


