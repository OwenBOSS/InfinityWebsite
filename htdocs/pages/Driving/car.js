class Car{
    constructor(position, heading, size, speed, color){
        this.position = position;
        this.size = size;
        this.speed = speed;
        this.turningspeed = speed * 0.075;
        this.color = color;
        this.heading = heading;
    }
    
    display(){
        var vertices = new Array(3);
        noStroke();
        fill(this.color);
        vertices = this.calculateVertices();
        triangle(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y, vertices[2].x, vertices[2].y);
        fill(0);
    }

    move(){
        this.position = createVector(this.position.x + this.speed * cos(this.heading), this.position.y - this.speed *  sin(this.heading))
    }

    turn(){
        var turn;
        if(keyIsDown(65)){turn = this.turningspeed; }
        else if(keyIsDown(68)){turn = -this.turningspeed;}
        else{turn = 0;}
        this.heading = this.heading + turn;
    }

    calculateVertices(){
        var vertices = new Array(3);

        vertices[0] = createVector(this.position.x + 0.7 * this.size * cos(this.heading), 
                                    this.position.y - 0.7 * this.size * sin(this.heading));

        vertices[1] = createVector(this.position.x - 0.3 * this.size * cos(this.heading  + 0.5 * PI), 
                                    this.position.y + 0.3 * this.size * sin(this.heading + 0.5 * PI));

        vertices[2] = createVector(this.position.x + 0.3 * this.size * cos(this.heading  + 0.5 * PI), 
                                    this.position.y - 0.3 * this.size * sin(this.heading + 0.5 * PI));

        return vertices;
    }
}