export class apple extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x) {
        super(scene, x, 14 * 16, "apple", 0);

        this.direccion = null;
        this.piso = false;

        // físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.Enemigos.add(this);
        scene.ObjetosAbsorbibles.add(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.body.setAllowGravity(false);
        this.body.setImmovable(true); // <- Esto la hace inamovible
        this.anims.play("appleInit", true)

        this.PlayerCollision = scene.physics.add.collider(this, scene.player, (objeto, player) => {
        });

        scene.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (body.gameObject === this && (left || right)) {
                this.destroy();
            }
        });

        scene.physics.add.collider(this, scene.fondo, () => {
            if(this.direccion == null){
                if (scene.player.x > this.x){
                    this.direccion = "derecha";
                    this.body.setVelocityX(75)
                } else {
                    this.direccion = "izquierda";
                    this.body.setVelocityX(-75)
                }

                this.body.setVelocityY(-145)
                //la manzana demora en caer 1650 milisegundos
            }
        });
        
        scene.time.addEvent({ //repeticion de proyactil hasta que termine el ataque
            delay: 1000,
            callback: () => {
                this.body.setAllowGravity(true);
                this.body.setImmovable(false); // <- Esto la hace inamovible

                this.anims.play("apple", true)
            },
            callbackScope: this,
            loop: false,
        });
    }
}