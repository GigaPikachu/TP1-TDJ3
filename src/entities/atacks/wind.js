export class wind extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 10 * 16, 20 * 16, "effects", 0);
        this.contador = 0;
        this.setFrame(8);
        this.setFlipX(true);

        scene.Desinflar.play();

        // físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.Enemigos.add(this);
        scene.ObjetosAbsorbibles.add(this);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setAllowGravity(false);

        this.body.setVelocityX(-215);
        this.body.setAccelerationX(165);
        this.body.setVelocityY(31);
        this.body.setAccelerationY(-50);

        this.PlayerCollision = scene.physics.add.collider(this, scene.player, (objeto, player) => {
        });

        scene.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (body.gameObject === this && (left || right)) {
                this.destroy();
            }
        });

        this.timer = scene.time.addEvent({ // se demora 1200 milisegundos en parar
            delay: 800,
            callback: () => {
                if (this.active){
                    this.body.setVelocityX(0);
                    this.body.setAccelerationX(-165 * 2);
                    this.body.setVelocityY(0);
                    this.body.setAccelerationY(50 * 2);
                }
            },
            callbackScope: this,
            loop: false,
        });
    }
}