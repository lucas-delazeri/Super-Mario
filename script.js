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
