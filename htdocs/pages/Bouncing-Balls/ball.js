class Ball{
    constructor(size, speed, position, heading, color, scale, brightness){
        this.size = size;
        this.speed = speed;
        this.position = position;
        this.heading = heading.normalize();
        this.color = color;
        this.scale = scale;
        this.brightness = brightness;
        this.r = (color.levels[0] - brightness)*.01;
        this.g = (color.levels[1] - brightness)*.01;
        this.b = (color.levels[2] - brightness)*.01;
    }
    
    display(){
        noStroke();
        fill(this.color);
        circle(this.position.x, this.position.y, this.size);
    }
    
    move(){
        this.position = createVector(this.position.x + this.speed * this.heading.x,
                                    this.position.y - this.speed * this.heading.y);
    }
    
    updateProps(size, speed, brightness, red, blue, green){
        this.size = this.scale * size;
        this.speed = speed / (10 * this.scale);
        
        var r = brightness/this.brightness;//Brightness factor
        this.color = color(this.r*100*red + brightness,
                            this.g*100*green + brightness,
                            this.b*100*blue + brightness)
    }
}