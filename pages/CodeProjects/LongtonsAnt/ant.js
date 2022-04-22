class Ant{
    constructor(heading, grid, size, antColor, step, img){
        this.heading = heading;
        this.grid = grid;
        this.x = floor(grid.width * 0.5);
        this.y = floor(grid.height * 0.5);
        this.size = size;
        this.antColor = antColor;
        this.step = step;
        this.img = img;
    }

    Move(){
        var lastX = [];
        var lastY = [];

        for(var i = 0; i < step; i++){
            lastX.push(this.x);
            lastY.push(this.y)

            //Change direction
            this.Turn();

            //Flip grid color
            var newValue;
            if(this.grid.board[this.x][this.y] == 0) newValue = 1;
            else newValue = 0;
            this.grid.board[this.x][this.y] = newValue;

            //Move
            if(this.heading == 0) this.y--;
            else if(this.heading == 1) this.x++;
            else if(this.heading == 2) this.y++;
            else if(this.heading == 3) this.x--;

            //Wrap edges
            if(this.x > this.grid.width-1) this.x = 0;
            else if(this.x < 0) this.x = this.grid.width - 1;
            else if(this.y > this.grid.height-1) this.y = 0;
            else if(this.y < 0) this.y = this.grid.height - 1;
        }

        //Show grid
        this.grid.SpecificUpdate(lastX, lastY);

        //Update Image
        //this.UpdateIMG();
    }

    Turn(){
        //heading 0=up; 1=right; 2=down; 3=left;
        if(this.grid.board[this.x][this.y] == 0) {
            this.heading++;
            if(this.heading > 3) this.heading = 0;
        }
        else{
            this.heading--;
            if(this.heading < 0) this.heading = 3;
        }
    }

    Show(){
        var gridSize = this.grid.size
        fill(this.antColor);
        circle(this.x * gridSize, this.y * gridSize, size);
    }

    UpdateIMG(){
        var newColor;
        if(this.grid.board[this.x][this.y] == 0) newColor = 255;
        else newColor = 0;
        newColor = 0;

        this.img.loadPixels();
        this.writeColor(this.img, this.x, this.y, newColor, newColor, newColor, 255);
        this.img.updatePixels();

        image(this.img, 0, 0);
    }

    writeColor(image, x, y, red, green, blue, alpha) {
    let index = (x + y * width) * 4;
    image.pixels[index] = red;
    image.pixels[index + 1] = green;
    image.pixels[index + 2] = blue;
    image.pixels[index + 3] = alpha;
    }

    RandomizeImg(){
        for (var y = 0; y < img.height; y++) {
            for (var x = 0; x < img.width; x++) {
                let red = random(255);
                let green = random(255);
                let blue = random(255);
                let alpha = 255;
                this.writeColor(img, x, y, red, green, blue, alpha);
            }
        }
    }
}

class Grid{
    constructor(canvasWidth, canvasHeight, size, img){
        this.width = floor(canvasWidth / size);
        this.height =floor(canvasHeight / size);
        this.size = size;
        this.img = img;

        this.board = this.CreateBoard();
    }

    CreateBoard(){
        let arr = new Array(this.width);
        for(var i = 0; i < this.width; i++){
            arr[i] = new Array(this.height);
            for(var j = 0; j < this.height; j++){
                arr[i][j] = 0;
            }
        }
        return arr;
    }

    Show(){
        var cellColor;
        rectMode(CENTER);
        noStroke();
        for(var i = 0; i < this.width; i++){
            for(var j = 0; j < this.height; j++){
                if(this.board[i][j] == 0) {cellColor = color(255);}
                else {cellColor  = color(0);}
                fill(cellColor)
                rect(i * this.size, j * this.size, this.size);
            }
        }
    }

    SpecificUpdate(xList, yList){
        var length = xList.length;
        for(var i = 0; i < length; i++){
            var x = xList.pop();
            var y = yList.pop();
            var cellColor;
            rectMode(CENTER);
            noStroke();
            if(this.board[x][y] == 0) {cellColor = color(255);}
            else {cellColor  = color(0);}
            fill(cellColor)
            rect(x * this.size, y * this.size, this.size);
        }
    }
}