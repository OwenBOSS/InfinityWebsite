class Physics{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    
    boundaryCheck(position, size){
        var out = createVector(0,0);
        var s = size/2;
        if(position.x + s > this.width) {out = createVector(1, 0);}
        else if(position.x - s < 0){ out = createVector(-1, 0); }
        else if(position.y + s > this.height){out = createVector(0, -1);}
        else if(position.y - s < 0) {out = createVector(0, 1);}
        return out;
    }
}