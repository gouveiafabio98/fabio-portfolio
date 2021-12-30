// GAME
var gameContainer = document.getElementById("gameContainer");
var device = "desktop",
    mouseInterval;

function getDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //gameContainer.classList.add("displayNone");
        device = "mobile";
        clearInterval(mouseInterval);
        mouseInterval = setInterval(mobileMouse, 1000 / 60);
    } else {
        clearInterval(mouseInterval);
    }
}
getDevice();

var spaceship = document.getElementById("spaceship");
var game = document.getElementById("game");
var game2D = game.getContext("2d");
var meteorImg = Array();

var explosionEffect = new Audio('assets/sound/explosion.mp3');

var meteorArray = Array();

var gameState = false;

var meteorChance;

var timeChance = 2;

var meteorIntervalGeneration;

var mouseX, mouseY;

window.addEventListener('resize', reziseCanvas);

function reziseCanvas() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;

    meteorChance = window.innerWidth / 145;
}

function init() {
    for (var i = 1; i < 5; i++) {
        meteorImg.push(new Image());
        meteorImg[meteorImg.length - 1].src = 'assets/imgs/meteor' + i + '.svg';
    }
}

function draw() {
    if (gameState) {
        requestAnimationFrame(draw);
    }
    game2D.clearRect(0, 0, window.innerWidth, window.innerHeight);

    meteorArray.forEach((particle) => particle.draw());

    meteorFunction();
}

function meteorFunction() {
    let random = Math.random() * meteorChance;

    if ((meteorChance - meteorArray.length * timeChance) > random)
        meteorGenerator();
}

function meteorGenerator() {
    meteorArray.push(new Particle(
        randomIntFromInterval(-100, window.innerWidth + 100),
        Math.random() * -500 - 145,
        145,
        Math.random() + 2.2 - timeChance,
        Math.floor((Math.random() * 4))
    ));
}

reziseCanvas();

function playGame() {
    if (gameState)
        endGame();
    else
        startGame();
}

function startGame() {
    meteorArray = Array();
    gameState = true;

    clearInterval(timer);
    totalSeconds = -1;
    setTime();
    timer = setInterval(setTime, 1000);

    startGameText.innerText = "Stop";
    gameContainer.classList.add("playing");
    spaceship.classList.remove("displayNone");

    draw();
}

function endGame() {
    meteorArray = Array();
    gameState = false;

    clearInterval(timer);
    totalSeconds = -1;
    setTime();

    startGameText.innerText = "Play";
    gameContainer.classList.remove("playing");
    spaceship.classList.add("displayNone");

    draw();
}

function Particle(x, y, size, velocity, imageID) {
    this.x = x;
    this.size = size;
    this.y = y;
    this.velocity = velocity;
    this.imageID = imageID;

    this.draw = () => {
        console.log("hey");
        game2D.drawImage(meteorImg[imageID], this.x, this.y, this.size, this.size);
        this.y += this.velocity;

        if (this.y - this.size > window.innerHeight) {
            meteorArray.splice(meteorArray.indexOf(this), 1);
        }

        if (colideMeteor(this)) {
            explosionSound();
            var explosion = document.getElementsByClassName("content")[0];

            explosion.style.animation = 'none';
            explosion.offsetWidth;
            explosion.style.animation = 'noiseAnimation 200ms steps(4)';

            endGame();
        }
    };
}

function colideMeteor(obj) {
    if (obj.x < mouseX && obj.x + obj.size > mouseX && obj.y < mouseY && obj.y + obj.size > mouseY) {
        return true;
    } else {
        return false;
    }
}

function explosionSound() {
    explosionEffect.currentTime = 0
    explosionEffect.play();
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

init();


// TIMER
var timerLabel = document.getElementById("timer");
var minutesLabel = timerLabel.getElementsByClassName("minutes")[0];
var secondsLabel = timerLabel.getElementsByClassName("seconds")[0];

var recordLabel = document.getElementById("record");
var minutesRecord = recordLabel.getElementsByClassName("minutes")[0];
var secondsRecord = recordLabel.getElementsByClassName("seconds")[0];

var startGameLabel = document.getElementById("startGame");
var startGameText = startGameLabel.getElementsByClassName("stats")[0];

var totalSeconds = 0;
var recordSeconds = 0;
var timer;

function setTime() {
    totalSeconds++;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    timeChance = Math.max(0, 2 - parseInt(totalSeconds / 10) / 10);

    if (totalSeconds > recordSeconds) {
        recordSeconds = totalSeconds;
        secondsRecord.innerHTML = pad(recordSeconds % 60);
        minutesRecord.innerHTML = pad(parseInt(recordSeconds / 60));
    }
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}