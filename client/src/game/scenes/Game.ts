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
        this.load.image('logo', 'logo.png');
    }

    create ()
    {

        this.cameras.main.setBackgroundColor("#000fff");
        

        this.player1 = this.physics.add.sprite(40, 450, 'player').setImmovable(true);
        this.player2 = this.physics.add.sprite(984, 450, 'player').setImmovable(true);
        this.bola = this.physics.add.sprite(500, 450, 'bola').setScale(0.5)
     
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        this.bola.setCollideWorldBounds(true);
        


        // inputaass 
        
                
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            wDown: 'W',
            sDown: 'S'

        });

        this.emitWDown = throttle(() => {
            socket.emit("wDown", "click w")
        }, 500);

        this.emitSDown = throttle(() => {
            socket.emit("sDown", "click S")
        }, 500)

        this.emitArrowUp = throttle(() => {
            socket.emit("arrowUp", "seta para cima clicado")
        }, 150)

        this.emitArrowDown = throttle(() => {
            socket.emit("arrowDown", "Seta para baixo clicada")
        })
        
         socket.on("positionsServer", (positions) => {
            this.player1.setPosition(positions.player1.x, positions.player1.y);
            this.player2.setPosition(positions.player2.x, positions.player2.y);
            this.bola.setPosition(positions.bola.x, positions.bola.y);
        });


      }
    update () {




        if(Phaser.Input.Keyboard.JustDown(this.keys.wDown)) {
            this.emitWDown();
        }

        else if (Phaser.Input.Keyboard.JustDown(this.keys.sDown)) {
            this.emitSDown()
        } 


        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {   
            this.emitArrowUp();
        } 
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.emitArrowDown();
        }


    }

}