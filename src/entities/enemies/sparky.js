import { spark } from "../atacks/spark.js";

export class sparky extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x * 16, y * 16, "sparky", 1);

        this.scene = scene;
        
        //estadisticas
        this.jump = -75;
        this.velocity = 50;
        this.action = false;
        this.splash = false;
        this.spark = false;
        this.tipe_movement = 0; // 0 = nada, 1, moverse, 2 = saltar, 3 = atacar
        this.frecuencia = 700; // tiempo entre acciones

        this.enemyPower = 2
        this.score = 200;

        //fisicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.ObjetosAbsorbibles.add(this);
        scene.Enemigos.add(this);

        this.PlayerCollision = scene.physics.add.collider(this, scene.player, (enemy, player) => {
        });

        this.BackgroundCollision = scene.physics.add.collider(this, scene.fondo, (enemy, fondo) => {
            if (enemy.body.blocked.down && this.spark === false) {
                this.body.setVelocityX(0);
                this.setFrame(2);

                if (this.splash) {
                    scene.time.addEvent({
                        delay: 200,
                        callback: () => {
                            this.splash = false;
                            this.setFrame(1);
                        },
                        callbackScope: this,
                        loop: false,
                    });
                }
            }
        });

        scene.physics.add.overlap(this, scene.AtaquePlayer, (enemy, ataque) => {
            scene.Enemigos.remove(enemy, false, false);
            enemy.anims.stop();
            enemy.body.setVelocityX(0);
            enemy.update = () => { };
            enemy.anims.play("star", true);
            enemy.once('animationcomplete', (anim) => {
                if (anim.key === "star") {
                    enemy.destroy();
                }
            });
        });
    }

    update(scene) {
        if (!this.body.blocked.down) {
            this.setFrame(0);
            this.splash = true;
        } else if (!this.splash && this.spark === false) {
            this.setFrame(1);
        }

        if (this.action === false && this.body.blocked.down) {
            this.frecuencia = 700;
            this.action = true;

            if (this.scene.player.x > this.x) {
                this.velocity = 50;
                this.setFlipX(true);
            }else {
                this.velocity = -50;
                this.setFlipX(false);
            }

            this.tipe_movement = Phaser.Math.Between(0, 3);

            if (this.tipe_movement === 0) { //saltar en el lugar o atacar
                if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) <= 64) {
                    this.anims.play("sparkyspark", true);
                    this.spark = true;
                    this.frecuencia = 1500;
                    this.sparking = new spark(this.scene, this);
                    scene.SparkPower.play();
                } else {
                    this.body.setVelocityY(this.jump);
                }
            }
            else if (this.tipe_movement === 1 || this.tipe_movement === 2) { //salto corto hacia el jugador
                this.body.setVelocityY(this.jump);
                this.body.setVelocityX(this.velocity);
            }
            else if (this.tipe_movement === 3) { //salto largo hacia el jugador
                this.body.setVelocityY(this.jump * 2);
                this.body.setVelocityX(this.velocity);
            }

            this.scene.time.addEvent({
                delay: this.frecuencia,
                callback: () => {
                    this.action = false;
                    this.spark = false;
                    if (this.sparking) {
                        scene.SparkPower.stop();
                        this.sparking.particles.destroy();
                        this.sparking.destroy();
                    }
                },
                callbackScope: this,
                loop: false,
            })
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 128) {
            this.destroy();
        }
    }
}