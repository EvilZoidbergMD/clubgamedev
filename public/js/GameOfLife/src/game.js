var config = {
    type: Phaser.AUTO,
    width: 800, //Width of the game window in pixels
    height: 640, //Height of the game window in pixels
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var x_size = 100;
var y_size = 80;
var tile_size = 32;

var tiles = [];

var playing = false;
var timer_amount = 20;
var timer = 0;

var button = undefined;
var button_text = undefined;
var button_x_max = 0;
var button_x_min = 0;
var button_y_max = 0;
var button_y_min = 0;

//Load Images that you want to use here
function preload () {
    this.load.image('alive', require('../../../../res/alive.png'));
    this.load.image('dead', require('../../../../res/dead.png'));
}

//Create the objects in your game here
function create () {
    //Create tiles
    for(let x = 0; x < x_size; x++) {
        tiles.push([]);
        for(let y = 0; y < y_size; y++) {
            let tile = this.add.existing(new Tile(this, x * tile_size, y * tile_size));
            tiles[x].push(tile);
        }
    }

    button = this.add.rectangle(700, 600, 120, 40, 0x666666);
    button_text = this.add.text(700, 600, 'Start', { color: '#ffffff' });
    button_text.setOrigin(0.5, 0.5);
    button.setDepth(1);
    button_text.setDepth(2);

    button_x_min = 700 - 60;
    button_x_max = 700 + 60;
    button_y_min = 600 - 20;
    button_y_max = 600 + 20;

    this.input.on('pointerdown', function (pointer) {
        if(pointer.x < button_x_max && pointer.x > button_x_min && pointer.y < button_y_max && pointer.y > button_y_min) {
            if(playing) {
                playing = false;
                button_text.setText('Start');
            }
            else {
                playing = true;
                button_text.setText('Stop');
            }
        }
        else {
            if(!playing) {
                let tile_x = Math.floor(pointer.x / tile_size);
                let tile_y = Math.floor(pointer.y / tile_size);

                if(tiles[tile_x][tile_y].alive) {
                    tiles[tile_x][tile_y].next_alive = false;
                }
                else {
                    tiles[tile_x][tile_y].next_alive = true;
                }
            }
        }
    }, this);
}

//Everything that changes during the game goes here
function update () {
    if(playing) {
        if(timer < timer_amount) {
            timer++;
        }
        else {
            for(let x = 0; x < x_size; x++) {
                for(let y = 0; y < y_size; y++) {
                    let first_total = checkLeft(x, y) + checkRight(x, y) + checkUp(x, y) + checkDown(x, y);
                    let second_total = checkDownRight(x, y) + checkDownLeft(x, y) + checkUpRight(x, y) + checkUpLeft(x, y);
                    let total = first_total + second_total;

                    if(tiles[x][y].alive) {
                        if(total < 2 || total > 3) {
                            tiles[x][y].next_alive = false;
                        }
                        else {
                            tiles[x][y].next_alive = true;
                        }
                    }
                    else {
                        if(total == 3) {
                            tiles[x][y].next_alive = true;
                        }
                        else {
                            tiles[x][y].next_alive = false;
                        }
                    }
                }
            }
        }
    }
    for(let x = 0; x < x_size; x++) {
        for(let y = 0; y < y_size; y++) {
            tiles[x][y].alive = tiles[x][y].next_alive;
            tiles[x][y].update();
        }
    }
}

function checkLeft(x, y) {
    if(x > 0) {
        if(tiles[x-1][y].alive){
            return 1;
        }
    }
    return 0;
}

function checkRight(x, y) {
    if(x < x_size - 1) {
        if(tiles[x+1][y].alive){
            return 1;
        }
    }
    return 0;
}

function checkUp(x, y) {
    if(y > 0) {
        if(tiles[x][y-1].alive){
            return 1;
        }
    }
    return 0;
}

function checkDown(x, y) {
    if(y < y_size - 1) {
        if(tiles[x][y+1].alive){
            return 1;
        }
    }
    return 0;
}

function checkDownRight(x, y) {
    if(x < x_size - 1 && y < y_size - 1) {
        if(tiles[x+1][y+1].alive){
            return 1;
        }
    }
    return 0;
}

function checkDownLeft(x, y) {
    if(x > 0 && y < y_size - 1) {
        if(tiles[x-1][y+1].alive){
            return 1;
        }
    }
    return 0;
}

function checkUpRight(x, y) {
    if(x < x_size - 1 && y > 0) {
        if(tiles[x+1][y-1].alive){
            return 1;
        }
    }
    return 0;
}

function checkUpLeft(x, y) {
    if(x > 0 && y > 0) {
        if(tiles[x-1][y-1].alive){
            return 1;
        }
    }
    return 0;
}

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
