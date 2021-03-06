//Make these into fields that the User can eddit
//Add User interaction where user clicks to walk the maze
//Props
var columns = 100;
var rows = 50;
var cellSize = 30;
var offset = 0;
var steps = 100;
var mode = "async" // 1) async 2) pre
//add props for colors!

//Member vars
let canvas;
let canvasWidth;
let canvasHeight;
let maze;
var traveled;
var asyncPimRunning = true;


function setup(){
    canvas = document.getElementById("canvas");
    canvasWidth = windowWidth * .5;
    canvasHeight = windowHeight * .94;
    resizeCanvas(canvasWidth, canvasHeight);

    rows = floor((canvasHeight - offset)/(cellSize));
    columns = floor((canvasWidth - offset)/(cellSize));
    
    maze = new Maze(columns, rows, cellSize, offset, steps, mode);
    traveled = maze.asyncStartPim();
}

function draw(){
    maze.update();
}

function mousePressed(){
    maze.getUserInput();
}