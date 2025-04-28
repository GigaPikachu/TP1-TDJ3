export class StarAttack extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, direction) {
        super(scene, x, y + 8, "effects", 12);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.AtaquePlayer.add(this);
        this.body.setAllowGravity(false);
        
        this.velocity = 300;
        if (direction === "izquierda") {
            this.velocity = -this.velocity;
        }
        
        scene.physics.add.collider(this, scene.fondo, (star, fondo) => {
            this.anims.play("explosion", true);

            this.once('animationcomplete', (anim) => {
                if (anim.key === "explosion") {
                    this.destroy();
                }
            });
        });
        scene.physics.add.collider(this, scene.Enemigos, (star, enemy) => {
            this.destroy();
        });

        this.body.setVelocityX(this.velocity)

        //animacion
        this.anims.play("star", { repeat: -1 });
    }
}