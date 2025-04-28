export class StarPower extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, direction, power) {
        super(scene, x, y + 8, "effects", 12);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.ObjetosAbsorbibles.add(this);
        this.setBounce(1);
        
        this.enemyPower = power;
        this.velocity = -75;
        if (direction === "izquierda") {
            this.velocity = this.velocity;
        }


        this.PlayerCollision = scene.physics.add.overlap(this, scene.player, (enemy, player) => {
        });
        scene.physics.add.collider(this, scene.fondo);

        this.body.setVelocityX(this.velocity)
        this.body.setVelocityY(200)

        //animacion
        this.anims.play("star");

        scene.time.addEvent({
            delay: 10000,
            callback: () => {
                this.destroy();
            },
            callbackScope: this,
            loop: false,
        });
    }
}