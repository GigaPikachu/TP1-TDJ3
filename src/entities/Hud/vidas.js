export class vidas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x * 8, (y * 8) + 172, sprite, 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setOrigin(0, 0);

        //animaciones
        scene.anims.create({
            key: "animVidas",
            frames: scene.anims.generateFrameNumbers(sprite, {
                frames: [0, 1]
            }),
            frameRate: 6,
            repeat: -1,
        });
        this.play("animVidas");
    }
}