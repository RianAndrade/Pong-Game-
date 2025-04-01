import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';


const app = express();
const httpServer = createServer(app);
const port = 4000;

const allowedOrigins = [

  "http://ec2-3-148-234-148.us-east-2.compute.amazonaws.com:5000/",
  "http://ec2-3-148-234-148.us-east-2.compute.amazonaws.com:8080/",
  " http://ec2-3-148-234-148.us-east-2.compute.amazonaws.com:4000/"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  },
});


const rooms = {}


io.on("connection", (socket) => {
  console.log('Cliente conectado:', socket.id)


  socket.on('disconnect', () => {

    console.log('Cliente desconectado:', socket.id);
    for (const roomId in rooms) {
      const index = rooms[roomId].indexOf(socket.id);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
        io.to(roomId).emit("roomUpdate", { players: rooms[roomId].length });
        console.log(`Cliente ${socket.id} saiu da sala  ${roomId}`);

        // Se a sala ficar vazia
        if (rooms[roomId].length === 0) {
          delete rooms[roomId];
          console.log("Sala deletada", roomId)
        }
      }
    }
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push(socket.id);
    console.log(`Cliente: ${socket.id} entrou na sala ${roomId}`)

    if (rooms[roomId].length === 2) {
      console.log("DOis gays")
      io.to(roomId).emit("startGame");
    }

  });



  socket.on("wDown", (arg) => {
    console.log(arg);
    io.emit("wDownResponse")
  });

  socket.on("sDown", (arg) => {
    console.log(arg)
    io.emit("sDownResponse")
  })

  socket.on("arrowUp", (arg) => {
    console.log(arg)
    io.emit("upDownResponse")
  })

  socket.on("arrowDown", (arg) => {
    console.log(arg)
    io.emit("arrowDownResponse")
  })

  socket.on("positionUpdate", (positions) => {
    io.emit("positionsServer", positions);
  })

});

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

httpServer.listen(port)


