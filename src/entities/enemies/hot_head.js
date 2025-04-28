import { fireball } from "./../atacks/fireball.js";

export class hot_head extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 16, y * 16, "hot head", 0);

        // estadísticas
        this.velocity = 25;
        this.action = false;
        this.tipe_movement = 0;
        this.distance = 40;
        this.direccion = "derecha";

        this.enemyPower = 3;
        this.score = 200;

        // físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.ObjetosAbsorbibles.add(this);
        scene.Enemigos.add(this);

        this.body.setVelocityX(this.velocity);

        this.PlayerCollision = scene.physics.add.collider(this, scene.player, (enemy, player) => {
        });

        this.BackgroundCollision = scene.physics.add.collider(this, scene.fondo, (enemy, fondo) => {
            if (enemy.body.blocked.left) {
                this.direccion = "derecha";
                this.setFlipX(true);
            } else if (enemy.body.blocked.right) {
                this.direccion = "izquierda";
                this.setFlipX(false);
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

    update() {
        if (this.tipe_movement === 0) {
            if (Math.abs(this.scene.player.x - this.x) <= this.distance + 1 &&
                Math.abs(this.scene.player.x - this.x) >= this.distance - 1 && this.action === false) { // si el jugador se encuentra a 40px de distancia
                this.action = true;
                this.body.setVelocityX(0);
                this.tipe_movement = 1;

                this.anims.play("hot headprepararse", true);

                if (this.scene.player.x < this.x) {
                    this.direccion = "izquierda";
                    this.setFlipX(false);
                } else {
                    this.direccion = "derecha";
                    this.setFlipX(true);
                }

                this.once('animationcomplete', (anim) => {
                    if (anim.key === "hot headprepararse") {
                        this.anims.play("hot headdisparar", true);

                        this.repeticion = this.scene.time.addEvent({ //repeticion de proyactil hasta que termine el ataque
                            delay: 100,
                            callback: () => {
                                if (this.active){
                                    if (this.anims.isPlaying && this.anims.currentAnim.key == "hot headdisparar") {
                                        this.fireball = new fireball(this.scene, this.x, this.y, this.direccion, 0);
                                    } else {
                                        this.repeticion.remove();
                                    }
                                } else {
                                    this.repeticion.remove();
                                }
                            },
                            callbackScope: this,
                            loop: true,
                        });

                        this.scene.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                if (this.active) {
                                    this.tipe_movement = 0;
                                    this.scene.time.addEvent({
                                        delay: 3000,
                                        callback: () => {
                                            if (this.active) {
                                                this.action = false;
                                            }
                                        },
                                        callbackScope: this,
                                        loop: false,
                                    });
                                }
                            },
                            callbackScope: this,
                            loop: false,
                        });
                    }
                });

            }
            //tipo de movimiento 1
            else if (Math.abs(this.scene.player.x - this.x) <= this.distance * 2.5 + 1 &&
            Math.abs(this.scene.player.x - this.x) >= this.distance * 2.5 - 1 && this.action === false){ // si el jugador se encuentra a 80px de distancia
                this.action = true;
                this.body.setVelocityX(0);
                this.tipe_movement = 2;

                this.anims.play("hot headprepararse", true);

                if (this.scene.player.x < this.x) {
                    this.direccion = "izquierda";
                    this.setFlipX(false);
                } else {
                    this.direccion = "derecha";
                    this.setFlipX(true);
                }

                this.once('animationcomplete', (anim) => { //cuando completa la animacion de prepararse
                    if (anim.key === "hot headprepararse") {
                        this.anims.play("hot headdisparar", true);
                        this.fireball = new fireball(this.scene, this.x, this.y, this.direccion, 1, this);

                        this.scene.time.addEvent({
                            delay: 500,
                            callback: () => {
                                if (this.active) {
                                    this.tipe_movement = 0;
                                    this.scene.time.addEvent({
                                        delay: 5000,
                                        callback: () => {
                                            this.action = false;
                                        },
                                        callbackScope: this,
                                        loop: false,
                                    });
                                }
                            },
                            callbackScope: this,
                            loop: false,
                        });
                    }
                });

            }else { // caminar
                this.anims.play("hot headcaminar", true);
                if (this.direccion === "izquierda") {
                    this.body.setVelocityX(-this.velocity);
                } else {
                    this.body.setVelocityX(this.velocity);
                }
            }
            
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 128) {
            this.destroy();
        }
    }
}
