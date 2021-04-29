const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const button = document.querySelector("button");
let lastHole,
  score = 0,
  timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (lastHole === hole) return randomHole(holes);

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  button.setAttribute("disabled", "");
  score = 0;
  scoreBoard.textContent = "Score: 0";
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true;
    button.removeAttribute("disabled", "");
  }, 15000);
}

function showScore(e) {
  if (!e.isTrusted) return;
  score++;
  lastHole.classList.remove("up");
  scoreBoard.textContent = `Score: ${score}`;
}

moles.forEach((mole) => mole.addEventListener("click", showScore));

button.addEventListener("click", startGame);
