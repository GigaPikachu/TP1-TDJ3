export function setTeclas(jugador, scene) {
    jugador.teclas = {};

    jugador.teclas.enter = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
    jugador.teclas.up = scene.input.keyboard.createCursorKeys().up;
    jugador.teclas.down = scene.input.keyboard.createCursorKeys().down;
    jugador.teclas.left = scene.input.keyboard.createCursorKeys().left;
    jugador.teclas.right = scene.input.keyboard.createCursorKeys().right;
    
    jugador.teclas.TZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    jugador.teclas.TX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    jugador.teclas.TC = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    // NUEVO: Guardamos también un objeto de "botones de gamepad"
    jugador.pad = {
        index: 2, // número del gamepad (0 o 1, depende de qué control uses)
        mapping: {
            TZ: 0, // Botón círculo (por ejemplo) -> botón índice 0
            TX: 1, // Botón X -> botón índice 1
            TC: 2, // Botón cuadrado -> botón índice 2
            enter: 9, // Start
            up: 12,
            down: 13,
            left: 14,
            right: 15,
        }
    };
}

export function actualizarTeclasDesdeGamepad (jugador) {
    if (!jugador || !jugador.pad || !jugador.teclas) return;

    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = pads[jugador.pad.index];

    if (!pad) return;

    // Botones normales
    for (const key in jugador.pad.mapping) {
        const map = jugador.pad.mapping[key];

        if (typeof map === 'number') { // Si el mapeo es un número, es un botón
            const button = pad.buttons[map];
            if (!button) continue;

            jugador.teclas[key].isDown = button.pressed;
            jugador.teclas[key].isUp = !button.pressed;
        }
    }

    jugador.teclas.up.isUp = !jugador.teclas.up.isDown;
    jugador.teclas.down.isUp = !jugador.teclas.down.isDown;
    jugador.teclas.left.isUp = !jugador.teclas.left.isDown;
    jugador.teclas.right.isUp = !jugador.teclas.right.isDown;
}