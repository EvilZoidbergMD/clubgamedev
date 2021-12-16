import Level from "../scenes/level"

class World1Level3 extends Level {
    constructor() {
        super('world_1_level_3');

        //Map
        this.level = [
            ["X", "X", "X", "X", "X", "X", "X"],
            ["X", "X", "X", "O", "X", "X", "X"],
            ["X", "G", "O", "O", "O", "G", "X"],
            ["X", "X", "X", "G", "X", "X", "X"],
            ["X", "X", "X", "X", "X", "X", "X"]
        ]
        this.spawn_coordinates = [3, 1];
        this.next_scene = "world_1_level_4";
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
} export default World1Level3