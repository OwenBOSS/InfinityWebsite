function updateClock() {
    // Get the current time
    var now = new Date();
    
    // Get the current hour, minute, and second
    var hour = now.getHours() % 12;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    
    // Calculate the angles for the clock hands
    var hourAngle = (hour * 30) + (minute / 2);
    var minuteAngle = minute * 6;
    var secondAngle = second * 6;
    
    // Output the angles to the console
    console.log("Hour hand angle: " + hourAngle + " degrees");
    console.log("Minute hand angle: " + minuteAngle + " degrees");
    console.log("Second hand angle: " + secondAngle + " degrees");
  }
  
  // Call the updateClock function every second
  setInterval(updateClock, 1000);
  