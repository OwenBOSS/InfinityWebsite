var justStarted = true;

var hourAngle = 0;
var minuteAngle = 0;
var secondAngle = 0;

var hourHand = document.getElementsByClassName("hours-container")[0];
var minHand = document.getElementsByClassName("mins-container")[0];
var seconHand = document.getElementsByClassName("seconds-container")[0];

function Main(){
    if(justStarted){
        initLocalClocks();
        //justStarted = false;
    }
}

function initLocalClocks() {
    // Get the local time using JS
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
  
    // Create an object with each hand and it's angle in degrees
    var hands = [
      {
        hand: 'hours-container',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'mins-container',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds-container',
        angle: (seconds * 6)
      }
    ];
    // Loop through each of these hands to set their angle
    for (var j = 0; j < hands.length; j++) {
      var elements = document.querySelectorAll('.' + hands[j].hand);
      for (var k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
          elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
          // If this is a minute hand, note the seconds position (to calculate minute position later)
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
      }
    }
  }

function rotateElement(element, angle) {
    element.style.transform = "rotate(" + angle + "deg)";
}

function updateClock() {
    // Get the current time
    var now = new Date();
    
    // Get the current hour, minute, and second
    var hour = now.getHours() % 12;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    // Calculate the angles for the clock hands
    hourAngle = (hour * 30) + (minute / 2);
    minuteAngle = (minute * 6) + (second / 10);
    secondAngle = second * 6;
    
    // Output the angles to the console
    console.log("Hour hand angle: " + hourAngle + " degrees");
    console.log("Minute hand angle: " + minuteAngle + " degrees");
    console.log("Second hand angle: " + secondAngle + " degrees");
  }

setInterval(Main, 1000);