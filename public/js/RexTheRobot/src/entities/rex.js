class Rex extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x=0, y=0) {
        super(scene, x, y);

        this.initial_x = x;
        this.initial_y = y;
        this.offset_x = 34;
        this.offset_y = 6;
        this.scene = scene;
        this.setScale(2);
        this.instructions = '';
        this.active_instruction = 0;
        this.done_with_instruction = false;
        this.playing = false;
        this.dest_x = -1000;
        this.dest_y = -1000;
        this.dest_set = false;
        this.walk_velocity = 125;
        this.just_started = true;
        this.victorious = false;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //Set collider
        this.body.setSize(11, 21);
        this.body.setOffset(10, 20)

        //Make sure the player stays inside the screen and can't leave it
        this.body.collideWorldBounds = true;

        //Create animations
        this.scene.anims.create({
            key: 'sleep',
            frames: this.scene.anims.generateFrameNumbers('rex_wake', {start: 0, end: 0}),
            frameRate: 4,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'wake',
            frames: this.scene.anims.generateFrameNumbers('rex_wake', {start: 0, end: 5}),
            frameRate: 4,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('rex_run', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'death',
            frames: this.scene.anims.generateFrameNumbers('rex_death', {start: 0, end: 7}),
            frameRate: 15,
            repeat: 0
        });

        //Add text message
        this.display_text = this.scene.add.text(20, 20, '');
        this.display_text.setDepth(100);
    }

    update() {
        //Set initial animation
        if(this.just_started) {
            this.play("sleep", true);
            this.just_started = false;
        }

        //Increment active instruction if done with previous one
        if(this.done_with_instruction) {
            this.active_instruction += 1;
            this.done_with_instruction = false;
        }

        //Handle current instruction
        if(this.playing) {
            let chars = this.instructions[this.active_instruction].split('');
            if(chars[0] == '#' || this.instructions[this.active_instruction] == '') {
                //Ignore comments
                this.done_with_instruction = true;
            }
            else if(this.active_instruction == 0 && this.instructions[this.active_instruction] != 'wake') {
                let error_message = 'Error (Line ' + this.active_instruction + '): Must begin program with "wake" command';
                this.display_text.setText(error_message);

                this.die();
            }
            else if(this.instructions[this.active_instruction] == 'wake') {
                this.wakeUp();
            }
            else if(this.instructions[this.active_instruction] == 'walk down') {
                this.walkDown();
            }
            else if(this.instructions[this.active_instruction] == 'walk up') {
                this.walkUp();
            }
            else if(this.instructions[this.active_instruction] == 'walk right') {
                this.walkRight();
            }
            else if(this.instructions[this.active_instruction] == 'walk left') {
                this.walkLeft();
            }
            else if(this.instructions[this.active_instruction] == 'sleep') {
                this.goToSleep();
            }
            else if(this.instructions[this.active_instruction] == 'die') {
                this.die();
            }
            else if(this.instructions[this.active_instruction] == undefined) {
                let error_message = 'Error (Line ' + this.active_instruction + '): Must end program with "sleep" command';
                this.display_text.setText(error_message);

                this.die();
            }
            else {
                let error_message = 'Error (Line ' + this.active_instruction + '): "' + this.instructions[this.active_instruction] + '" is not a recognized command.';
                this.display_text.setText(error_message);

                this.die();
            }
        }
        else {
            if(this.victorious) {
                this.display_text.setText('Victory!');
            }
            else if(this.display_text.text == 'Running...') {
                this.display_text.setText('');
            }
        }
    }

    //Convert coordinates from tile coordinates to have rex in the middle of the tile
    setInitialPosition(x, y) {
        this.x = x + this.offset_x;
        this.y = y + this.offset_y;
        this.initial_x = this.x;
        this.initial_y = this.y;
    }

    giveInstructions(instructions) {
        this.x = this.initial_x;
        this.y = this.initial_y;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.scene.resetGoalTiles();
        this.instructions = this.compile(instructions);
        this.active_instruction = 0;
        this.playing = true;
        this.display_text.setText('Running...');
    }

    walkRight() {
        //Set destination if not set yet
        if(!this.dest_set) {
            this.dest_x = this.x + this.scene.tile_size;
            this.dest_y = this.y;
            this.dest_set = true;
        }

        //If destination is reached, next instruction
        if(this.dest_set && this.x >= this.dest_x) {
            this.body.reset(this.dest_x, this.dest_y);
            this.done_with_instruction = true;
            this.dest_set = false;
            this.dest_x = -1000;
            this.dest_y = -1000;
            this.body.stop()
        }

        //Walk toward the bottom of the screen
        if(!this.done_with_instruction) {
            this.flipX = false;
            this.play('walk', true);
            this.body.setVelocityX(this.walk_velocity);
        }
    }

    walkLeft() {
        //Set destination if not set yet
        if(!this.dest_set) {
            this.dest_x = this.x - this.scene.tile_size;
            this.dest_y = this.y;
            this.dest_set = true;
        }

        //If destination is reached, next instruction
        if(this.dest_set && this.x <= this.dest_x) {
            this.body.reset(this.dest_x, this.dest_y);
            this.done_with_instruction = true;
            this.dest_set = false;
            this.dest_x = -1000;
            this.dest_y = -1000;
            this.body.stop();
        }

        //Walk toward the bottom of the screen
        if(!this.done_with_instruction) {
            this.flipX = true;
            this.play('walk', true);
            this.body.setVelocityX(-1*this.walk_velocity);
        }
    }

    walkUp() {
        //Set destination if not set yet
        if(!this.dest_set) {
            this.dest_x = this.x;
            this.dest_y = this.y - this.scene.tile_size;
            this.dest_set = true;
        }

        //If destination is reached, next instruction
        if(this.dest_set && this.y <= this.dest_y) {
            this.body.reset(this.dest_x, this.dest_y);
            this.done_with_instruction = true;
            this.dest_set = false;
            this.dest_x = -1000;
            this.dest_y = -1000;
            this.body.stop();
        }

        //Walk toward the bottom of the screen
        if(!this.done_with_instruction) {
            this.play('walk', true);
            this.body.setVelocityY(-1*this.walk_velocity);
        }
    }

    walkDown() {
        //Set destination if not set yet
        if(!this.dest_set) {
            this.dest_x = this.x;
            this.dest_y = this.y + this.scene.tile_size;
            this.dest_set = true;
        }

        //If destination is reached, next instruction
        if(this.dest_set && this.y >= this.dest_y) {
            this.body.reset(this.dest_x, this.dest_y);
            this.done_with_instruction = true;
            this.dest_set = false;
            this.dest_x = -1000;
            this.dest_y = -1000;
            this.body.stop();
        }

        //Walk toward the bottom of the screen
        if(!this.done_with_instruction) {
            this.play('walk', true);
            this.body.setVelocityY(this.walk_velocity);
        }
    }

    wakeUp() {
        //If the animation is done, ready for next instruction
        if(!this.anims.isPlaying) {
            this.done_with_instruction = true;
        }

        //Wake up
        if(!this.done_with_instruction) {
            this.play('wake', true);
        }
    }

    goToSleep() {
        //If the animation is done, ready for next instruction
        if(!this.anims.isPlaying) {
            this.done_with_instruction = true;
            this.playing = false;
        }

        //Wake up
        if(!this.done_with_instruction) {
            this.playReverse('wake', true);
        }
    }

    die() {
        //If the animation is done, ready for next instruction
        if(!this.anims.isPlaying) {
            this.done_with_instruction = true;
            this.playing = false;
        }

        //Wake up
        if(!this.done_with_instruction) {
            this.play('death', true);
        }
    }

    victory() {
        this.victorious = true;
    }

    compile(instructions) {
        let lines = instructions.split('\n');
        let result = [];

        for(let i = 0; i < lines.length; i++) {
            let words = lines[i].split(' ');
            if(words[0] == 'walk' && words.length == 3) {
                for(let c = 0; c < parseInt(words[2], 10); c++) {
                    result.push('walk ' + words[1]);
                }
            }
            else {
                result.push(lines[i]);
            }
        }

        return result;
    }

} export default Rex