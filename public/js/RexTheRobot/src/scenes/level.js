class Level extends Phaser.Scene {
    constructor(name) {
        super({key: name});

        this.tile_size = 64;
        this.just_started = true;
        this.goal_tiles = [];
        this.victorious = false;
        this.victory_count = 60;
        this.next_scene = '';
    }

    preload() {
        //Rex
        this.load.spritesheet('rex_run', '../../../../res/Characters/zapper/run.png', {frameWidth: 31, frameHeight: 41});
        this.load.spritesheet('rex_wake', '../../../../res/Characters/zapper/wake.png', {frameWidth: 31, frameHeight: 41});
        this.load.spritesheet('rex_death', '../../../../res/Characters/zapper/damaged and death.png', {frameWidth: 38, frameHeight: 41});
        this.load.spritesheet('tileset', '../../../../res/Environment/tileset x2.png', {frameWidth: 64, frameHeight: 64});
    }

    create() {
        //Rex
        this.rex = new Rex(this);
        this.rex.setInitialPosition(this.spawn_coordinates[0]*this.tile_size, this.spawn_coordinates[1]*this.tile_size);
        this.rex.setDepth(1);

        //Draw temporary map of tile lines
        this.createTiles();

        //Input Panel
        this.inputpanel = new InputPanel(this, this.rex);
    }

    createTiles() {
        let { width, height } = this.sys.game.canvas;
        this.tiles = []

        for(let x = 0; x < this.level[0].length; x++) {
            for(let y = 0; y < this.level.length; y++) {
                let tile = undefined;
                if(this.level[y][x] == 'X') {
                    tile = new WallTile(this, this.rex, this.tile_size * x, this.tile_size * y);
                    this.physics.add.collider(this.rex, tile, tile.steppedOn);
                }
                else if(this.level[y][x] == 'O') {
                    tile = new Tile(this, this.rex, this.tile_size * x, this.tile_size * y);
                    this.physics.add.overlap(this.rex, tile, tile.steppedOn);
                }
                else if(this.level[y][x] == 'G') {
                    tile = new GoalTile(this, this.rex, this.tile_size * x, this.tile_size * y);
                    this.physics.add.overlap(this.rex, tile, tile.steppedOn);
                    this.goal_tiles.push(tile);
                }

                tile.setOrigin(0, 0);
                this.tiles.push(tile);
            }
        }
    }

    update() {
        this.rex.update();

        for(let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];

            this.physics.overlap(this.rex, tile, tile.steppedOn.bind(tile));
            tile.update();
        }

        if(this.victorious) {
            this.victory_count = this.victory_count - 1;

            if(this.victory_count == 0) {
                this.scene.start(this.next_scene);
            }
        }
    }

    resetGoalTiles() {
        for(let i = 0; i < this.goal_tiles.length; i++) {
            this.goal_tiles[i].reset();
        }
    }

}