import test from "./scenes/test.js";
import BoosMap from "./scenes/boos_map.js";
import Hud from "./scenes/Hud.js";
import preload from "./scenes/preload.js";

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 256,
            height: 240,
        },
        max: {
            width: 512,
            height: 480,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 450, x: 0 },
            debug: true, //muestra los colaiders y los movimientos
        },
    },
  
    pixelArt: true,

    scene: [
        preload,
        test,
        BoosMap,
        Hud,
    ]
};

export default new Phaser.Game(config);