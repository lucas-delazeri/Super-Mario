const mario = document.querySelector('.mario');
const turtle = document.querySelector('.turtle');
const pipe = document.querySelector('.pipe');
const restart = document.querySelector('.restart');
const pointsEl = document.querySelector('.points');
const star = document.querySelector('.star');

let gameRunning = true;
let points = 0;

const marioCrouch = './images/mario.agachado.png';
const marioStand = './images/mario.gif';

const gameMusic = new Audio('sounds/music.mp3');
const gameOverSound = new Audio('sounds/game_over.mp3');
const jumpSound = new Audio('sounds/jump.wav');
const star_rush = new Audio('sounds/star_rush.mp3');

gameMusic.play();
jumpSound.volume = 0.3;

const isColliding = (a, b) => {
  const rectA = a.getBoundingClientRect();
  const rectB = b.getBoundingClientRect();

  return !(
    rectA.right < rectB.left ||
    rectA.left > rectB.right ||
    rectA.bottom < rectB.top ||
    rectA.top > rectB.bottom
  );
};

const jump = () => {
  jumpSound.play();
  mario.classList.add('jump');
  setTimeout(() => mario.classList.remove('jump'), 500);
};

const crouch = () => {
    mario.src = marioCrouch;
    mario.style.width = '100px';
};

const standUp = () => {
    mario.src = marioStand;
    mario.style.width = '150px';
};

const isPipeNear = () => {
  const pipePosition = pipe.offsetLeft;
  return pipePosition > 0 && pipePosition < 250;
};

const spawnTurtle = () => {
    if (!gameRunning) return;

    if (isPipeNear()) {
        setTimeout(spawnTurtle, 500);
        return;
    }

    const heights = [140, 240];
    turtle.style.bottom = `${heights[Math.floor(Math.random() * heights.length)]}px`;
    turtle.style.display = 'block';

    turtle.style.animation = 'none';
    turtle.offsetHeight;
    turtle.style.animation = 'turtle-animation 1.5s linear';

    setTimeout(() => turtle.style.display = 'none', 1500);
    setTimeout(spawnTurtle, Math.random() * 3000 + 2000);
};

setTimeout(spawnTurtle, 2000);

const loop = setInterval(() => {
    if (!gameRunning) return;

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        endGame();
    }

    if (turtle.style.display === 'block' && isColliding(mario, turtle)) {
        endGame();
    }

    points++;
    pointsEl.innerText = `Pontos: ${points}`;

}, 10);

const endGame = () => {
    gameRunning = false;
    gameMusic.pause();
    gameOverSound.play();

    pipe.style.animation = 'none';
    turtle.style.animation = 'none';

    mario.src = './images/mario.game_over.png';
    mario.style.width = '75px';

    restart.style.display = 'block';  
    clearInterval(loop);
};