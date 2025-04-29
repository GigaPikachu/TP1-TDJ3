export class aspiradora extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, player) {
        super (scene, player.x, player.y + 8, "aspiradora", 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.aspirado = false;

        if (player.direction === "derecha") { // si el jugador esta mirando a la derecha
            this.x += 24
            this.setFlipX(false);
        } else { // si el jugador esta mirando a la izquierda
            this.x -= 24
            this.setFlipX(true);
        }

        scene.physics.add.overlap(this, scene.ObjetosAbsorbibles, (aspiradora, objeto) => {
            objeto.anims.stop();
            objeto.action = false;
            objeto.PlayerCollision.destroy();
            objeto.update = () => { };
            objeto.body.setAllowGravity(false);
            objeto.PlayerCollision = scene.physics.add.overlap(player, objeto, (player, objeto) => {
                player.enemyPower = objeto.enemyPower;
                player.action = false;
                player.estado = "lleno"
                aspiradora.aspirado = false;
                objeto.destroy();
                player.attack.destroy();
                player.score += objeto.score;
            });
            aspiradora.aspirado = true;
            scene.physics.moveToObject(objeto, scene.player, 150);
        });

        this.anims.play("aspiradora", true);
    }
}
