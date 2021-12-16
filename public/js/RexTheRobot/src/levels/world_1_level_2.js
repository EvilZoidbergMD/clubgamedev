class World1Level2 extends Level {
    constructor() {
        super('world_1_level_2');

        //Map
        this.level = [
            ["X", "X", "X", "X", "X", "X", "X"],
            ["X", "O", "X", "G", "O", "O", "X"],
            ["X", "O", "X", "O", "X", "O", "X"],
            ["X", "O", "O", "O", "X", "G", "X"],
            ["X", "X", "X", "X", "X", "X", "X"]
        ]
        this.spawn_coordinates = [1, 1];
        this.next_scene = "world_1_level_3";
    }

    update() {
        super.update();

        let victory = true;
        for(let i = 0; i < this.goal_tiles.length; i++) {
            let tile = this.goal_tiles[i];
            if(!tile.triggered) {
                victory = false;
            }
        }

        if(victory) {
            this.rex.victory();
            this.victorious = true;
        }
    }
}