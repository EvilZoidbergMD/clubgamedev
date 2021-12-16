var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: '#1c1c1c',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0},
            debug: false
        }
    },
    scene: [ World1Level1, World1Level2, World1Level3 ],
    parent: divId,
    dom: {
        createContainer: true
    }
};

var game = new Phaser.Game(config);