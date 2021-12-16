var config = {
    type: Phaser.AUTO,
    width: 800, //Width of the game window in pixels
    height: 600, //Height of the game window in pixels
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var x_offset = 1000;
var y_offset = 1000;
var x_size = 1000;
var y_size = 1000;
var tile_size = 32;

//Load Images that you want to use here
function preload () {

}

//Create the objects in your game here
function create () {
    //Draw the lines of the grid
    for(let x = 0; x < 1000; x++) {
        this.add.rectangle(x * tile_size, 0, 3, y_size * tile_size, 0x6666ff);
    }

    var tiles = [[]];

    this.camera.x += x_offset;
    this.camera.y += y_offset;
}

//Everything that changes during the game goes here
function update () {

}