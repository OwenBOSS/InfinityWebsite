class Maze {
    constructor(columns, rows, cellSize, offset, steps, mode) {
        this.columns = columns;
        this.rows = rows;
        this.cellSize = cellSize;
        this.offset = offset;
        this.steps = steps;
        this.mode = mode;

        /*Should contain:
         - potential cells
         - cells that just became paths
         */
        this.updatedCells = [];
        this.traveledCells = [];
        this.path = [];
        this.startCell;
        this.userInput = [];
        this.potentialPaths = [];
        this.endCell;

        this.asyncPimRunning = false;

        this.grid = this.makeGrid();
        if (mode == "pre") this.generatePimMaze();
        if (mode == "async" && !this.asyncPimRunning) this.asyncStartPim(true);

    }

    makeGrid() {
        var arr = new Array(this.columns);

        for (let j = 0; j < this.columns; j++) {
            arr[j] = new Array(this.rows);
        }

        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                arr[i][j] = new Cell(i, j, this.cellSize, this.offset);
            }
        }

        return arr;
    }

    update() {
        switch (this.mode) {
            case "async":
                //Do the calculations for n steps
                for (let i = 0; i < this.steps; i++) {
                    this.asyncGeneratePimMaze();
                }

                //Only display once every n steps
                this.targetedShow();
                this.updatedCells.length = 0;
                break;

            case "solve-player":
                //Get cells the player could place on
                this.getPotentialPaths();
                //If input is over one of potential cells
                //Add cell to path list and set cell state to path
                var cell = this.isOver(this.userInput[0], this.userInput[1]);
                if(cell != null && cell != this.endCell) {
                    cell.isPath = true;
                    this.path.push(cell);
                    cell.isPotential = false;
                    this.startCell = cell;
                }
                else if(cell == this.endCell){
                    this.mode = "game-won";
                }

                this.show();
                break;

            case "pre":
                this.show();
                break;
            
            case "game-won":
                fill(color(80, 255, 80));
                rect(0,0, this.columns * this.cellSize, this.rows * this.cellSize);
                break;
        }
    }

    show() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.grid[i][j].show();
            }
        }
    }

    targetedShow() {
        var bgColor = this.grid[0][0].wallColor;
        background(bgColor);



        for (let i = 0; i < this.updatedCells.length; i++) {
            this.updatedCells[i].show();
        }

        for (let i = 0; i < this.traveledCells.length; i++) {
            this.traveledCells[i].show();
        }
    }

    getUserInput() {
        this.userInput = [mouseX, mouseY];
    }

    getPotentialPaths() {
        this.resetPotentials();
        this.potentialPaths.length = 0;
        var neighboors = this.getNeighboors(this.startCell);
        for (let i = 0; i < neighboors.length; i++) {
            var cell = neighboors[i];
            if (cell.traveled && !cell.isPath) {
                cell.isPotential = true;
                this.potentialPaths.push(cell);
            }
        }
    }

    isOver(x, y) {
        for (let i = 0; i < this.potentialPaths.length; i++) {
            var cell = this.potentialPaths[i];
            if (x > cell.leftBound && x < cell.rightBound && y > cell.topBound && y < cell.bottomBound) {
                return cell;
            }
        }
    }

    generatePimMaze() {
        //Chose random cell as start
        var startCell = this.grid[floor(random(0, this.columns + .1))][0];
        this.startCell = startCell; //Begging for refactor...
        startCell.isStart = true;
        startCell.traveled = true;

        //Generate Paths
        this.traveledCells = [startCell];

        var running = true;
        while (running) {
            //Get potential cells
            var potentialCells = this.getPotentialCells();

            if (potentialCells.length > 0) {
                //Randomly pick potential cell
                var randInt = floor(random(0, potentialCells.length));
                var randomCell = potentialCells[randInt]
                //Add picked cell to traveled cels
                this.traveledCells.push(randomCell);
                randomCell.traveled = true;

            } else {
                running = false;
            }
        }

        //pick end point
        this.generateEndPoint();
    }

    generateEndPoint() {
        var potentialEndPoints = [];
        for (let i = 0; i < this.columns; i++) {
            var cell = this.grid[i][this.rows - 1];
            if (cell.traveled)
                potentialEndPoints.push(cell);
        }
        var randInt = floor(random(0, potentialEndPoints.length));
        try {
            var cell = potentialEndPoints[randInt];
            cell.isEnd = true;
            this.endCell = cell;
            
        } catch (error) {
            console.log(potentialEndPoints, cell);
        }


        //Set mode to 
        this.mode = "solve-player";
    }

    asyncStartPim(once) {
        if (!once) return;

        this.asyncPimRunning = true;

        //Chose random cell as start
        var startCell = this.grid[floor(random(0, this.columns + .1))][0];
        startCell.isStart = true;
        startCell.traveled = true;
        this.startCell = startCell; //Begging for refactor...

        //Generate Paths
        this.traveledCells = [startCell];
    }

    asyncGeneratePimMaze() {
        var out = true;

        //Gaurd
        if (this.asyncPimRunning) {

            //Get potential cells
            var potentialCells = this.getPotentialCells(this.traveledCells);

            //Color potential cells
            for (let i = 0; i < this.columns; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.grid[i][j].isPotential = false;
                }
            }
            for (var i = 0; i < potentialCells.length; i++) {
                var cell = potentialCells[i];
                cell.isPotential = true;
                this.updatedCells.push(cell);
            }

            if (potentialCells.length > 0) {
                //Randomly pick potential cell
                var randInt = floor(random(0, potentialCells.length));
                var randomCell = potentialCells[randInt]
                //Add picked cell to traveled cels
                this.traveledCells.push(randomCell);
                randomCell.traveled = true;
                this.updatedCells.push(randomCell);
            } else {
                this.asyncEndPim();
                out = false;
            }

            this.asyncPimRunning = out;
        }
    }

    asyncEndPim() {
        this.resetPotentials();
        this.generateEndPoint();
    }

    resetPotentials(){
        //Reset potentials
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.grid[i][j].isPotential = false;
            }
        }
    }

    getPotentialCells() {
        var cells = [];
        var neighboors = [];

        for (let i = 0; i < this.traveledCells.length; i++) {
            //Neighboors of current cell
            var moreNeighboors = this.getNeighboors(this.traveledCells[i]);
            for (let i = 0; i < moreNeighboors.length; i++) {
                //Only reuturn untraveled cells
                if (!moreNeighboors[i].traveled) neighboors.push(moreNeighboors[i]);
            }
        }

        //Remove neighboors that have more than two traveled neighboors
        for (let i = 0; i < neighboors.length; i++) {
            //Look at neighboor cell alias "x".
            var cell = neighboors[i];

            //Get neighboors of "x"
            var xNeighboors = this.getNeighboors(cell);

            //if "x" has 1 traveled neighboor add to cells list
            var numberOfTraveledNeighboors = 0;
            for (let i = 0; i < xNeighboors.length; i++) {
                if (xNeighboors[i].traveled) numberOfTraveledNeighboors++;
            }
            if (numberOfTraveledNeighboors == 1) cells.push(cell);
        }

        return cells;
    }

    getNeighboors(currentCell) {
        var neighboors = [];
        //If we aren't an edge cell...
        if (currentCell.x != 0 && currentCell.x != this.columns - 1 && currentCell.y != 0 && currentCell.y != this.rows - 1) {
            neighboors.push(
                this.grid[currentCell.x][currentCell.y - 1], this.grid[currentCell.x + 1][currentCell.y], //hoizontal
                this.grid[currentCell.x][currentCell.y + 1], this.grid[currentCell.x - 1][currentCell.y] //vertical
            )
        }

        //Corner checks...
        else if (currentCell.x == 0 && currentCell.y == 0) neighboors.push(this.grid[currentCell.x + 1][currentCell.y + 1]);
        else if (currentCell.x == this.columns - 1 && currentCell.y == 0) neighboors.push(this.grid[currentCell.x - 1][currentCell.y + 1]);
        else if (currentCell.x == this.columns - 1 && currentCell.y == this.rows - 1) neighboors.push(this.grid[currentCell.x - 1][currentCell.y - 1]);
        else if (currentCell.x == 0 && currentCell.y == this.rows - 1) neighboors.push(this.grid[currentCell.x + 1][currentCell.y - 1]);

        //Top edge check
        else if (currentCell.y == 0) {
            neighboors.push(
                this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x + 1][currentCell.y],
                this.grid[currentCell.x][currentCell.y + 1]
            );
        }

        //Right edge check
        else if (currentCell.x == this.columns - 1) {
            neighboors.push(
                this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x][currentCell.y - 1],
                this.grid[currentCell.x][currentCell.y + 1]
            );
        }

        //Bottom edge check
        else if (currentCell.y == this.rows - 1) {
            neighboors.push(
                this.grid[currentCell.x - 1][currentCell.y], this.grid[currentCell.x][currentCell.y - 1],
                this.grid[currentCell.x + 1][currentCell.y]
            );
        }

        //Left edge check
        else if (currentCell.x == this.columns - 1) {
            neighboors.push(
                this.grid[currentCell.x][currentCell.y - 1], this.grid[currentCell.x + 1][currentCell.y],
                this.grid[currentCell.x][currentCell.y + 1]
            );
        }

        return neighboors;
    }
}

class Cell {
    constructor(x, y, size, offset) {
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
        this.isEnd = false;
        this.isPotential = false;
        this.isPath = false;

        this.wallColor = color(0);
        this.startColor = color(80, 255, 80);
        this.endColor = color(255, 80, 80);
        this.openColor = color(150);
        this.potentialColor = color(255, 255, 80);
        this.pathColor = color(80, 180, 255);
    }

    show() {
        noStroke();
        rectMode(CORNER);
        if (this.isStart) fill(this.startColor);
        else if (this.isPotential) fill(this.potentialColor);
        else if (this.isEnd) fill(this.endColor);
        else if (this.isPath) fill(this.pathColor);
        else if (this.traveled) fill(this.openColor);
        else(fill(this.wallColor));
        rect(this.x * this.size + this.offset, this.y * this.size + this.offset, this.size);
    }
}