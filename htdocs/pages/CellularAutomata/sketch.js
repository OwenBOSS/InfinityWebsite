var sketch = function(p){
  let helper;

p.setup = function() {
    // put setup code here
    helper = new Helper(p);
    helper.SetupFunction();
    p.CreateButtons();
  }

  p.draw = function() {
    // put drawing code here
    //console.log("I am in the p.draw function");
    helper.DrawFunction(helper.isPlaying);
  }

  p.mousePressed = function(){
    helper.mousePressed();
  }

  p.TogleGameState = function(){
    helper.isPlaying = !helper.isPlaying;
  }

  p.ClearBoard = function(){
    helper.ClearBoard();
    p.redraw();
  }

  p.RandomizeBoard = function(){
    helper.RandomizeBoard();
    p.redraw();
  }


  p.CreateButtons = function(){
    p.startStop = p.createButton("Start/Stop");
    p.startStop.position(200, 30);
    p.startStop.mousePressed(this.TogleGameState);

    p.clearButton = p.createButton("Clear Board");
    p.clearButton.position(300, 30);
    p.clearButton.mousePressed(this.ClearBoard);

    p.randomizeButton = p.createButton("Randomize Board");
    p.randomizeButton.position(400, 30);
    p.randomizeButton.mousePressed(this.RandomizeBoard);
  }
}

var myp5 = new p5(sketch, "P5-Container");
//var myp52 = new p5(sketch);
