class EnemyCar extends Car{
    constructor(position, heading, size, speed, color, target){
        super(position, heading, size, speed, color);
        this.target = target;
    }

    enemyMove(target){
        this.target = target;
        this.rotateTowardTarget(this.target);
        this.move();
    }

    rotateTowardTarget(){
        var vTarget = createVector(this.target.x - this.position.x, this.target.y - this.position.y);
        var vCurrent = createVector(cos(this.heading), -sin(this.heading));
        let vResult;
        vResult = p5.Vector.lerp(vTarget, vCurrent, .1);
        vResult.normalize();

        //console.log("vTarget = " + vTarget, "vCurrent = " + vCurrent, "vResult = " + vResult);

        if(vResult.y >= 0) { this.heading = -acos(vResult.x); }
        else{ this.heading = acos(vResult.x); }
    }

}