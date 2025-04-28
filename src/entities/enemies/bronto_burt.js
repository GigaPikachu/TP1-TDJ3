export class bronto_burt extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipe_movement) {
        super(scene, x * 16, y * 16, "bronto burt", 0);
        this.enemyPower = 0
        this.score = 400;

        // físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        scene.ObjetosAbsorbibles.add(this);
        scene.Enemigos.add(this);

        if (scene.player.x > this.x) { //el enemigo mira a la derecha
            this.setFlipX(true);
            this.velocidad = -75;
        }
        else {
            this.setFlipX(false);
            this.velocidad = 75;
        }

        this.tipe_movement = tipe_movement;

        if (this.tipe_movement === 1) {
            this.amplitud = 32;
            this.frecuencia = 0.05; // puedes ajustar esto
            this.fase = 0;
            this.tiempoInicial = scene.time.now;
            this.yBase = this.y; // guarda la y inicial como base
        } else {
            this.body.setAllowGravity(false);
            this.body.setVelocityX(-this.velocidad);
            this.body.setVelocityY(-75);
        }

        // colisión con el jugador
        this.PlayerCollision = scene.physics.add.collider(this, scene.player, (enemy, player) => {
        });

        scene.physics.add.overlap(this, scene.AtaquePlayer, (enemy, ataque) => {
            enemy.anims.stop();
            scene.Enemigos.remove(enemy, false, false);
            enemy.body.setVelocityX(0);
            enemy.body.setVelocityY(0);
            enemy.update = () => { };
            enemy.body.setAllowGravity(false);
            enemy.anims.play("star", true);
            enemy.once('animationcomplete', (anim) => {
                if (anim.key === "star") {
                    enemy.destroy();
                }
            });
        });

        // animación
        this.anims.play("bronto burt_volar", true);
    }

    update(time, delta) {
        if (this.tipe_movement === 1) {
            const t = (time - this.tiempoInicial) / 1000;

            // Movimiento horizontal (va hacia la izquierda)
            this.x -= this.velocidad * (delta / 1000);

            // Movimiento vertical senoidal
            this.y = this.yBase + this.amplitud * Math.sin(this.frecuencia * this.x + this.fase);
        }

        if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) > 128) {
            this.destroy();
        }
    }
}