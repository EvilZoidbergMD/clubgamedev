import Tile from "../entities/tile"

class WallTile extends Tile {

    constructor(scene, rex, x, y) {
        super(scene, rex, x, y);

        //Create animations
        this.scene.anims.create({
            key: 'wall',
            frames: this.scene.anims.generateFrameNumbers('tileset', {start: 5, end: 5}),
            frameRate: 1,
            repeat: -1
        });
    }

    update() {
        this.play('wall', true);
    }

    steppedOn() {
        
    }

} export default WallTile