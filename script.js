var x = 0;
var y = 0;
var xRatio = 0;
var yRatio = 0;
var yMargin = 150;
var xMargin = 0;

// Updates x,y coordinates and deltas on mouseMove()
function move(event) {
  x = event.clientX;
  y = event.clientY;
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  xMargin = (width-700)/2;
  var distance = Math.sqrt((x-xMargin)*(x-xMargin) + (y-yMargin)*(y-yMargin));
  xRatio = (x-xMargin)/distance;
  yRatio = (y-yMargin)/distance;
}

// Initiates and runs game loop
function play(event) {
  var loops = 0;
  var score = 0;
  var speed = 5;
  var bombX = 0;
  var bombY = 0;

  var bomb = document.getElementById("bomb1");
  bomb.style.backgroundColor="#455A64";
  bomb.classList.remove("explode");

  document.getElementById("over").style.zIndex="-1";
  document.getElementById("click").style.zIndex="-1";
  document.getElementById("click").classList.add("text-light");
  document.getElementById("playArea").classList.remove("shake");
  document.getElementById("bg").classList.remove("fade");

  var id = setInterval(frame, 10);

  // Game Loop
  function frame() {
    // Stat tracker
    document.getElementById("demo").innerHTML = "<b>Score: " + score + " </b>&nbsp;|&nbsp;&nbspSpeed: " + speed;

    // Adjust movement
    if (bombX + xMargin > x + 5){
      bombX -= xRatio * speed;
    }
    if (bombX + xMargin < x - 15){
      bombX += xRatio * speed;
    }
    if (bombY + yMargin > y + 5){
      bombY -= yRatio * speed;
    }
    if (bombY + yMargin < y - 15){
      bombY += yRatio * speed;
    }

    // End game or Apply movement
    if ((Math.abs(bombX + xMargin - x) < 15) && (Math.abs(bombY + yMargin - y) < 15)) {
      bomb.classList.add("explode");
      document.getElementById("bg").classList.add("fade");
      document.getElementById("over").style.zIndex="5";
      document.getElementById("over").classList.add("text-fade");
      document.getElementById("click").style.zIndex="5";
      document.getElementById("click").classList.add("text-fade");
      document.getElementById("click").classList.remove("text-light");
      document.getElementById("playArea").classList.add("shake");
      bomb.style.backgroundColor="#455A64";
      clearInterval(id);
    }
    else {
      bomb.style.left = bombX + 'px';
      bomb.style.top = bombY + 'px';
    }

    // Increase difficulty
    if (loops > 500 && loops < 1000) {
      speed = 8;
      bomb.style.backgroundColor="red";
    }

    if (loops > 1000) {
      speed = Math.round(loops / 250 + 10);
      bomb.style.backgroundColor="orange";
    }

    loops++;
    score = Math.round(loops / 10 * speed);
  }
}
