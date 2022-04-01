//Props
let fr = 60;
var CanvasWidth = 1200;
var CanvasHeight = 600;
var NumberOfEnemies = 100;


//Member vars
let car;
let enemies;
let song;


function setup() {
  // put setup code here
  frameRate(fr);
  createCanvas(CanvasWidth, CanvasHeight);

  car = new Car(createVector(100,200), 0, 20, 3, color(20,100,100));
  enemies = createEnemies(NumberOfEnemies);
  enemy = new EnemyCar(createVector(200,200), 0, 20, 1, color(255,0,0), car.position);
  //song = loadSound("/assets/WarLock.mp3", SongLoaded);
}

function draw() {
  // put drawing code here
  background(200);
  car.move();
  car.turn();
  car.display();
  
  updateEnemies();

}

function SongLoaded(){
  song.play();
  song.setVolume(.25);
}

function createEnemies(n){
  var list = new Array(n);
  for(i=0; i<n; i++){
    list[i] = new EnemyCar(createVector(random(10, CanvasWidth - 10), random(10, CanvasHeight - 10)), random(0,365), 20, random(.75,1.1), color(255,0,0), car.position);
  }

  return list;
}

function updateEnemies(){
  for(i=0; i < enemies.length; i++){
    enemies[i].enemyMove(car.position);
    enemies[i].display();
  }
}