import Phaser from "phaser"

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

//Load Images that you want to use here
function preload () {

}

//Create the objects in your game here
function create () {
    //Create a rectangle on the screen that is 100 pixels from the left of the screen,
    //200 pixels from the top of the screen, 50 pixels wide, and 20 pixels tall.
    this.add.rectangle(100, 200, 50, 20, 0x6666ff);
}

//Everything that changes during the game goes here
function update () {

}