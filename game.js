var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-10;
var ballRadius = 10;
var ballColor = "blue";
var dx = 2;
var dy = -2;
var paddleHeight = 7.5;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetleft = 30;
var score = 0;
//var lives = 3;

var bricks = [];
for(c=0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(r=0; r<brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth , paddleHeight);
  ctx.fillStyle = getRandomColor();
  ctx.fill();
  ctx.closePath();
}

 function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(c = 0; c < brickColumnCount; c++) {
    for(r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
      var brickX = (c*(brickWidth + brickPadding)) + brickOffsetleft;
      var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = getRandomColor();
      ctx.fill();
      ctx.closePath();
    }
  }
}
}

function CollisionDetection() {
  for(c = 0; c < brickColumnCount; c++) {
    for(r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1){
      if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
        dy = -dy;
        ballColor = getRandomColor()
        b.status = 0;
        score += 100;
        if(score == (brickRowCount * brickColumnCount) * 100)  {
          alert("You win! Congratulations! Your score: " + score);
          document.location.reload();
        }
      }
    }
  }
}
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  CollisionDetection();
  drawScore();

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 3;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 3;
  }

  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
    ballColor = getRandomColor();
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    ballColor = getRandomColor();
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("Game over! Your score: " + score);
      //Und Sie haben jetzt einen epileptischen Anfall. LOL.
      document.location.reload();
    }
  }
  x += dx;
  y += dy;
}

setInterval(draw, 1);

function drawScore() {
  ctx.font = "16px Open Sans";
  ctx.fillStyle = getRandomColor();
  ctx.fillText("Score: " + score, 8, 20);
}

/*
function drawLives() {
  ctx.font = "16px Open Sans";
  ctx.fillStyle = getRandomColor();
  ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}
*/
