import Phaser from "phaser"

class Tile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.alive = false;
        this.next_alive = false;
        this.setOrigin(0, 0);
    }

    update() {
        if(this.alive) {
            this.setTexture('alive');
        }
        else {
            this.setTexture('dead');
        }
    }
} export default Tile