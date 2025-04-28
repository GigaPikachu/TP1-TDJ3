export class fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, type, invocador) {
        super(scene, x, y, "effects", 0);

        // físicas
        this.velocidad = 200;
        this.LiveTime = 100;
        this.type = type;
        this.direction = direction;

        //sonido
        scene.FirePower.play()

        scene.add.existing(this);
        scene.physics.add.existing(this);
        if (invocador === scene.player){
            scene.AtaquePlayer.add(this);
        } else {
            scene.AtaqueEnemigo.add(this);
        }
        this.body.setAllowGravity(false);

        this.PlayerCollision = scene.physics.add.overlap(this, scene.player, (enemy, player) => {
            if(!player.inmunity) {
                this.body.setVelocity(0);
                this.anims.play("explosion", true);
    
                this.once('animationcomplete', (anim) => {
                    if (anim.key === "explosion") {
                        this.destroy();
                    }
                });
    
                player.vida -= 1;
                player.inmunity = true;
                this.PlayerCollision.active = false;
            }
        });

        this.BackgroundCollision = scene.physics.add.collider(this, scene.fondo, (enemy, fondo) => {
            if (this.body.blocked.left || this.body.blocked.right) {
                this.body.setVelocity(0);
                this.anims.play("explosion", true);
    
                this.once('animationcomplete', (anim) => {
                    if (anim.key === "explosion") {
                        this.destroy();
                    }
                });
            }
        });

        if (this.direction === "derecha") {
            this.setFlipX(true);
            this.x += 16;
        } else {
            this.setFlipX(false);
            this.x -= 16;
        }

        if (this.type === 1) {
            scene.physics.moveToObject(this, scene.player, this.velocidad);
        } else {
            
            if (this.direction === "izquierda") {
                this.velocidad *= -1;
            }
            this.body.setVelocityX(this.velocidad);
            this.body.setVelocityY(Phaser.Math.Between(-100, 100));
            scene.time.addEvent({
                delay: this.LiveTime,
                callback: () => {
                    this.destroy();
                },
                callbackScope: this,
                loop: false,
            })
        }

        // animación
        this.anims.play("fireball", true);
    }
}