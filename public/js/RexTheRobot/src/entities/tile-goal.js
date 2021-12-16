class GoalTile extends Tile {

    constructor(scene, rex, x, y) {
        super(scene, rex, x, y);

        this.triggered = false;

        //Create animations
        this.scene.anims.create({
            key: 'untriggered',
            frames: this.scene.anims.generateFrameNumbers('tileset', {start: 69, end: 69}),
            frameRate: 1,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'triggered',
            frames: this.scene.anims.generateFrameNumbers('tileset', {start: 73, end: 73}),
            frameRate: 1,
            repeat: -1
        });
    }

    update() {
        if(this.triggered) {
            this.play('triggered', true);
        }
        else {
            this.play('untriggered', true);
        }
    }

    steppedOn() {
        this.triggered = true;
    }

    reset() {
        this.triggered = false;
    }

}