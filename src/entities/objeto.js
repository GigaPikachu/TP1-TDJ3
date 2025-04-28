export class objeto extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x * 16, y * 16, sprite, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.ObjetosAbsorbibles.add(this);

        this.enemyPower = 0;

        this.PlayerCollision = scene.physics.add.collider(this, scene.player);
        this.GroundCollision = scene.physics.add.collider(this, scene.fondo);
    }
}