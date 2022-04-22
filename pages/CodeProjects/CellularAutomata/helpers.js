class Helper{
    constructor(p){
        //Dependencies
        this.p = p;

        //Props
        this.boardWidth = 300; //In cells
        this.boardHeight = 150;
        this.cellSize = 5;
        this.offset = 50;
        this.fr = 10;
        this.canvasWidth = 600;
        this.canvasHeight = 600;

        //Member vars
        this.board;
        this.startStop;
        this.clearButton;
        this.randomizeButton;
        this.homeButton;
        this.isPlaying = true;
        this.song;
        this.canvas;
    }

    SetupFunction(){
        this.p.createCanvas(this.canvasWidth, this.canvasHeight);
        //frameRate(fr);
        this.boardWidth = this.p.floor(this.canvasWidth / this.cellSize);
        this.boardHeight = this.p.floor(this.canvasHeight / this.cellSize);
        this.board = new Grid(this.p, this.boardWidth, this.boardHeight, this.cellSize, this.offset);
        this.board.randomizeBoard();
        //this.CreateButtons();
    }


    DrawFunction(isPlaying){
        //console.log("isPlaying = " + this.isPlaying);
        if(isPlaying) this.board.Update();
        this.board.Show();
    }

    mousePressed(){
        this.board.UserInput();
    }
    
    ClearBoard(){
        this.board.Clear();
    }
    
    RandomizeBoard (){
        this.board.randomizeBoard();
    }

    /*TogleGameState(){
        this.states.GetPlay() = !this.states.GetPlay();
        console.log("isPlaying = " + this.states.GetPlay());
        return this.GetPlay();
    }
    
    
    
    
    CreateButtons() {
        console.log("HI");
        this.startStop = this.p.createButton("Start/Stop");
        this.startStop.position(10, 30);
        this.startStop.mousePressed(this.test);
    
        this.clearButton = this.p.createButton("Clear Board");
        this.clearButton.position(100, 30);
        this.clearButton.mousePressed(this.ClearBoard);
    
        this.randomizeButton = this.p.createButton("Randomize Board");
        this.randomizeButton.position(200, 30);
        this.randomizeButton.mousePressed(this.RandomizeBoard);
    }*/
}