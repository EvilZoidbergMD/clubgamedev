class InputPanel {

    constructor(scene, rex, x=825, y=200) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        var actor = rex;

        //Instruction Panel
        this.scene.panel_dif = this.scene.add.dom(825, 200).createFromHTML('<div name="panelDiv"><textarea id="panel" rows="20" cols="30">#commands:\n#wake: always start with wake\n#walk: right, left, up, or down\n#sleep: always end with sleep\n#Any line starting with the sign\n#these lines start with is a\n#comment and will be ignored\n#\n#Use these to get to the goal!\n\nwake\nwalk down\nsleep</textarea><button type="button" name="run">Run!</button></div>');
        this.scene.button = this.scene.panel_dif.getChildByName('run');

        //Add listener for when Run is clicked
        this.onClick = function(event) {
            let textArea = document.getElementById("panel");
            actor.giveInstructions(textArea.value);
        };
        this.scene.button.onclick = this.onClick;
    }

} export default InputPanel