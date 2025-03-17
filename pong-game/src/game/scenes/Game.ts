import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
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
        this.add.image(512, 350, 'logo').setDepth(100);
        let player1 = this.physics.add.sprite(40, 450, 'player');
        let player2 = this.physics.add.sprite(984, 450, 'player');
        let bola = this.physics.add.sprite(500, 450, 'bola').setScale(0.5)
        
        //para players e bola colidirem com as bordas do mapa sem sair 
        
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);
        bola.setCollideWorldBounds(true);
    }
}