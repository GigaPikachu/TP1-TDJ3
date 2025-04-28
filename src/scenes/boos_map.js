import { load_map } from "./../components/map/load_map.js";
import { preloadSounds, sounds } from "./../components/sounds.js";
import { player } from "./../entities/player.js"

import { whispy_woods } from "./../entities/enemies/whispy woods.js"

import { anims } from "./../components/anims.js";

export default class BoosMap extends Phaser.Scene {
    constructor() {
      super("BoosMap");
      this.pause = false;
    }

    init (data) {
        console.log("init scene 2");
        this.StopCamera = false;

        this.vidas = [];
        this.vidas[0] = data.vidas[0] || 6;
        this.vidas[1] = data.vidas[0] || 3;
        this.power = data.power
        this.score = data.score || 0;
    }

    create () {
        sounds(this);
        this.Boss.play();

        //Background
        this.background = this.add.image(0, 8, "background").setOrigin(0, 0);

        this.map = this.make.tilemap({ key: "boos_map" })
        this.tileset = this.map.addTilesetImage( "Boos_Tileset", "Nivel2_tileset" )
        this.fondo = this.map.createLayer( "Capa2", this.tileset )
    
        //coliciones
        this.fondo.setCollisionByProperty({ colision: true })
        
        //objetos y personajes
        this.ObjetosAbsorbibles = this.physics.add.group();
        this.Enemigos = this.physics.add.group();
        this.AtaqueEnemigo = this.physics.add.group();

        this.player = new player(this, 1, 0, 0, this.vidas);
        this.AtaquePlayer = this.physics.add.group();
        
        this.whispy_woods = new whispy_woods(this, 196, 304)

        //camara
        this.physics.world.setBounds(8, 8, 240, 440);
        this.cameras.main.setBounds(0, 8, 256, 440)
        this.cameras.main.startFollow(this.player, false, 0, 0.1);

        //gamepad
        window.addEventListener("gamepadconnected", function(e) {
            console.log("🎮 Gamepad conectado:", e.gamepad);
        });

        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("⛔ Gamepad desconectado:", e.gamepad);
        });

        // Creamos un objeto para guardar el estado anterior de botones
        this.previousButtonStates = [];
    }

    update () {
        this.player.update();
        this.whispy_woods.update();
        if (!this.StopCamera){
            if (this.player.y > 304){
                console.log(this.player.Lives[0])
                this.physics.world.setBounds(8, 224, 240, 440);
                this.cameras.main.stopFollow(this.player);
                this.cameras.main.pan(120, 320, 500, 'Linear');
                this.StopCamera = true;
                this.whispy_woods.battleLoad = true;
            }
        }

        if (this.whispy_woods.vida <= 0) {
            this.Boss.stop();
            if (this.Fanfare.isPlaying == false){
                this.Fanfare.play();
            }
        }

        //actualizar Hud
        this.scene.get("Hud").updateHud(this.player, this.player.score, this.whispy_woods);
    }

}
