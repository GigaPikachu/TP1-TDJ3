export class spark extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, invocador) {
        super(scene, invocador.x, invocador.y, "effects", 0);

        this.setScale(3);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (invocador === scene.player) {
            scene.AtaquePlayer.add(this);
        } else {
            scene.AtaqueEnemigo.add(this);
        }
        
        this.body.setAllowGravity(false);
        this.setVisible(false);

        this.particles = scene.add.particles(0, 0, "effects", { 
            frame: 4, // 🔹 Usa el frame número 3 del spritesheet
            x: this.x,
            y: this.y,
            speed: { start: 200, end: 0, ease: "Cubic.easeInOut" },
            lifespan: 125,
            quantity: 1,
            frequency: 100,
            follow: this,
        });
    }
}