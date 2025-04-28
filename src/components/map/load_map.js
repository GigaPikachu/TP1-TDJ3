export function load_map(scene, map, tileset, ConjuntoDePatrones, capa) {

    scene.map = scene.make.tilemap({ key: map })
    scene.tileset = scene.map.addTilesetImage( ConjuntoDePatrones, tileset )
    scene.fondo = scene.map.createLayer( capa, scene.tileset )

    //coliciones
    scene.fondo.setCollisionByProperty({ colision: true })
}