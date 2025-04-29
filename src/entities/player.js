import { 
    setTeclas,
    configurarDeteccionGamepad,
    actualizarTeclasDesdeGamepad
} from "../components/player/setTeclas.js";
import { Movimientos } from "../components/player/movements.js";
import { defAnims } from "../components/player/defAnims.js";
import { StarPower } from "../components/player/StarPower.js";

export class player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, frame, vida) {
        super(scene, x * 16, y * 16, "kirby", frame);

        //estadisticas
        this.Lives = []
        this.Lives[0] = vida[0];
        this.Lives[1] = vida[1];

        this.score = scene.score || 1;

        this.direction = "derecha"; // derecha, izquierda
        this.estado = "normal"
        this.power = scene.power || 0; // 0 = nada, 1 = beam, 2 = spark, 3 = fireball
        this.enemyPower = 0; // 0 = nada, 1 = beam, 2 = spark, 3 = fireball
        this.nothing = false;
        this.EnElSuelo = false;

        this.inmunity = false;
        this.hit = false;

        this.action = false;
        this.pressing = [false, false, false];

        //teclas
        setTeclas(this, scene);
        configurarDeteccionGamepad(this);

        //fisicas
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        scene.physics.add.collider(this, scene.fondo, (player, fondo) => {
            if (player.body.blocked.down && !player.hit) {
                player.EnElSuelo = true;
            }
        });

        scene.physics.add.overlap(this, scene.Enemigos, (player, objeto) => {
            if ((this.power === 0 && player.action === false) || this.power != 0) {
                if (player.inmunity === false) {
                    player.hit = true;
                    scene.time.addEvent({
                        delay: 500,
                        callback: () => {
                            player.hit = false;
                        },
                        callbackScope: player,
                        loop: false,
                    });
    
                    player.setVelocityY(0);
                    if (player.x > objeto.x) { //el jugador es empujado por el golpe
                        player.setVelocityX(100);
                    } else {
                        player.setVelocityX(-100);
                    }
    
                    player.anims.play("girar", true);
                    if (player.power != 0) {
                        scene.PowerStar = new StarPower(scene, player.x, player.y, player.direction, player.power);
                        player.power = 0;
                        player.enemyPower = 0;
                    }
    
                    player.inmunity = true;
                    scene.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            player.inmunity = false;
                        },
                        callbackScope: player,
                        loop: false,
                    });
    
                    scene.Daño.play()
                    player.Lives[0] -= 1;
                }
                objeto.destroy();
            }
            if (player.inmunity && player.estado === "agachado") {
                objeto.destroy();
            }
            player.score += objeto.score * 2;
        });

        scene.physics.add.overlap(this, scene.AtaqueEnemigo, (player, objeto) => {
            if ((this.power === 0 && player.action === false) || this.power != 0) {
                if (player.inmunity === false) {
                    player.hit = true;
                    scene.time.addEvent({
                        delay: 500,
                        callback: () => {
                            player.hit = false;
                        },
                        callbackScope: player,
                        loop: false,
                    });
    
                    player.setVelocityY(0);
                    if (player.x > objeto.x) { //el jugador es empujado por el golpe
                        player.setVelocityX(100);
                    } else {
                        player.setVelocityX(-100);
                    }
    
                    player.anims.play("girar", true);
                    if (player.power != 0) {
                        scene.PowerStar = new StarPower(scene, player.x, player.y, player.direction, player.power);
                        player.power = 0;
                        player.enemyPower = 0;
                    }
    
                    player.inmunity = true;
                    scene.time.addEvent({
                        delay: 3000,
                        callback: () => {
                            player.inmunity = false;
                        },
                        callbackScope: player,
                        loop: false,
                    });
    
                    scene.Daño.play()
                    player.Lives[0] -= 1;
                }
            }
        });

        this.body.setSize(16, 16);
        this.body.setOffset(8, 16);

        //animaciones
        defAnims(scene, "kirby");
    }

    update () {
        actualizarTeclasDesdeGamepad(this);

        if (this.hit === false){
            Movimientos(this.scene, this);
        }

        if (this.Lives[0] === 0) {
            location.reload();
        }
    }
}
