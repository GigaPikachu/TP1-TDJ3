import { vidas } from "./src/entities/hud/vidas.js";

export default class BoosMap extends Phaser.Scene {
    constructor() {
      super("Hud");
    }

    init (data) {
        this.vidas = [];
        this.vidas[0] = data.vidas[0] || 6;
        this.vidas[1] = data.vidas[1] || 3;

        this.bossVida = [];

        this.power = data.power || 0;
        this.score = data.score || 9999999;
    }

    preload () {
        this.load.spritesheet("Hud", "../../public/assets/Hud/Hud.png", {
            frameWidth: 256,
            frameHeight: 64,
        });
        this.load.spritesheet("vidas", "../../public/assets/Hud/Vidas.png", {
            frameWidth: 8,
            frameHeight: 16,
        });

        this.load.image("Bossvidas", "../../public/assets/Hud/Boss Vidas.png");

        this.load.spritesheet("powers", "../../public/assets/Hud/Powers.png", {
            frameWidth: 32,
            frameHeight: 40,
        });
    }

    create () {
        this.hud = this.add.sprite(0, 176, "Hud").setOrigin(0, 0);
        this.vida = [];

        this.time.addEvent({ //repeticion de proyactil hasta que termine el ataque
            delay: 200,
            callback: () => {
                this.points = this.add.text(80, 208, this.score.toString().padStart(7, '0'), { fontFamily: 'Kirby', fontSize: 8, color: '#541E04'}).setOrigin(0.0);
            },
            callbackScope: this,
            loop: false,
        });

        this.SpritePower = this.add.sprite(168, 204, "powers")

        for (let i = 0; i < this.vidas[0]; i++) {
            this.vida[i] = new vidas(this, 10 + i, 2, "vidas");
        }
    }

    updateHud (jugador, score, whispy_woods) {
        if (this.vidas[0] != jugador.Lives[0]){
            this.vidas[0] = jugador.Lives[0];
            this.vida[this.vida.length - 1].destroy();
            this.vida.pop();
        }

        if (jugador.inmunity == true) {
            this.SpritePower.setFrame(2);
        }
        else {
            this.power = jugador.power
            if (jugador.nothing == true){
                this.SpritePower.setFrame(1);
            }
            else if (this.power == 1){
                this.SpritePower.setFrame(3);
            }
            else if (this.power == 2){
                this.SpritePower.setFrame(4);
            }
            else if (this.power == 3){
                this.SpritePower.setFrame(5);
            }
            else if (this.power == 0){
                if (this.SpritePower){
                    this.SpritePower.setFrame(0);
                }
            }
        }

        if (!whispy_woods) {
            if (this.score) {
                if (this.score != score){
                    this.score = score;
                    if (this.points) {
                        this.points.setText( this.score.toString().padStart(7, '0'));
                    }
                }
            }
        }
        else {
            if (whispy_woods.battleLoad === true && whispy_woods.battleStart === false){ //el boss tiene 28 vidas
                this.hud.setFrame(1);
                if (this.points) {
                    this.points.setText("");
                }
                for (let i = 0; i <= 28; i++) {
                    if (!this.bossVida[i] && whispy_woods.vida == i){
                        this.bossVida[i] = this.add.image(77 + 2 * i, 208, "Bossvidas").setOrigin(0, 0);
                    }
                }
            }
            else if (whispy_woods.battleStart == true){
                for (let i = 1; i <= 28; i++) {
                    if (this.bossVida[i] && whispy_woods.vida < i){
                        this.bossVida[i].destroy()
                    }
                }
            }
        }
    }
}
