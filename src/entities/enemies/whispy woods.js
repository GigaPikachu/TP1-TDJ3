import { apple } from "./../atacks/apple.js";
import { wind } from "./../atacks/wind.js";

export class whispy_woods extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "whispy woods", 0);
        this.vida = 1;
        this.estado = 0; // 0 = viento, 1 = manzanas, 3 = cargar vida;
        this.wind = [];
        this.action = false;
        this.battleLoad = false;
        this.battleStart = false;
        this.invulnerable = false;

        // físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true); // <- Esto la hace inamovible
        this.body.setSize(48, 152);
        this.body.setOffset(8, -56);

        scene.physics.add.collider(this, scene.player);
        scene.physics.add.overlap(this, scene.AtaquePlayer, (whispy_woods, ataque) => {
            if (this.invulnerable === false && this.battleStart === true) {
                this.invulnerable = true;
                scene.cameras.main.shake(500, 0.01);
                this.anims.play("WhispyWoods_hurt", true)
                scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.invulnerable = false;
                    },
                    callbackScope: this,
                    loop: false,
                });
                this.vida -= 3;
            }
        });

        this.CargarVida = scene.time.addEvent({ //cargar vida
            delay: 100,
            callback: () => {
                if (this.battleLoad == true){
                    if (this.vida != 28) {
                        this.vida += 1;
                    } else {
                        this.battleStart = true;
                        this.CargarVida.destroy();
                    }
                }
            },
            callbackScope: this,
            loop: true,
        });

        this.anims.play("WhispyWoods_normal", true)
    }

    update() {
        if (this.vida <= 0) {
            this.anims.play("WhispyWoods_lose", true)
        }
        else if (this.battleStart){
            if (this.estado == 0) {
                if (this.action === false && this.invulnerable === false) {
                    this.action = true;
                    this.anims.play("WhispyWoods_normal", true)
                    this.scene.time.addEvent({ //cargar vida
                        delay: 2500,
                        callback: () => {
                            this.estado = Phaser.Math.Between(1, 2);
                            console.log(this.estado)
                        },
                        callbackScope: this,
                        loop: false,
                    });
                }
            }

            else if (this.estado == 1) {

                this.apple = new apple(this.scene, Phaser.Math.Between(1, 9) * 16);
                this.scene.time.addEvent({ //cargar vida
                    delay: 1650,
                    callback: () => {
                        this.apple = new apple(this.scene, Phaser.Math.Between(1, 9) * 16);
                        this.scene.time.addEvent({ //cargar vida
                            delay: 1650,
                            callback: () => {
                                this.apple = new apple(this.scene, Phaser.Math.Between(1, 9) * 16);
                                this.action = false;
                            },
                            callbackScope: this,
                            loop: false,
                        });
                    },
                    callbackScope: this,
                    loop: false,
                });

                this.estado = 0;
            }

            else if (this.estado == 2) {
                this.anims.stop();
                this.setFrame(4);
                this.winds = Phaser.Math.Between(0, 3);
                this.contador = 0;
                this.wind[0] = new wind(this.scene);
                this.timer = this.scene.time.addEvent({ //cargar vida
                    delay: 500,
                    callback: () => {
                        if (this.contador < this.winds) {
                            this.anims.play("WhispyWoods_atack", true)
                            this.contador += 1;
                            this.wind[this.contador] = new wind(this.scene);
                        } else {
                            this.timer.destroy();
                            this.action = false;
                        }
                    },
                    callbackScope: this,
                    loop: true,
                });

                this.estado = 0;
            }
        }
    }
}
