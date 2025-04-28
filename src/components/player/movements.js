let velocity = 100;
import { aspiradora } from "../../entities/atacks/aspiradora.js";
import { StarAttack } from "../../entities/atacks/StarAttack.js";
import { createBeam, updateBeam } from "../../entities/atacks/beam.js";
import { spark } from "../../entities/atacks/spark.js";
import { fireball } from "../../entities/atacks/fireball.js";
import { StarPower } from "../../components/player/StarPower.js";

function Powers (scene, player){
    if ((!player.anims.isPlaying || (player.anims.isPlaying && (player.anims.currentAnim.key != "desinflarse" && player.anims.currentAnim.key != "disparar")))) { // tecla de accion
        player.body.setVelocityX(0);
        if (player.power == 0) { //absorver
            if (player.anims.currentFrame && player.anims.currentFrame.index != 14 && player.action == false){
                player.pressing[0] = true;
                player.anims.play("absorver", true);
                scene.AspiradoraInit.play()
                player.attack = new aspiradora(scene, player);
            }
            player.action = true;
        }

        else if (player.power === 1) {
            if (player.anims.currentFrame && player.anims.currentFrame.index != 14 && player.action == false && player.pressing[0] === false){
                player.pressing[0] = true;
                player.anims.stop();
                player.setFrame(25);
                player.action = true;
                player.attack = createBeam(scene, player.x, player.y, player, player.direction);
            }
        }

        else if (player.power === 2) {
            player.action = true;
            player.anims.play("spark", true);
            if (!player.attack || !player.attack.active) {
                player.attack = new spark(scene, player);
            }
        }

        else if (player.power === 3) {
            player.anims.stop();
            player.setFrame(13);
            player.body.setVelocityX(0);
            if (!player.attack || !player.attack.active) {
                player.attack = new fireball(scene, player.x, player.y + 8, player.direction, 0, player);
            }
            player.action = true;
        }
    }
}

