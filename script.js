import Ball from './Ball.js';
import Paddle from './Paddle.js';
const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = parseInt(time - lastTime);
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
    document.documentElement.style.setProperty('--hue', hue + delta * 0.01);
    if (isLose()) {
      handleLoose();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}
function isLose() {
  const rect = ball.rect();
  const gameArenaWidth = document.getElementById('game-arena').offsetWidth;
  if (window.innerWidth <= 600) {
    return rect.right >= window.innerWidth || rect.left <= 0;
  }
  return (
    rect.right >= (window.innerWidth + gameArenaWidth) / 2 || rect.left <= (window.innerWidth - gameArenaWidth) / 2
  );
}
function handleLoose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}
document.getElementById('reset').addEventListener('click', () => {
  ball.reset();
  computerPaddle.reset();
  playerScoreElem.textContent = 0;
  computerScoreElem.textContent = 0;
});
document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  playerPaddle.position = (e.touches[0].pageY / window.innerHeight) * 100;
});
document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
function startAnimation() {
  window.requestAnimationFrame(update);
}
window.onload = startAnimation;
