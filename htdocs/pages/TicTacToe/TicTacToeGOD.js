class AI{
  constructor(aiPlayer, grid, debug){
      this.aiPlayer = aiPlayer;
      this.grid = grid.board;
      this.debug = debug;
      if(this.aiPlayer == "O"){this.humanPlayer = "X";}
      else{this.humanPlayer = "O";}
      this.cycles = 0;
  }

  minimax(maximizer, depth){
    var bestScore;
    var bestMove;
    this.cycles++;

    //Maximizing Code
    if(maximizer){
      bestScore = -Infinity;

      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
          if(this.validMove(i, j)){
            //Make the move and score the grid
            this.grid[i][j].directPlace(this.aiPlayer);
            var score = this.score(maximizer, depth) - depth;
            this.grid[i][j].undoMove();

            //Update best score and move
            if(score > bestScore){
              bestScore = score;
              bestMove = createVector(i, j);
            }
          }
        }
      }
    }
    else{//Minimizing Code
      bestScore = Infinity;

      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
          if(this.validMove(i, j)){
            //Make the move and score the grid
            this.grid[i][j].directPlace(this.humanPlayer);
            var score = this.score(maximizer, depth) + depth;
            this.grid[i][j].undoMove();

            //Update best score and move
            if(score < bestScore){
              bestScore = score;
              bestMove = createVector(i, j);
            }
          }
        }
      }

    }

    var out = new Array(2);
    out[0] = bestMove;
    out[1] = bestScore;
    if(this.debug) console.log("Depth: " + depth + ". Best score is: " + out[1] +". and the best move is x=" + out[0].x + ", y=" + out[0].y);
    return out; 
  }

  score(maximizer, depth){
    //If the game is over return a score
    var aiScore = 0;
    var humanScore = 0;
    var out = null;

    //Horizontal Wins
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(this.grid[i][j].player == this.aiPlayer){aiScore++;}
        else if(this.grid[i][j].player == this.humanPlayer){humanScore++;}
      }
      if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
      else if(aiScore>2){ 
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      else if(humanScore>2){
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      aiScore = 0; humanScore = 0;
    }

    //Verticl Wins
    aiScore = 0; humanScore = 0;
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(this.grid[j][i].player == this.aiPlayer){aiScore++;}
        else if(this.grid[j][i].player == this.humanPlayer){humanScore++;}
      }
      if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
      else if(aiScore>2){ 
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      else if(humanScore>2){
        if(maximizer) out = 10;
        else if(!maximizer) out = -10;
      }
      aiScore = 0; humanScore = 0;
    }

    //Diagonal Wins top left to bottom right
    aiScore = 0; humanScore = 0;
    for(i=0; i<3; i++){
      if(this.grid[i][i].player == this.aiPlayer){aiScore++;}
      else if(this.grid[i][i].player == this.humanPlayer){humanScore++;}
    }
    if(aiScore<2 && humanScore<2){aiScore = 0; humanScore = 0; }
    else if(aiScore>2){ 
      if(maximizer) out = 10;
      else if(!maximizer) out = -10;
    }
    else if(humanScore>2){
      if(maximizer) out = 10;
      else if(!maximizer) out = -10;
    }
  

    //Diagonal Win: top right to bottom left
    aiScore = 0; humanScore = 0;
    for(i=0; i<3; i++){
      if(this.grid[i][2-i].player == this.aiPlayer){aiScore++;}
      else if(this.grid[i][2-i].player == this.humanPlayer){humanScore++;}
    }
    if(aiScore>2){ 
      if(maximizer) out = 10;
      else if(!maximizer) out = -10;
    }
    else if(humanScore>2){
      if(maximizer) out = 10;
      else if(!maximizer) out = -10;
    }

    //Cats game
    var cats = 0;
    for(i=0; i <3; i++){
      for(j=0;j<3;j++){
        if(this.grid[i][j].player != "NONE"){cats++;}
      }
    }
    if(cats>8 && out == null){
      out = 0;
    }
    cats = 0;

    //If the game is not over call minimax again!
    if(out != null){ //if(out) is true when the game has ended, and thus we simply return out
      return out;
    }
    else{ //if(out) is flase when we need to go deeper!
      return this.minimax(!maximizer, depth + 1)[1];
    }
  }


  randomMove(){
    var randomIndex = createVector(floor(random(0,2.1)), floor(random(0,2.1)));
    if(this.validMove(randomIndex.x, randomIndex.y)){
        return randomIndex;
    }
    else{ 
        randomIndex =this.randomMove(this.grid);
        return randomIndex;
    }
  }

  validMove(i, j){
    return this.grid[i][j].player == "NONE";
  }

  numberOfValidMoves(){
    var n = 0;
    for(i=0; i<3; i++){
      for(j=0; j<3; j++){
        if(this.validMove(i, j)){n++;}
      }
    }
    return n;
  }
}