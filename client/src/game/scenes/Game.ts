import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.player1 = null;
        this.player2 = null;
        this.bola = null;
        this.wKey = null
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
        

        // objetos dos jogadores e bola 
        //
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
        this.bola.setVelocityY(500)
        
        // colisão de litle bolss com players 

        this.physics.add.collider(this.player1, this.bola);
        this.physics.add.collider(this.player2, this.bola);
   

        
      }
    update () {
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            wDown: 'W',
            sDown: 'S'

        });

        
        if( this.keys.wDown.isDown) 
        {
            console.log("up do negrom")
            this.player1.setVelocityY(-360)
        }
        else if (this.keys.sDown.isDown) {
            this.player1.setVelocityY(360)
        } 
        else{
            this.player1.setVelocityY(0)
        }

        // logica de movimentação do player2 

        if (this.cursors.up.isDown)
        {   
            console.log("up")
            this.player2.setVelocityY(-360);
            
        }

        else if (this.cursors.down.isDown) {
            console.log("Dawson e Jason")
            this.player2.setVelocityY(360);
        }

        else{
            this.player2.setVelocityY(0)
        }
        

    }

}