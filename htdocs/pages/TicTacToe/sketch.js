//Props
var fr = 60;
var canvasHeight = 500;
var canvasWidth = 500;
var offset = 100;
var cellWidth = 50;
var cellHeight = 50;
var numHorCells = 3;
var numVertCells = 3;
var gameState = "human turn"; //1) human vs human; 2) human turn; 3) ai turn-random or minimax
var aiMode = "minimax";
var debug = true;

//Member Vars
let grid;
var player = "X";
var gameOver = false;
var gameStateString = "GAME IN PROGRESS";
let restartButton;
let ai;
let gameMode;
let resseting = false;
let aiStartButton;



function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
    restartButton = createButton("RESET");
    restartButton.mousePressed(restart);
    restartButton.position(10,300);
    
    aiStartButton = createButton("AI Start");
    aiStartButton.mousePressed(AiStart);
    aiStartButton.position(100,300);


    grid = new Grid(numHorCells, numVertCells, cellWidth, cellHeight, offset, offset);
    ai = new AI("O", grid, false);
    gameMode = gameState;
}

function draw() {
  // put drawing code here
  clear();
  //translate(windowWidth/2, windowHeight/2);
  for(i=0; i<3; i++){
    for(j=0; j < 3; j++){
      grid.board[i][j].show();
    }
  }
  stroke(0);
  fill(0);
  textAlign(CENTER, CENTER);
  text(gameStateString, offset + cellWidth, offset - cellHeight);
}


/*
 This is the Gameplay loop. Other loops such as the draw loop 
 only handle displaying the current game state. Thus we need only
 worry about the state of the game in this loop in terms of AI 
 and who should play... Nvm, we need some in the draw loop...
*/
function mousePressed(){
  if(!gameOver && !resseting){
    switch(gameState){
      case "human vs human":
        placePiece();
        checkForGameOver();
        break;
      case "human turn":
        var out = placePiece();
        if(out) {gameState = "ai turn-" + aiMode;}
        checkForGameOver();
        aiTurn();
        break;
    }
  }else{
    resseting = false;
  }
}

function aiTurn(){
  var aiMadeMove = false;

  //Random move
  if(gameState == "ai turn-random" && !gameOver){
    var aiMove = ai.randomMove(grid.board);
    if(debug){
      console.log("After " + ai.cycles + ", AI chooses x = " + aiMove.x + ", y = " + aiMove.y + ", as its next play.");
      ai.cycles = 0;
    }
    grid.board[aiMove.x][aiMove.y].directPlace(player);
    aiMadeMove = true;
  }

  //Minimax move
  else if(gameState == "ai turn-minimax" && !gameOver){
    var aiMove = ai.minimax(true, 0)[0];
    if(debug){
      console.log("After " + ai.cycles + ", AI chooses x = " + aiMove.x + ", y = " + aiMove.y + ", as its next play.");
      ai.cycles = 0;
    }
    grid.board[aiMove.x][aiMove.y].directPlace(player);
    aiMadeMove = true;
  }

  checkForGameOver();

  //Togle turn etc
  if(!aiMadeMove) return;
  if(player == "X"){ player = "O"; }
  else if(player == "O"){ player = "X"; }
  gameState = "human turn";
}




function checkForGameOver(){
  var Xs = 0;
  var Os = 0;

  //Horizontal Wins
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid.board[i][j].player == "X"){Xs++;}
      else if(grid.board[i][j].player == "O"){Os++;}
    }
    if(Xs<2 && Os<2){Xs = 0; Os = 0; }
    else if(Xs>2){ 
      gameOver = true;
      handleGameOver("X");
    }
    else if(Os>2){
      gameOver = true;
      handleGameOver("O");
    }
    Xs = 0; Os = 0;
  }

  //Verticl Wins
  Xs = 0; Os = 0;
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid.board[j][i].player == "X"){Xs++;}
      else if(grid.board[j][i].player == "O"){Os++;}
    }
    if(Xs<2 && Os<2){Xs = 0; Os = 0; }
    else if(Xs>2){ 
      gameOver = true;
      handleGameOver("X");
    }
    else if(Os>2){
      gameOver = true;
      handleGameOver("O");
    }
    Xs = 0; Os = 0;
  }

  //Diagonal Wins top left to bottom right
  Xs = 0; Os = 0;
  for(i=0; i<3; i++){
    if(grid.board[i][i].player == "X"){Xs++;}
    else if(grid.board[i][i].player == "O"){Os++;}
  }
  if(Xs<2 && Os<2){Xs = 0; Os = 0; }
  else if(Xs>2){ 
    gameOver = true;
    handleGameOver("X");
  }
  else if(Os>2){
    gameOver = true;
    handleGameOver("O");
  }
  

  //Diagonal Win: top right to bottom left
  Xs = 0; Os = 0;
  for(i=0; i<3; i++){
    if(grid.board[i][2-i].player == "X"){Xs++;}
    else if(grid.board[i][2-i].player == "O"){Os++;}
  }
  if(Xs>2){ 
    gameOver = true;
    handleGameOver("X");
  }
  else if(Os>2){
    gameOver = true;
    handleGameOver("O");
  }

  //Cats game
  var cats = 0;
  for(i=0; i <3; i++){
    for(j=0;j<3;j++){
      if(grid.board[i][j].player != "NONE"){cats++;}
    }
  }
  if(cats>8 && !gameOver){gameOver=true; handleGameOver("CAT");}
  cats = 0;
}

function handleGameOver(winner){
  gameStateString = winner + " WINS!";
}

function placePiece() {
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      var out = grid.board[i][j].update(player);
      if (out) {
        if (player == "X") { player = "O"; }
        else if (player == "O") { player = "X"; }
        return true;
      }
    }
  }
  return false;
}

function restart(){
  gameOver = false;
  resseting = true;
  grid.wipe();
  gameStateString = "GAME IN PROGRESS";
  player = "X";
  switch(gameMode){
    case "human vs human":
      gameState = "human vs human";
      break;
    case "human turn":
      gameState = "human turn";
      break;
  }
}

function AiStart(){
  restart();
  gameState = "ai turn-" + aiMode;
  player = ai.aiPlayer;
  aiTurn();
}