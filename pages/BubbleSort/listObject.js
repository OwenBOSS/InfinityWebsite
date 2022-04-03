class ListObject{
    constructor(columnWidth, columnColor, windowScale, windowHeight, windowWidth){
        this.numberOfColumns = floor((windowScale * windowWidth) / columnWidth);
        this.columnWidth = columnWidth;
        this.columnColor = columnColor;
        this.windowScale = windowScale;
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;

        this.sorting = true;
        this.list = [];
        this.n = 0;
    }

    RandomStart(){
        for(var i = 0; i < this.numberOfColumns; i++){
            var height = random(0, this.windowScale * this.windowHeight);
            var element = new ListElement(height, columnColor);
            this.list.push(element);
        }
    }

    PerlinStart(){
        for(var i = 0; i < this.numberOfColumns; i++){
            var height = noise(i * 0.01) * this.windowHeight;
            var element = new ListElement(height, columnColor);
            this.list.push(element);
        }
    }

    Show(){
        noStroke();
        rectMode(CORNERS);
        for(var i = 0; i < this.numberOfColumns; i++){
            fill(this.list[i].columnColor);
            rect(i * this.columnWidth, this.windowHeight, i * this.columnWidth + this.columnWidth, this.list[i].height)
        }

        if(!this.sorting) this.FinishedColor();
    }

    BubbleSort(){
        var numberSorted = 0;

        if(!this.sorting) return; //Only perfom the sort of they are still un ordered
        for(var i = 0; i < this.list.length - 1; i++){
            if(this.list[i].height > this.list[i + 1].height){
                //Perform the sort based on height
                var temp = this.list[i + 1];
                this.list[i + 1] = this.list[i];
                this.list[i] = temp;

                //Reset time Stationary
                this.list[i].timeStationary = 0;
                this.list[i + 1].timeStationary = 0;

                //Increment the number of sorted elements
                numberSorted++;
            }
            else{
                //var temp = list[i].timeStationary;
                this.list[i].SetTime()
            }
        }
        if(numberSorted == 0) {
            this.sorting = false;
            this.FinishedColor();
        }
    }

    FinishedColor(){
        for(var i = 0; i < this.list.length - 1; i++){
            this.list[i].columnColor = color(100, 100, 150 + this.n * .1);
        }
        this.n = this.n + 10;
        if(this.n > 1000) this.n = 0;
    }
}

class ListElement{
    constructor(height, columnColor){
        this.height = height;
        this.columnColor = columnColor
        this.timeStationary;
        this.initialColor = columnColor;
    }

    SetTime(){
        this.timeStationary = this.timeStationary + .5;
        if(this.timeStationary > 100) this.timeStationary = 100;
        this.SetColor();
    }

    SetColor(){
        var colorList = this.initialColor.levels;
        var r = colorList[0] - this.timeStationary;
        var g = colorList[1] + this.timeStationary;
        var newColor = color(r, g, colorList[2]);
        this.columnColor = newColor;
    }

}