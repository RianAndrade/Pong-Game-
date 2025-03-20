import { Scene } from 'phaser';
import  socket  from '../../socketService.ts'

export class StartGame extends Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
    }

    create() {
        let startButton = this.add.text(400, 300, 'Aguardando Jogador', {
            fontSize: '32px',
            fill: '#fff',
        })
        .setOrigin(0.5) // Centraliza o texto
        

            
    }

    update() {
        socket.on("startGame", () => {
            console.log("Chegou mais um")
            this.scene.start('Game');
        })


    }
}
