class Maze{
    constructor(columns, rows, cellSize, offset){
        this.columns = columns;
        this.rows = rows;
        this.cellSize = cellSize;
        this.offset = offset;
    }

    show() {
        for(let i = 0; i < this.columns; i++){
            for (let j = 0; j < rows; j++) {
                noFill();
                stroke(0);
                rect(i * this.cellSize + this.offset, j * this.cellSize + this.offset, this.cellSize);
            }
        }
    }

    isOver(i, j){
        var out = false;


        return out;
    }
}