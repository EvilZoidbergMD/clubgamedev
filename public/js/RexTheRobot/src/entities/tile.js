class Tile extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, rex, x, y) {
        super(scene, x, y);
        this.rex = rex;

        this.scene.add.existing(this);

        //Create animations
        this.scene.anims.create({
            key: 'tile',
            frames: this.scene.anims.generateFrameNumbers('tileset', {start: 71, end: 71}),
            frameRate: 1,
            repeat: -1
        });

        this.scene.physics.add.existing(this, true);

        this.body.setSize(64, 64);
        this.body.setOffset(16, 16);
    }

    update() {
        this.play('tile', true);
    }

    steppedOn() {
        
    }

} export default Tile