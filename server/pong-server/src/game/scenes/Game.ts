import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import socket from '../../socketService';
import throttle from 'lodash/throttle'

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player1 = null;
        this.player2 = null;
        this.bola = null;
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('player', 'retangulo.jpg');
        this.load.image('bola', 'bola.png');

    }

    create ()
    {

        this.cameras.main.setBackgroundColor("#000fff");
        

        // objetos dos jogadores e bola 

        this.player1 = this.physics.add.sprite(40, 450, 'player').setImmovable(true);
        this.player2 = this.physics.add.sprite(984, 450, 'player').setImmovable(true);
        this.bola = this.physics.add.sprite(500, 450, 'bola').setScale(0.5)
     
        //para players e bola colidirem com as bordas do mapa sem sair 
        
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.bola.setCollideWorldBounds(true);


        // para  a bola quicar, 1 para não reduzir e 0.9 ou menos para reduzir se outra força não for aplicada 
        
        this.bola.setBounce(1);
        
        //movimentação inicial da bola 
        //aleatoriazar depoisssssssssssssss

        this.bola.setVelocityX(1000);
        this.bola.setVelocityY(50)
        
        // colisão de litle bolss com players 

        this.physics.add.collider(this.player1, this.bola);
        this.physics.add.collider(this.player2, this.bola);
   

        
      }
    update () {

        socket.on("wDownResponse", () => {
            console.log("W clicado")
            this.player1.setVelocityY(-360)
        })

        socket.on("sDownResponse", () => {
            console.log("S clicado")
            this.player1.setVelocityY(360)
        })

        // logica de movimentação do player2 

      socket.on("upDownResponse", () => {
            console.log("Seta para cima clicado")
            this.player2.setVelocityY(-360)
        })

        socket.on("arrowDownResponse", () => {
            console.log("Seta para baixo clicado")
            this.player2.setVelocityY(360)
        })


        

    }

}
