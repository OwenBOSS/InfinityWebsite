class Grid{
    constructor(p, width, height, cellSize, offset){
        this.p = p;
        this.width =width;
        this.height = height;
        this.cellSize = cellSize;
        this.offset = offset;
        this.grid = this.createGrid();
        this.nextGrid = this.createGrid();
        
    }

    createGrid(){
        var arr = new Array(this.width);
        for(var i=0; i < arr.length; i++){
            arr[i] = new Array(this.height);
        }

        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                arr[i][j] = new Cell(this.p, this.cellSize, i, j, this.offset);
            }
        }
        return arr;
    }

    Show(){
        this.p.rectMode(this.p.CENTER);
        this.p.noFill(256);
        this.p.stroke(0);
        
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                this.grid[i][j].ShowCell();
            }
        }
    }

    UserInput(){
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                if(this.grid[i][j].isOver()){
                    this.grid[i][j].toggleMark();
                }
            }
        }
    }

    Update(){
        //Conway's Game of Life rules go in here
        //1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        //2: Any live cell with two or three live neighbours lives on to the next generation.
        //3: Any live cell with more than three live neighbours dies, as if by overpopulation.
        //4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


        //The nextGrid must equal this grid
        this.NextGridReset();

        //This loop gives me every cell
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){

                //Declare the control variables
                var numOfMarkedNeighbors = 0;
                var kStart = i - 1; var kLim = i + 2;
                var lStart = j - 1; var lLim = j + 2;
                //Restrict the bounds to the size of the board!
                if(kStart < 0) kStart = 0; if(kLim > this.width) kLim = this.width;
                if(lStart < 0) lStart = 0; if(lLim > this.height) lLim = this.height;

                //This loop checks the cells neighboors
                for(var k = kStart; k < kLim; k++){
                    for(var l = lStart; l < lLim; l++){
                        if(this.grid[k][l].marked) numOfMarkedNeighbors++;
                    }
                }

                //Now we have the state of the neighboors... Time to decide your fate!
                if(this.grid[i][j].marked){
                    //This is a live cell and thus we deal with rules 1-3
                    if(numOfMarkedNeighbors < 3) this.nextGrid[i][j].die(); //Fewer than 2 neighbors = die
                    else if(numOfMarkedNeighbors > 4) this.nextGrid[i][j].die(); //More than 3 neighbors = die
                }
                else{
                    //This cell is dead so we only deal with rule 4
                    if(numOfMarkedNeighbors == 3) this.nextGrid[i][j].live();
                }
            }
        }

        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                this.grid[i][j].marked = this.nextGrid[i][j].marked;
            }
        }
    }

    randomizeBoard(){
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                if(this.p.floor(this.p.random(1.5))){
                    this.grid[i][j].live();
                }
            }
        }
        this.NextGridReset();
    }

    Clear(){
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                this.grid[i][j].die();
            }
        }
        this.NextGridReset();
    }

    NextGridReset(){
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                this.nextGrid[i][j].marked = this.grid[i][j].marked;
            }
        }
    }

    test(){
        console.log("HELP MEEEEE");
    }
}

class Cell{
    constructor(p, cellSize, x, y, offset){
        this.p = p;
        this.cellSize = cellSize;
        this.x = x * cellSize + offset;
        this.y = y * cellSize + offset;
        this.offset = offset;
        this.marked = false;
        this.numberOfMarkedNeighbors;
    }

    ShowCell(){
        this.p.noStroke();
        if(this.marked){ this.p.fill(100); }
        else { this.p.fill(50); }
        this.p.rect(this.x, this.y, this.cellSize);
    }

    isOver(){
        return this.p.mouseX > this.x - 0.5 * this.cellSize && this.p.mouseX < this.x + 0.5 * this.cellSize
            && this.p.mouseY > this.y - 0.5 * this.cellSize && this.p.mouseY < this.y + 0.5 * this.cellSize;
    }

    toggleMark(){
        this.marked = !this.marked;
    }

    die(){
        this.marked = false;
    }

    live(){
        this.marked = true;
    }
}