export function Movimientos (scene, player) { //movimientos de Kirby
    if (player.teclas.TX.isUp && player.pressing[0] === true) { //soltar X
        player.pressing[0] = false;
    }

    if(player.teclas.TZ.isUp && player.pressing[1]) { //soltar Z
        player.pressing[1] = false;
    }

    if(player.teclas.down.isUp && player.pressing[2]) { //soltar abajo
        player.pressing[2] = false;
    }

    if (player.direction == "derecha") { // si el jugador esta mirando a la derecha
        player.setFlipX(false);
    } else {
        player.setFlipX(true);
    }

    if (player.estado === "volando") {
        player.velocidadX = 50
        player.velocidadY = -50

        if ((player.anims.isPlaying && player.anims.currentAnim.key != "inflarse") || !player.anims.isPlaying) {
            player.anims.play("volar", true);
        }

        if (player.teclas.TX.isDown && player.pressing[0] === false) { //si el jugador preciona la tecla de accion
            player.pressing[0] = true;
            if (player.anims.currentAnim?.key !== "desinflarse") {
                scene.Desinflar.play()
                player.anims.play("desinflarse", true);
                player.estado = "normal";
            }
        }
        else if (player.teclas.up.isDown || player.teclas.TZ.isDown) {
            player.body.setVelocityY(player.velocidadY);
        } else {
            player.body.setVelocityY(50);
            player.anims.play("volar", true);
        }
    }

    else if (player.estado === "lleno") {
        scene.AspiradoraInit.stop();
        scene.Aspiradora.stop();
        player.velocidadX = 70
        player.velocidadY = -215
        
        if (player.body.velocity.y > 0) {
            player.EnElSuelo = false;
        }

        //se pueden hacer estando o no en el suelo
        if (player.teclas.TX.isDown && player.pressing[0] === false) { //si el jugador preciona la tecla de accion
            if (player.anims.currentFrame && player.anims.currentFrame.index != 14 && player.action == false){
                player.anims.play("disparar", true);
                scene.StarAttack = new StarAttack(scene, player.x, player.y, player.direction)
            }
            player.action = true;
            player.estado = "normal";
        }

        //si el jugador esta en el aire
        else if (!player.EnElSuelo) { //si el jugador preciona la tecla Z
            if (player.anims.currentAnim?.key !== 'salto_lleno') {
                player.anims.play("salto_lleno", true);
            }
        }

        //si el jugador no esta en el suelo no se puede hacer
        else if (player.EnElSuelo) {
            if (player.teclas.TZ.isDown && player.pressing[1] === false){ //si el jugador preciona la tecla Z salta
                scene.Salto.play();
                player.pressing[1] = true;
                player.EnElSuelo = false;
                player.body.setVelocityY(player.velocidadY)
                player.anims.stop();
            }
            else if (player.teclas.down.isDown && player.pressing[2] === false) { //tragar enemigo para obtener su poder
                player.action = true;
                player.pressing[2] = true;
                player.body.setVelocityX(0);
                player.anims.stop();
            
                if (player.enemyPower === 0) {
                    console.log("tragar")
                    player.anims.play("tragar", true);
                    player.nothing = true;

                    // Esperamos a que termine la animación para cambiar el estado
                    player.once('animationcomplete-tragar', () => {
                        player.action = false;
                        player.nothing = false;
                        player.estado = "normal";
                    });
                } else {
                    scene.pause = true;
                    player.anims.play("tragar", true);
                    player.power = player.enemyPower;
                    player.once('animationcomplete-tragar', () => {
                        player.estado = "normal";
                        player.action = false;
                        Powers(scene, player); //mostrar una prueba del poder que se obtiene
                        scene.time.addEvent({
                            delay: 500,
                            callback: () => {
                                scene.pause = false;
                            },
                            callbackScope: this,
                            loop: false,
                        });
                    });
                }
            }

            else if (player.body.velocity.x != 0) { //si el jugador se mueve
                player.anims.play("caminar_lleno", true);
            }
            else if (!player.action) { //si el jugador no se mueve
                player.anims.play("caminar_lleno", true);
                player.anims.stop();
                player.setFrame(18);
                player.body.setVelocityX(0);
            }
        }
    }

    else if (player.estado === "normal") { // estado normal
        player.velocidadX = 75
        player.velocidadY = -210

        if (player.body.velocity.y > 0) {
            player.EnElSuelo = false;
        }

        //se pueden hacer estando o no en el suelo
        if (player.teclas.TC.isDown && player.power != 0){
            scene.StarPower = new StarPower (scene, player.x, player.y, player.direction, player.power)
            player.power = 0;
        }
        else if (player.action){ //actualizar y detener el ataque
            if (player.power == 1) {
                updateBeam(scene, player);
            }
            else if (player.teclas.TX.isUp) {
                if (player.power == 0) {
                    if (player.attack) {
                        if (!player.attack.aspirado){
                            scene.time.addEvent({
                                delay: 300,
                                callback: () => {
                                    player.action = false;
                                    player.attack.destroy();
                                    scene.AspiradoraInit.stop();
                                    scene.Aspiradora.stop();
                                },
                                callbackScope: this,
                                loop: false,
                            })
                        }
                    }
                }
                else if (player.power == 2) {
                    if (!player.attack.aspirado){
                        scene.time.addEvent({
                            delay: 300,
                            callback: () => {
                                player.attack.particles.destroy();
                                player.attack.destroy();
                                scene.SparkPower.stop(true);
                                player.action = false;
                            },
                            callbackScope: this,
                            loop: false,
                        })
                    }
                }
                else if (player.power == 3) {
                    if (!player.attack.aspirado){
                        Powers(scene, player)
                        scene.time.addEvent({
                            delay: 300,
                            callback: () => {
                                player.action = false;
                            },
                            callbackScope: this,
                            loop: false,
                        })
                    }
                }
            }
            else if (player.power == 0 && player.attack) {
                player.attack.y = player.y + 4;
                if (!scene.AspiradoraInit.isPlaying && !scene.Aspiradora.isPlaying){
                    scene.Aspiradora.play()
                }
            }
            else if (player.power == 2 && player.attack) {
                player.attack.y = player.y + 8;
                if (!scene.SparkPower.isPlaying){
                    scene.SparkPower.play();
                }
            }
            else if (player.power == 3) {
                Powers(scene, player)
            }
        }

        else if (player.teclas.TX.isDown && player.pressing[0] === false) { //si el jugador preciona la tecla de accion
            Powers(scene, player)
        }

        else if (player.teclas.up.isDown){ // si el jugador preciona UP comienza a volar
            if (player.anims.currentAnim?.key !== "inflarse") {
                player.anims.play("inflarse", true);
                player.estado = "volando"
            }
        }

        //si el jugador esta en el aire
        else if (!player.EnElSuelo) { //si el jugador preciona la tecla Z
            if (player.body.velocity.y < 0) { //si el jugador esta cayendo
                player.anims.stop();
                player.setFrame(7);
            } else {
                player.setFrame(11);
            }
        }

        //si el jugador no esta en el suelo no se puede hacer
        else if (player.EnElSuelo) {

            if (player.teclas.TZ.isDown && player.pressing[1] === false){ //si el jugador preciona la tecla Z salta
                scene.Salto.play();
                player.pressing[1] = true;
                player.EnElSuelo = false;
                player.body.setVelocityY(player.velocidadY)
                player.anims.stop();
            }
            else if (player.teclas.down.isDown) {
                player.estado = "agachado";
            }

            if (player.body.velocity.x != 0) { //si el jugador se mueve
                player.anims.play("caminar", true);
            }
            else { //si el jugador no se mueve
                player.anims.stop();
                player.setFrame(0);
                player.body.setVelocityX(0);
            }
        }
    }

    else if (player.estado === "agachado") {
        player.velocidadX = 0;
        player.velocidadY = 0;
        if (!player.action){
            if (player.teclas.down.isUp && !player.action) {
                player.estado = "normal";
            }
            else if (player.teclas.TX.isDown && player.pressing[0] === false){
                if (player.direction === "derecha"){
                    player.body.setVelocityX(150);
                } else {
                    player.body.setVelocityX(-150);
                }
                player.action = true;
                player.pressing[0] = true;
                player.setFrame(6)
                player.inmunity = true;
    
                scene.time.addEvent({
                    delay: 420,
                    callback: () => {
                        player.body.setVelocity(0);
                        player.inmunity = false;
                        player.action = false;
                    },
                    callbackScope: this,
                    loop: false,
                });
            }
            else {
                player.setFrame(5)
            }
        }
    }

    if (player.action == false) {
        if (player.teclas.right.isDown) {
            player.body.setVelocityX(player.velocidadX);
            player.direction = "derecha";
        }
        else if (player.teclas.left.isDown) {
            player.body.setVelocityX(-player.velocidadX);
            player.direction = "izquierda";
        } else {
            player.body.setVelocityX(0);
        }
    }
}

/*

volando:
    accion:
    moverse:

lleno:
    accion:
    moverse:
    caer:

normal:
    accion:
    moverse:
    caer:
        puede golpear

*/