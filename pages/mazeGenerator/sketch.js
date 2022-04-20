//Props
var columns = 100;
var rows = 50;
var cellSize = 10;
var offset = 50;

//Member vars
let canvas;
let canvasWidth;
let canvasHeight;
let maze;


function setup(){
    canvas = document.getElementById("canvas");
    canvasWidth = windowWidth * .98;
    canvasHeight = windowHeight * .94;
    resizeCanvas(canvasWidth, canvasHeight);

    maze = new Maze(columns, rows, cellSize, offset);
}

function draw(){
    maze.show();
}