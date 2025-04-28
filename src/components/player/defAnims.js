const framerate = 8;

export function defAnims (scene, sprite) {
    scene.anims.create({
        key: "caminar",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [1, 2, 3, 2]
        }),
        frameRate: framerate,
        repeat: 0,
    });
    scene.anims.create({
        key: "girar",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [10, 9, 8]
        }),
        frameRate: framerate,
        repeat: 0,
    });
    scene.anims.create({
        key: "caminar_lleno",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [19, 20, 21, 20]
        }),
        frameRate: framerate,
        repeat: 0,
    });
    scene.anims.create({
        key: "salto_lleno",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [20, 19]
        }),
        frameRate: framerate / 2,
        repeat: 0,
    });

    scene.anims.create({
        key: "absorver",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [12, 13, 14]
        }),
        frameRate: framerate * 1,
        repeat: 0,
    });
    scene.anims.create({
        key: "disparar",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [14, 13, 12, 0]
        }),
        frameRate: framerate * 2,
        repeat: 0,
    });
    scene.anims.create({
        key: "tragar",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [22, 24, 5, 0]
        }),
        frameRate: framerate,
        repeat: 0,
    });

    scene.anims.create({
        key: "spark",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [27, 28]
        }),
        frameRate: framerate,
        repeat: -1,
    });

    scene.anims.create({
        key: "inflarse",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [12, 13, 14, 15]
        }),
        frameRate: framerate * 2,
        repeat: 0,
    });
    scene.anims.create({
        key: "volar",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [15, 16, 15, 17]
        }),
        frameRate: framerate / 2,
        repeat: -1,
    });
    scene.anims.create({
        key: "desinflarse",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [15, 13, 12]
        }),
        frameRate: framerate,
        repeat: 0,
    });

    scene.anims.create({
        key: "herido_fuego",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [31, 32, 12]
        }),
        frameRate: framerate,
        repeat: -1,
    });
    scene.anims.create({
        key: "herido_electrico",
        frames: scene.anims.generateFrameNumbers(sprite, {
            frames: [29, 30]
        }),
        frameRate: framerate,
        repeat: -1,
    });
}