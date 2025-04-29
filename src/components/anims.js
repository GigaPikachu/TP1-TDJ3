export function anims (scene) {
    //ataques
    scene.anims.create({
        key: "fireball",
        frames: scene.anims.generateFrameNumbers("effects", {
            frames: [3, 5]
        }),
        frameRate: 6,
        repeat: -1,
    });

    scene.anims.create({
        key: "explosion",
        frames: scene.anims.generateFrameNumbers("effects", {
            frames: [1, 2, 0, 0]
        }),
        frameRate: 6,
        repeat: 0,
    });
    
    scene.anims.create({
        key: "aspiradora",
        frames: scene.anims.generateFrameNumbers("aspiradora", {
            frames: [0, 1, 2, 3]
        }),
        frameRate: 12,
        repeat: -1,
    });

    scene.anims.create({
        key: "star",
        frames: scene.anims.generateFrameNumbers("effects", {
            frames: [12, 13, 14]
        }),
        frameRate: 10,
        repeat: 0,
    });

    scene.anims.create({
        key: "beam",
        frames: scene.anims.generateFrameNumbers("effects", {
            frames: [6, 11]
        }),
        frameRate: 24,
        repeat: -1,
    });

    //enemigos
    scene.anims.create({
        key: "bronto burt_volar",
        frames: scene.anims.generateFrameNumbers("bronto burt", {
            frames: [0, 1]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "hot headcaminar",
        frames: scene.anims.generateFrameNumbers("hot head", {
            frames: [0, 1]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "hot headprepararse",
        frames: scene.anims.generateFrameNumbers("hot head", {
            frames: [2, 3]
        }),
        frameRate: 6,
        repeat: 0,
    });
    scene.anims.create({
        key: "hot headdisparar",
        frames: scene.anims.generateFrameNumbers("hot head", {
            frames: [4, 5]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "sparky" + "spark",
        frames: scene.anims.generateFrameNumbers("sparky", {
            frames: [3, 4]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "waddle deecaminar",
        frames: scene.anims.generateFrameNumbers("waddle dee", {
            frames: [0, 1]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "waddle doocaminar",
        frames: scene.anims.generateFrameNumbers("waddle doo", {
            frames: [0, 1]
        }),
        frameRate: 6,
        repeat: -1,
    });
    scene.anims.create({
        key: "waddle doopreparar",
        frames: scene.anims.generateFrameNumbers("waddle doo", {
            frames: [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3,]
        }),
        frameRate: 12,
        repeat: 0,
    });

    //whispy_woods
    scene.anims.create({
        key: "WhispyWoods_normal",
        frames: scene.anims.generateFrameNumbers("whispy woods", {
            frames: [0, 1, 2]
        }),
        frameRate: 4,
        repeat: -1,
    });
    scene.anims.create({
        key: "WhispyWoods_hurt",
        frames: scene.anims.generateFrameNumbers("whispy woods", {
            frames: [5, 6]
        }),
        frameRate: 8,
        repeat: 0,
    });
    scene.anims.create({
        key: "WhispyWoods_atack",
        frames: scene.anims.generateFrameNumbers("whispy woods", {
            frames: [3, 4]
        }),
        frameRate: 8,
        repeat: 0,
    });
    scene.anims.create({
        key: "WhispyWoods_lose",
        frames: scene.anims.generateFrameNumbers("whispy woods", {
            frames: [7, 8]
        }),
        frameRate: 8,
        repeat: 0,
    });
    scene.anims.create({
        key: "apple",
        frames: scene.anims.generateFrameNumbers("apple", {
            frames: [0, 1, 2, 3]
        }),
        frameRate: 8,
        repeat: -1,
    });
    scene.anims.create({
        key: "appleInit",
        frames: scene.anims.generateFrameNumbers("apple", {
            frames: [0, 4]
        }),
        frameRate: 16,
        repeat: -1,
    });
}
