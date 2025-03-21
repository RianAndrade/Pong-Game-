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

      }
    update () {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            wDown: 'W',
            sDown: 'S'

        });
        
        const emitWDown = throttle(() => {
            socket.emit("wDown", "click w")
        }, 500);

        const emitSDown = throttle(() => {
            socket.emit("sDown", "click S")
        }, 500)
        
        if(Phaser.Input.Keyboard.JustDown(this.keys.wDown)) 
        {
            emitWDown();
        }

        else if (Phaser.Input.Keyboard.JustDown(this.keys.sDown)) {
            emitSDown()
        } 
 


        // logica de emição 
        
        const emitArrowUp = throttle(() => {
            socket.emit("arrowUp", "seta para cima clicado")
        }, 150)

        const emitArrowDown = throttle(() => {
            socket.emit("arrowDown", "Seta para baixo clicada")
        })

        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {   
            emitArrowUp();
        } 
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            emitArrowDown();
        }


    }

}