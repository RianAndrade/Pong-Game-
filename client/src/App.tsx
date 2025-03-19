import { useRef, useEffect, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { io, Socket } from "socket.io-client";

function App() {
    const url = "http://localhost:4000";
    
    const [socketId, setSocketId] = useState<string | null>(null);
    
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io(url);
        socketRef.current = socket; 

        socket.on("connect", () => {
            console.log("Conectado ao servidor com ID:", socket.id);
            setSocketId(socket.id);
        });

        return () => {
            socket.disconnect(); 
        };
    }, []);

    // Referência para o PhaserGame
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const addSprite = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene;

            if (scene) {
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
                scene.add.sprite(x, y, "star");
            }
        }
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div>Socket ID: {socketId ?? "Desconectado"}</div>
            </div>
        </div>
    );
}

export default App;

