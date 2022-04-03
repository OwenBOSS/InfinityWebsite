class Tile{
    constructor(position, height, width){
        this.position = position;
        this.height = height;
        this.width = width;
        this.marked = false;
        this.player = "NONE";
    }

    show(){
        if(this.isOver()){fill(100);}
        else{fill(255);}
        stroke(0);
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.width, this.height);
        var s = this.player;
        if(this.player == "NONE"){ s = " ";}
        textAlign(CENTER, CENTER);
        text(s, this.position.x, this.position.y);
    }

    isOver(){
        var out = false;
        var x = this.width * 0.5;
        var y = this.height * 0.5;
        if(mouseX > this.position.x - x && mouseX < this.position.x + x 
            && mouseY > this.position.y - y && mouseY < this.position.y + y){ out = true; }
        else { out = false; }
        return out;
    }

    update(player){
        var out = false;
        if(this.isOver() && !this.marked){ 
            this.player = player;
            this.marked = true;
            out = true;
        }
        else{ out = false;}
        return out;
    }

    directPlace(player){
        this.player = player;
        this.marked = true;
    }

    undoMove(){
        this.player = "NONE";
        this.marked = false;
    }
}

class Grid{
    constructor(numHorCells, numVertCells, cellWidth, cellHeight, xOffset, yOffset){
        this.numHorCells = numHorCells;
        this.numVertCells = numVertCells;
        this.cellWidth = cellHeight;
        this.cellHeight = cellHeight; 
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        
        var arr = Array(numHorCells);
        for(var i=0; i<numHorCells; i++){
            arr[i] = new Array(numVertCells);
            for(var j=0; j<numVertCells; j++){
                arr[i][j] = new Tile(createVector(xOffset + cellWidth * i, yOffset + cellHeight * j), cellWidth, cellHeight);
            }
        }

        this.board = arr;
    }

    wipe(){
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                this.board[i][j].undoMove();
            }
        }
    }
}