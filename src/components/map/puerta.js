export class puerta extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x * 16 + 8, y * 16, "puerta", 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        scene.physics.add.overlap(this, scene.player, (puerta, player) => {
            scene.scene.start("BoosMap", { vidas: scene.player.Lives, power: scene.player.power, score: scene.player.score })
            scene.GreenFields.stop();
        });
    }
}