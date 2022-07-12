//Customize size of the screen, user player, points and speed.
const width = 700;
const height = 700;
const borderSize = 30;
const userWidth = 35;
const userHeight = 35;
let speed = 1;
let youLost = false;
let points = 0;

//Movement and ball
xDirection = 1;
yDirection = 0;
let randomBall = null;

//Initial position
let x = width / 2;
let y = height / 2;

const divContainer = document.getElementById("Points-Button");


function setup() {
    createCanvas(width, height,);
}

function draw() {
    background(200);
    drawAxis()
    if (!randomBall) {
        randomBall = generateCoordinate();
    }
    drawBalls(randomBall);
    drawUser(x, y);
    drawStructure();
    movement();
    keyMovement();
    xTransporter();
    collisionsWall();
    collisionsBall(randomBall);
    score();
}



function drawBalls(ball) {
    fill(255, 204, 0);
    rect(ball.x, ball.y, 14);
    fill(0, 0, 0);
}

function drawUser(x, y) {
    rect(x, y, userWidth, userHeight);
}

function drawStructure() {
    //top and bottom borders
    rect(0, (height - borderSize), width, borderSize);
    rect(0, 0, width, borderSize);

    //left vertical lines
    line(0, 0, 0, height);
    //right vertical line
    line(width, 0, width, height);
}

function movement() {
    x = x + xDirection * speed;
    y = y + yDirection * speed;
}

function keyMovement() {
    if (keyCode === LEFT_ARROW) {
        xDirection = -1
        yDirection = 0
    } else if (keyCode === RIGHT_ARROW) {
        xDirection = 1
        yDirection = 0
    } else if (keyCode === DOWN_ARROW) {
        yDirection = 1
        xDirection = 0
    } else if (keyCode === UP_ARROW) {
        yDirection = -1
        xDirection = 0
    }
    drawUser();
}

function xTransporter() {
    if (x >= width) {
        x = - userWidth;
    } else if (x <= - userWidth) {
        x = width;
    }
}

function collisionsWall() {
    if (y < borderSize || y > (height - borderSize - userWidth)) {
        youLost = true;
        if (youLost) {
            gameOver();
        }
    }
}

//Is not perfect yet
function collisionsBall(ball) {

    for (let i = x; i < x + 25; i++) {
        for (let j = y; j < y + 25; j++) {
            if (i === ball.x && j === ball.y) {
                randomBall = null;
                points++;
                levels();
            }
        }
    }
}

function score() {
    divContainer.textContent = `Points: ${points}`;
}

function gameOver() {
    if (y > (height - borderSize - userWidth)) {
        y = height - borderSize - userWidth;
    } else if (y < borderSize) {
        y = 30
    }
    speed = 0;
    alert(`Game over
          \nYour points: ${points}
          \nYour level: ${speed}`);
    youLost = false;
    return true;
}

function levels() {
    if (points != 0 && points % 10 === 0) {
        speed++;
    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateCoordinate() {
    return {
        x: getRandomArbitrary(0, width), y: getRandomArbitrary((0 + borderSize + 15), (height - borderSize - 15))
    }
}