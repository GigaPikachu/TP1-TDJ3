import { createBeam, updateBeam } from "../atacks/beam.js";

export class waddle extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, sprite) {
        super(scene, x * 16, y * 16, sprite, 0);
        
        //estadisticas
        this.velocity = 50;
        if (scene.player.x > this.x) { //el enemigo mira a la derecha
            this.direccion = "derecha";
        } else {
            this.direccion = "izquierda";
        }
        this.sprite = sprite;
        this.action = false;
        this.beam = false;
        this.enemyPower = 0;
        this.score = 100;

        //fisicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.ObjetosAbsorbibles.add(this);
        scene.Enemigos.add(this);
        
        this.body.setVelocityX(this.velocity);
        this.PlayerCollision = scene.physics.add.overlap(this, scene.player);

        this.BackgroundCollision = scene.physics.add.collider(this, scene.fondo, (enemy, fondo) => {
            if (enemy.body.blocked.left) {
                this.direccion = "derecha";
            }else if (enemy.body.blocked.right) {
                this.direccion = "izquierda";
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

        //animasiones
        if (this.sprite === "waddle doo") {
            this.saltar = false;
            this.enemyPower = 1;
        }

        this.anims.play(sprite + "caminar", true);
    }

    update () {
        if (this.sprite === "waddle doo") {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 48 && !this.beam && !this.action) { // accion de ataque
                this.action = true;
                this.body.setVelocityX(0);
                this.anims.play(this.sprite + "preparar", true);
                
                this.once('animationcomplete-waddle doopreparar', () => {
                    this.beam = true;
                    createBeam(this.scene, this.x, this.y, this, this.direccion);
                    this.scene.time.addEvent({
                        delay: 3000,
                        callback: () => {
                            this.beam = false;
                        },
                        callbackScope: this,
                        loop: false,
                    });
                })
            }
    
            if (this.action) {
                if (this.beam === true) {
                    updateBeam(this.scene, this);
                }
            } else { //desplazarse

                if (this.saltar === false) {
                    this.saltar = true;
                    this.scene.time.addEvent({
                        delay: 3000,
                        callback: () => {
                            this.saltar = false;
                            if (this.beam === false && this && this.active) {
                                this.body.setVelocityY(-175);
                            }
                        },
                        callbackScope: this,
                        loop: false,
                    });
                }
                if (this.direccion === "izquierda") {
                    this.body.setVelocityX(-this.velocity);
                    this.setFlipX(false);
                }else {
                    this.body.setVelocityX(this.velocity);
                    this.setFlipX(true);
                }
            }
        } else {

            if (this.direccion === "izquierda") {
                this.body.setVelocityX(-this.velocity);
                this.setFlipX(false);
            }else {
                this.body.setVelocityX(this.velocity);
                this.setFlipX(true);
            }

        }

        if (this.body.velocity.x != 0) {
            this.anims.play(this.sprite + "caminar", true);
        }
        
        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 128) {
            this.scene.this = null;
            this.destroy();
        }
    }
}