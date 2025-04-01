import { io } from 'socket.io-client';

// URL do servidor Socket.io
const url = "http://ec2-3-148-234-148.us-east-2.compute.amazonaws.com:4000/";

// Conectando ao servidor
const socket = io(url);

// Ao conectar, imprime o ID da conexão
socket.on("connect", () => {
    console.log("Conectado ao servidor com ID:", socket.id);
});

// Ao desconectar, imprime uma mensagem
socket.on("disconnect", () => {
    console.log("Desconectado do servidor");
});

// Emissão para se juntar à sala '5555'
const roomId = "5555";
socket.emit("joinRoom", roomId)


if (socket.connected) {
    console.log("Socket está conectado e pronto para enviar/receber eventos.");
} else {
    console.error("Socket não está conectado.");
}

export default socket;

