//Properties
let fr= 60;
let ballSize;
let numberOfBalls;
let ballSpeed;
let brightness;
let trails = false;
let RedSlider;
let BlueSlider;
let GreenSlider;

//Membe variables
let bg;
let canvasWidth;
let canvasHeight;
let ball;
let physics;
let balls;
let buttonStart;
let buttonSave;
let buttonToggleTrails;
let song;


function setup() {
  // put setup code here
    bg = color(150, 220, 170);
    canvasWidth=1200;
    canvasHeight=600;
    createCanvas(canvasWidth,canvasHeight);
    background(bg);
    frameRate(fr);
    

    CreateSliders();
    CreateButtons();
    
    physics = new Physics(canvasWidth, canvasHeight);
    balls = createBalls(numberOfBalls.value());
    
    //song = loadSound('assets/Adrift.mp3', SongLoaded);
    //song = loadSound('assets/Adrift.mp3', SongLoaded)
}

function draw() {
  // put drawing code here
    
    if(!trails){background(bg);}//Only clear bg if trails off
    updateBalls();
}

function CreateSliders(){
    
    var scale = 15;
    var sliderOffset = 40;
    
    var sizeLbl = createP("Size");
    ballSize = createSlider(1, 100, 50);
    sizeLbl.position(canvasWidth, scale * 1);
    ballSize.position(canvasWidth + sliderOffset, scale * 2);
    
    var numberLbl = createP("Number of Balls");
    numberOfBalls = createSlider(1, 500, 400);
    numberLbl.position(canvasWidth, scale * 3);
    numberOfBalls.position(canvasWidth + sliderOffset, scale * 4);
    
    var speedLbl = createP("Speed");
    ballSpeed = createSlider(1, 100, 1);
    speedLbl.position(canvasWidth, scale * 5);
    ballSpeed.position(canvasWidth + sliderOffset, scale * 6);
    
    var brightnessLbl = createP("Brightness");
    brightness = createSlider(0, 150, 100);
    brightnessLbl.position(canvasWidth, scale * 7);
    brightness.position(canvasWidth + sliderOffset, scale * 8);
    
    var redLbl = createP("Red");
    RedSlider = createSlider(0,1,1,0.1);
    redLbl.position(canvasWidth, scale * 9);
    RedSlider.position(canvasWidth + sliderOffset, scale * 10);
    
    var blueLbl = createP("Blue");
    BlueSlider = createSlider(0,1,1,0.1);
    blueLbl.position(canvasWidth, scale * 11);
    BlueSlider.position(canvasWidth + sliderOffset, scale * 12);
    
    var greenLbl = createP("Green");
    GreenSlider = createSlider(0,1,1,0.1);
    greenLbl.position(canvasWidth, scale * 13);
    GreenSlider.position(canvasWidth + sliderOffset, scale * 14);
    
}

function CreateButtons(){
    var offset = 60;
    //Buttons
    buttonStart = createButton("RESET");
    buttonStart.position(offset, canvasHeight + 10);
    buttonStart.mousePressed(Start);
    
    buttonSave = createButton("Save Canvas");
    buttonSave.position(60 + offset, canvasHeight + 10);
    buttonSave.mousePressed(Snapshot);
    
    buttonToggleTrails = createButton("Toggle Trails");
    buttonToggleTrails.position(160 + offset, canvasHeight + 10);
    buttonToggleTrails.mousePressed(ToggleTrails);
}


function updateBalls() {
    for(i = 0; i<balls.length; i++){
        var v = physics.boundaryCheck(balls[i].position, balls[i].size);
        var r = balls[i].heading;
        if(v.x != 0 || v.y !=0){
            if(v.x == 1 || v.x == - 1){ r = createVector(-balls[i].heading.x, balls[i].heading.y);}
            else if(v.y == 1 || v.y == -1){r = createVector(balls[i].heading.x, - balls[i].heading.y)}
            balls[i].heading = r;
        }
        balls[i].updateProps(ballSize.value(), ballSpeed.value(), brightness.value(), RedSlider.value(), BlueSlider.value(), GreenSlider.value());
        balls[i].move();
        balls[i].display();
    }
}

function createBalls(n){
    var list = new Array(n);
    for(i=0; i < list.length; i++){
        var r = random(0.2,1);
        list[i] = new Ball(ballSize.value() * r, ballSpeed.value()/(10 * r), 
                           //p5.Vector.random2D().mult(canvasHeight)
                           createVector(random(ballSize.value(), canvasWidth - ballSize.value()) , random(ballSize.value(), canvasHeight - ballSize.value())), 
                           p5.Vector.random2D(), 
                           color((random()*100+brightness.value()) * RedSlider.value(), (random()*100+brightness.value()) * GreenSlider.value(), (random()*100+brightness.value()) * BlueSlider.value()),
                           r,
                           brightness.value());
    }
    return list;
}

function Start(){
    balls = createBalls(numberOfBalls.value());
}

function SongLoaded(){
    song.play();
    song.setVolume(0.5);
}

function Snapshot(){
    var s = "CanvasSnapshot";
    saveCanvas(s, 'png');
}

function ToggleTrails(){
    trails = !trails;
}