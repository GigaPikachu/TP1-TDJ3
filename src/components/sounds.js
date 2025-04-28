export function preloadSounds (scene) {
    scene.load.audio("Green Fields", "../../public/music/Green Fields.mp3");
    scene.load.audio("Boss!", "../../public/music/Boss!.mp3");
    scene.load.audio("Fanfare", "../../public/music/Fanfare.mp3");

    scene.load.audio("Salto", "../../public/sounds/salto.flac");
    scene.load.audio("Desinflar", "../../public/sounds/desinflar.flac");
    scene.load.audio("Daño", "../../public/sounds/daño.flac");

    scene.load.audio("AspiradoraInit", "../../public/sounds/aspiradora_init.flac");
    scene.load.audio("Aspiradora", "../../public/sounds/aspiradora.flac");
    scene.load.audio("Disparar", "../../public/sounds/disparar.flac");
    scene.load.audio("BeamPower", "../../public/sounds/BeamPower.flac");
    scene.load.audio("SparkPower", "../../public/sounds/SparkPower.flac");
    scene.load.audio("FirePower", "../../public/sounds/FirePower.flac");
}

export function sounds (scene) {
    scene.GreenFields = scene.sound.add('Green Fields', {
        loop: true, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.Boss = scene.sound.add('Boss!', {
        loop: true, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.Fanfare = scene.sound.add('Fanfare', {
        loop: false, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });

    scene.Salto = scene.sound.add('Salto', {
        loop: false, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.Desinflar = scene.sound.add('Desinflar', {
        loop: false, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.Daño = scene.sound.add('Daño', {
        loop: false, // La música se repite en bucle
        volume: 2, // Nivel de volumen (0 a 1)
    });

    scene.Aspiradora = scene.sound.add('Aspiradora', {
        loop: true, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.AspiradoraInit = scene.sound.add('AspiradoraInit', {
        loop: false, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.Disparar = scene.sound.add('Disparar', {
        loop: false, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.BeamPower = scene.sound.add('BeamPower', {
        loop: true, // La música se repite en bucle
        volume: 1, // Nivel de volumen (0 a 1)
    });
    scene.SparkPower = scene.sound.add('SparkPower', {
        loop: true, // La música se repite en bucle
        volume: 2, // Nivel de volumen (0 a 1)
    });
    scene.FirePower = scene.sound.add('FirePower', {
        loop: false, // La música se repite en bucle
        volume: 2, // Nivel de volumen (0 a 1)
    });
}