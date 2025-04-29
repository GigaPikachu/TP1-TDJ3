// Asigna teclas de teclado y prepara detección de gamepad
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

    // Inicia sin gamepad
    jugador.padIndex = null;
}

// Detecta automáticamente el índice del gamepad conectado
export function configurarDeteccionGamepad(jugador) {
    window.addEventListener("gamepadconnected", (e) => {
        console.log("🎮 Gamepad conectado:", e.gamepad);
        jugador.padIndex = e.gamepad.index;
    });

    window.addEventListener("gamepaddisconnected", (e) => {
        console.log("❌ Gamepad desconectado:", e.gamepad);
        jugador.padIndex = null;
    });
}

// Actualiza el estado de las teclas usando botones del gamepad
export function actualizarTeclasDesdeGamepad(jugador) {
    if (!jugador || jugador.padIndex === null || !jugador.teclas) return;

    const pads = navigator.getGamepads();
    const pad = pads[jugador.padIndex];
    if (!pad) return;

    // Mapeo: D-Pad
    const up = pad.buttons[12]?.pressed;
    const down = pad.buttons[13]?.pressed;
    const left = pad.buttons[14]?.pressed;
    const right = pad.buttons[15]?.pressed;

    // Mapeo: Botones principales
    const btnX = pad.buttons[0]?.pressed;   // X cruz
    const btnO = pad.buttons[1]?.pressed;   // O circulo
    const btnCuadrado = pad.buttons[2]?.pressed; // [] Cuadrado

    // Simula teclas de Phaser con .isDown / .isUp
    jugador.teclas.up.isDown = up;
    jugador.teclas.down.isDown = down;
    jugador.teclas.left.isDown = left;
    jugador.teclas.right.isDown = right;

    jugador.teclas.TX.isDown = btnX;
    jugador.teclas.TC.isDown = btnO;
    jugador.teclas.TZ.isDown = btnCuadrado;

    jugador.teclas.up.isUp = !up;
    jugador.teclas.down.isUp = !down;
    jugador.teclas.left.isUp = !left;
    jugador.teclas.right.isUp = !right;

    jugador.teclas.TX.isUp = !btnX;
    jugador.teclas.TC.isUp = !btnO;
    jugador.teclas.TZ.isUp = !btnCuadrado;
}
