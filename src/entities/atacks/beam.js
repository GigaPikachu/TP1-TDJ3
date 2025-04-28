export class beam extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "effects", 7);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.anims.play("beam")
    }
}

export function createBeam(scene, x, y, invocador, direction) {
    invocador.beamParts = [];
    scene.BeamPower.play();
    
    for (let i = 1; i < 6; i ++) {
        if (!invocador.beamParts[i]) {
            invocador.beamParts[i] = new beam(scene, x, y - 8 * i, direction);
            if (invocador != scene.player) {
                scene.AtaqueEnemigo.add(invocador.beamParts[i]);
            } else {
                scene.AtaquePlayer.add(invocador.beamParts[i]);
            }
            invocador.beamParts[i].radius = i * 8;
            invocador.beamParts[i].angulo = -90 * Math.PI / 180; // 90 grados en radianes
            // para calcular la velocidad de cada uno hacemos (2 * pi * r) para calcular el diametro y lo dividimos entre 60 fps para que su velocidad sea la exacta para que todos den 1 vuelta en un segudo al mismo tiempo a pesar de su radio diferente
            invocador.beamParts[i].beamY = 8;
            if (direction === "derecha") { //
                invocador.beamParts[i].speed = 0.1;
                invocador.beamParts[i].beamX = 4;
            } else {
                invocador.beamParts[i].speed = -0.1;
                invocador.beamParts[i].beamX = -4;
            }

            scene.time.addEvent({
                delay: 500,
                callback: () => {
                    invocador.action = false;
                    if (invocador.beamParts[i].active) {
                        invocador.beamParts[i].destroy();
                        scene.BeamPower.stop();
                    }
                    invocador.beamParts[i] = null;
                },
                callbackScope: scene,
            });
        }
    }
}

export function updateBeam(scene, invocador) {
    for (let i = 1; i < 6; i ++) {
        if (invocador.beamParts[i]) {
            invocador.beamParts[i].angulo += invocador.beamParts[i].speed;
            invocador.beamParts[i].x = invocador.beamParts[i].beamX + invocador.x + invocador.beamParts[i].radius * Math.cos(invocador.beamParts[i].angulo);
            invocador.beamParts[i].y = invocador.beamParts[i].beamY + invocador.y + invocador.beamParts[i].radius * Math.sin(invocador.beamParts[i].angulo);
        }
        if (!invocador.active){
            scene.BeamPower.stop();
            invocador.beamParts[i].destroy();
            invocador.beamParts[i] = null;
        }
    }
}
