const START_DELAY = 300; // in ms
const BUTTON_DELAY = 550; // in ms
const NEWLINE_DELAY = 400; // in ms
const TYPING_SPEED = 100; // in ms per letter

const computerText = document.querySelector(".computer-text");

const buttons = document.querySelectorAll("button");
const selectionMessage = document.querySelector(".selectionMessage");
const roundResultMessage = document.querySelector(".roundResultMessage");
const scoreMessage = document.querySelector(".scoreMessage");

const tryAgainScreen = document.querySelector(".try-again-screen");
const gameResultMessage = document.querySelector(".game-result-message");
const tryAgainButton = document.querySelector(".try-again-button");

const computerMessages = document.querySelectorAll(".computer-declaration");

function removeCursorAll() {
  computerMessages.forEach((el) => el.classList.remove("typing"));
}

function type(element) {
  removeCursorAll();
  element.classList.toggle("typing");
  const message = element.dataset.message.split("");

  return new Promise((resolve, reject) => {
    const newInterval = setInterval(function () {
      if (message.length === 0) {
        resolve();

        return clearInterval(newInterval);
      }
      element.textContent += message.shift();
    }, TYPING_SPEED);
  });
}

function delay(timeDelay) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeDelay);
  });
}

async function typingAnimation() {
  await delay(START_DELAY);
  for (let message of computerMessages) {
    await delay(NEWLINE_DELAY);
    await type(message);
  }
  for (let button of buttons) {
    await delay(BUTTON_DELAY);
    button.classList.toggle("hidden");
  }
  removeCursorAll();
}

typingAnimation();

buttons.forEach((button) => {
  //   if(button.getAttribute("class").includes())
  button.addEventListener("click", playGame);
});

rules = [
  ["rock", "paper"],
  ["paper", "scissors"],
  ["scissors", "rock"],
];
let playerScore = 0,
  computerScore = 0;

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  tryAgainScreen.style.display = "none";
  selectionMessage.textContent = "";
  roundResultMessage.textContent = "";
  scoreMessage.textContent = "";
}

function getComputerSelection() {
  return Math.floor(Math.random() * 3);
}

function findOutcome(playerSelection, computerSelection) {
  if (playerSelection === rules[computerSelection][0]) {
    return "We DRAW.";
  }
  if (playerSelection === rules[computerSelection][1]) {
    playerScore++;
    return "You WIN";
  }
  computerScore++;
  return "You LOOSE";
}

function playGame(clickEvent) {
  roundResultMessage.textContent = "";

  const playerSelection = clickEvent.target.getAttribute("class");

  if (playerSelection === "try-again-button") return resetGame();

  const computerSelection = getComputerSelection();
  const outcome = findOutcome(playerSelection, computerSelection);

  selectionMessage.textContent = `You chose ${playerSelection}. I chose ${rules[computerSelection][0]}.`;
  roundResultMessage.textContent = outcome;
  scoreMessage.textContent = `hacker: ${playerScore} | mainframe: ${computerScore}`;

  if (isOver(playerScore, computerScore)) {
    tryAgainScreen.style.display = "flex";
    [gameResultMessage.textContent, tryAgainButton.textContent] = findResult();
  }
}

function isOver(playerScore, computerScore) {
  return playerScore + computerScore >= 5;
}

function findResult() {
  if (playerScore > computerScore) {
    return ["YOU WIN THE GAME", "Play again"];
  } else if (playerScore === computerScore) {
    return ["You Draw! Not too shabby", "Play again"];
  }
  return ["HA, YOU LOST THE GAME.", "Try again"];
}
