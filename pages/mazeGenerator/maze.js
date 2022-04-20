class Maze{
    constructor(columns, rows, cellSize, offset){
        this.columns = columns;
        this.rows = rows;
        this.cellSize = cellSize;
        this.offset = offset;
        this.grid = this.makeGrid();
        this.generatePimMaze();
    }

    makeGrid(){
        var arr = new Array(this.columns);

        for (let j = 0; j < this.columns; j++) {
            arr[j] = new Array(this.rows);          
        }

        for(let i = 0; i < this.columns; i++){
            for(let j = 0; j < this.rows; j++){
                arr[i][j] = new Cell(i, j, this.cellSize, this.offset);
            }
        }

        return arr;
    }

    show() {
        for(let i = 0; i < this.columns; i++){
            for (let j = 0; j < rows; j++) {
                if(this.isOver(i, j)){
                    fill(200);
                }
                else{
                    fill(255);
                }
                stroke(0);
                this.grid[i][j].show();
            }
        }
    }

    isOver(i, j){
        var out = false;
        var cell = this.grid[i][j];

        if(mouseX > cell.leftBound && mouseX < cell.rightBound && mouseY > cell.topBound && mouseY < cell.bottomBound) out = true;

        return out;
    }

    generatePimMaze(){
        //Chose random cell as start
        var startCell = this.grid[floor(random(0, this.columns + .1))][0];
        startCell.isStart = true;
        startCell.traveled = true;
        
        //Iterate
        var traveledCells = [startCell];

        var running = true;

        while(running){
            //Get potential cells
            var potentialCells = this.getPotentialCells(traveledCells);
            
            if(potentialCells.length > 0){
                //Randomly pick potential cell
                var randInt = floor(random(0, potentialCells.length));
                var randomCell = potentialCells[randInt]
                //Add picked cell to traveled cels
                traveledCells.push(randomCell);
                try {
                    randomCell.traveled = true;
                } catch (error) {
                    running = false;
                    console.log(randInt, potentialCells.length, potentialCells);
                }
                
            }
            else{
                running = false;
            }
        }
    }

    getPotentialCells(traveledCells){
        var cells = [];
        var neighboors = [];

        for(let i = 0; i < traveledCells.length; i++)
        {
            //Neighboors of current cell
            var moreNeighboors = this.getNeighboors(traveledCells[i]);
            for(let i = 0; i < moreNeighboors.length; i++){
                //Only reuturn untraveled cells
                if(!moreNeighboors[i].traveled) neighboors.push(moreNeighboors[i]);
            }
        }

        //Remove neighboors that have more than two traveled neighboors
        for(let i = 0; i < neighboors.length; i++){
            //Look at neighboor cell alias "x".
            var cell = neighboors[i];

            //Get neighboors of "x"
            var xNeighboors = this.getNeighboors(cell);

            //if "x" has 1 traveled neighboor add to cells list
            var numberOfTraveledNeighboors = 0;
            for(let i = 0; i < xNeighboors.length; i++){
                if(xNeighboors[i].traveled) numberOfTraveledNeighboors++;
            }
            if(numberOfTraveledNeighboors == 1) cells.push(cell);
        }

        return cells;
    }

    getNeighboors(currentCell){
        var neighboors = [];
        //If we aren't an edge cell...
        if(currentCell.x != 0 && currentCell.x != this.columns - 1 && currentCell.y != 0 && currentCell.y != this.rows - 1){
            neighboors.push(
                this.grid[currentCell.x][currentCell.y - 1], this.grid[currentCell.x + 1][currentCell.y], //hoizontal
                this.grid[currentCell.x][currentCell.y + 1], this.grid[currentCell.x - 1][currentCell.y]  //vertical
            )
        }

        //Corner checks...
        else if(currentCell.x == 0 && currentCell.y == 0) neighboors.push(this.grid[currentCell.x + 1][currentCell.y + 1]);
        else if(currentCell.x == this.columns - 1 && currentCell.y == 0) neighboors.push(this.grid[currentCell.x - 1][currentCell.y + 1]);
        else if(currentCell.x == this.columns - 1 && currentCell.y == this.rows - 1) neighboors.push(this.grid[currentCell.x - 1][currentCell.y - 1]);
        else if(currentCell.x == 0 && currentCell.y == this.rows - 1) neighboors.push(this.grid[currentCell.x + 1][currentCell.y - 1]);

        //Top edge check
        else if(currentCell.y == 0) {
                neighboors.push(
                    this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x + 1][currentCell.y], 
                    this.grid[currentCell.x][currentCell.y + 1]
                );
        }

        //Right edge check
        else if(currentCell.x == this.columns - 1) {
            neighboors.push(
                this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x][currentCell.y - 1], 
                this.grid[currentCell.x][currentCell.y + 1]
            );
        }

        //Bottom edge check
        else if(currentCell.y == this.rows - 1) {
            neighboors.push(
                this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x][currentCell.y - 1], 
                this.grid[currentCell.x + 1][currentCell.y]
            );
        }

        //Left edge check
        else if(currentCell.x == this.columns - 1) {
            neighboors.push(
                this.grid[currentCell.x][currentCell.y - 1], this.grid[currentCell.x + 1][currentCell.y], 
                this.grid[currentCell.x][currentCell.y + 1]
            );
        }

        return neighboors;
    }
}

class Cell{
    constructor(x, y, size, offset){
        this.x = x;
        this.y = y;
        this.size = size;
        this.offset = offset;
        
        //Bounds depend on rect mode!
        this.leftBound = offset + x * size;
        this.rightBound = offset + x * size + size;
        this.topBound = offset + y * size;
        this.bottomBound = offset + y * size + size;

        this.isStart = false;
        this.traveled = false;
    }

    show(){
        noStroke();
        if(this.isStart) fill(color(150, 200, 150));
        else if(this.traveled) fill(color(100));
        else(fill(color(0)));
        rect(this.x * this.size + this.offset, this.y * this.size + this.offset, this.size);
    }
}