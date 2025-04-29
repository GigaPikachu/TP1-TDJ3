
import { anims } from "../components/anims.js";
import { preloadSounds, sounds } from "../components/sounds.js";

export default class preload extends Phaser.Scene {
    constructor() {
      super("preload");
    }

    preload () {
        this.load.spritesheet("kirby", "./public/assets/Sprites/kirby.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("aspiradora", "./public/assets/Sprites/aspiradora.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("waddle dee", "./public/assets/Sprites/waddle%20dee.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("waddle doo", "./public/assets/Sprites/waddle%20doo.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("bronto burt", "./public/assets/Sprites/bronto%20burt.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("sparky", "./public/assets/Sprites/sparky.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("hot head", "./public/assets/Sprites/hot%20head.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("whispy woods", "./public/assets/Sprites/whispy%20woods.png", {
            frameWidth: 56,
            frameHeight: 96,
        });

        this.load.image("puerta", "./public/assets/Sprites/puerta.png");
        this.load.spritesheet("effects", "./public/assets/Sprites/effects.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("apple", "./public/assets/Sprites/apple.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.image("test_tileset", "./public/assets/tiles/tilesets/test.png");
        this.load.tilemapTiledJSON("test_map", "./public/assets/tiles/tilemaps/test_map.json");
        this.load.image("background", "./public/assets/tiles/tilesets/background.png");
        this.load.image("Nivel2_tileset", "./public/assets/tiles/tilesets/Nivel_2.png");
        this.load.tilemapTiledJSON("boos_map", "./public/assets/tiles/tilemaps/boos_map.json");
        
        this.load.audio("Green Fields", "./public/music/Green%20Fields.mp3");
        this.load.audio("Boss!", "./public/music/Boss!.mp3");
        this.load.audio("Fanfare", "./public/music/Fanfare.mp3");
    
        this.load.audio("Salto", "./public/sounds/salto.flac");
        this.load.audio("Desinflar", "./public/sounds/desinflar.flac");
        this.load.audio("Daño", "./public/sounds/daño.flac");
    
        this.load.audio("AspiradoraInit", "./public/sounds/aspiradora_init.flac");
        this.load.audio("Aspiradora", "./public/sounds/aspiradora.flac");
        this.load.audio("Disparar", "./public/sounds/disparar.flac");
        this.load.audio("BeamPower", "./public/sounds/BeamPower.flac");
        this.load.audio("SparkPower", "./public/sounds/SparkPower.flac");
        this.load.audio("FirePower", "./public/sounds/FirePower.flac");
    }

    create () {
        this.scene.start("test");
        anims(this);
        sounds(this);
    }
}
