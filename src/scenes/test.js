import { load_map } from "./../components/map/load_map.js";
import { player } from "./../entities/player.js"
import { puerta } from "./../components/map/puerta.js";

import { waddle } from "./../entities/enemies/waddle.js";
import { bronto_burt } from "./../entities/enemies/bronto_burt.js";
import { sparky } from "./../entities/enemies/sparky.js";
import { hot_head } from "./../entities/enemies/hot_head.js";

import { anims } from "./../components/anims.js";
import { preloadSounds, sounds } from "./../components/sounds.js";

export default class test extends Phaser.Scene {
    constructor() {
      super("test");
      this.pause = false;
      this.score = 0;
    }

    init () {
        console.log("init scene test");

        // estadisticas del jugador
        this.vidas = []
        this.vidas[0] = 6;
        this.vidas[1] = 3;

        //hud
        this.scene.launch("Hud", { vidas: this.vidas});

        this.CameraInEnemys = [false, false, false, false, false, false, false, false, false]
    }

    create () {
        sounds(this);
        this.GreenFields.play();

        load_map(this, "test_map", "test_tileset", "ByN", "Capa1");
        
        this.ObjetosAbsorbibles = this.physics.add.group();
        this.Enemigos = this.physics.add.group();
        this.AtaqueEnemigo = this.physics.add.group();

        this.player = new player(this, 5, 7.5, 0, this.vidas);
        this.AtaquePlayer = this.physics.add.group();
        
        //camara
        this.physics.world.setBounds(0, 8, 1008, 176);
        this.cameras.main.setBounds(0, 0, 1008, 176)
        this.cameras.main.startFollow(this.player, false, 0.1, 0);

        this.puerta = new puerta(this, 60, 7);
    }

    update (time, delta) {
        this.player.update();
        //crear enemigos
        if (Phaser.Math.Distance.Between(19 * 16, 7 * 16, this.player.x, this.player.y) < 128
        && !this.waddle_doo) {
            this.waddle_doo = new waddle(this, 18, 7, "waddle doo");
        }

        if (Phaser.Math.Distance.Between( this.player.x, this.player.y, 23 * 16, 8 * 16,) < 128) {
            if (!this.CameraInEnemys[1]){
                if (!this.waddle_dee) {
                    this.waddle_dee = new waddle(this, 22, 8, "waddle dee");
                } else {
                    if (!this.waddle_dee.active) {
                        this.waddle_dee = null;
                        this.waddle_dee = new waddle(this, 22, 8, "waddle dee");
                    }
                }
                this.CameraInEnemys[1] = true;
            }
        } else{
            this.CameraInEnemys[1] = false;
        }

        if (Phaser.Math.Distance.Between(25 * 16, 4 * 16, this.player.x, this.player.y) < 128
        && !this.bronto_burt) {
            this.bronto_burt = new bronto_burt(this, 24, 4, 1);
        }

        if (Phaser.Math.Distance.Between(30 * 16, 8 * 16, this.player.x, this.player.y) < 128
        && !this.waddle_doo2) {
            this.waddle_doo2 = new waddle(this, 29, 8, "waddle doo");
        }

        if (Phaser.Math.Distance.Between(35 * 16, 7 * 16, this.player.x, this.player.y) < 128
        && !this.bronto_burt2) {
            this.bronto_burt2 = new bronto_burt(this, 34, 7, 0);
        }

        if (Phaser.Math.Distance.Between(38 * 16, 7 * 16, this.player.x, this.player.y) < 128
        && !this.sparky) {
            this.sparky = new sparky(this, 37, 7);
        }

        if (Phaser.Math.Distance.Between(44 * 16, 7 * 16, this.player.x, this.player.y) < 128
        && !this.waddle_dee2) {
            this.waddle_dee2 = new waddle(this, 43, 7, "waddle dee");
        }

        if (Phaser.Math.Distance.Between(49 * 16, 3 * 16, this.player.x, this.player.y) < 128
        && !this.bronto_burt3) {
            this.bronto_burt3 = new bronto_burt(this, 48, 3, 1);
        }

        if (Phaser.Math.Distance.Between(59 * 16, 7 * 16, this.player.x, this.player.y) < 128
        && !this.hot_head) {
            this.hot_head = new hot_head(this, 58, 7, 1);
        }



        if (!this.pause) { //actualizarlos
            if (this.waddle_doo) {
                if (this.waddle_doo.active) {
                    this.waddle_doo.update();
                }
            }
            if (this.waddle_doo2) {
                if (this.waddle_doo2.active) {
                    this.waddle_doo2.update();
                }
            }
            if (this.waddle_dee) {
                if (this.waddle_dee.active) {
                    this.waddle_dee.update();
                }
            }
            if (this.waddle_dee2) {
                if (this.waddle_dee2.active) {
                    this.waddle_dee2.update();
                }
            }

            if (this.bronto_burt) {
                if (this.bronto_burt.active) {
                    this.bronto_burt.update(time, delta);
                }
            }
            if (this.bronto_burt2) {
                if (this.bronto_burt2.active) {
                    this.bronto_burt2.update(time, delta);
                }
            }
            if (this.bronto_burt3) {
                if (this.bronto_burt3.active) {
                    this.bronto_burt3.update(time, delta);
                }
            }

            if (this.sparky) {
                if (this.sparky.active) {
                    this.sparky.update(this);
                }
            }

            if (this.hot_head) {
                if (this.hot_head.active) {
                    this.hot_head.update();
                }
            }
        }

        //actualizar Hud
        this.scene.get("Hud").updateHud(this.player, this.player.score);
    }
}
