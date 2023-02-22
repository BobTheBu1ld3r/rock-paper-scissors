const buttons = document.querySelectorAll("button");
const selectionMessage = document.querySelector(".selectionMessage")
const roundResultMessage = document.querySelector(".roundResultMessage");
const scoreMessage = document.querySelector(".scoreMessage");

const tryAgainScreen = document.querySelector(".try-again-screen")
const gameResultMessage =  document.querySelector(".game-result-message");
const tryAgainButton =  document.querySelector(".try-again-button");

console.log(document);

console.log(tryAgainButton.getAttribute("class"));


buttons.forEach(button =>{
    // if(button.getAttribute("class").includes())
    button.addEventListener("click", playGame)
})



rules = [["rock", "paper"], ["paper", "scissors"], ["scissors", "rock"]];
let playerScore = 0,
    computerScore =0;

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    tryAgainScreen.style.display = "none";
}

function getComputerSelection() {
    return Math.floor(Math.random()*3);
}

function findOutcome (playerSelection, computerSelection) {
    if(playerSelection ===  rules[computerSelection][0]) {
        return "We DRAW.";
    };
    if(playerSelection === rules[computerSelection][1]) {
        playerScore++;
        return "You WIN";
    };
    computerScore++;
    return "You LOOSE";

}

function playGame(clickEvent) {
    roundResultMessage.textContent = "";
    
    const playerSelection = clickEvent.target.getAttribute("class");

    if(playerSelection === "try-again-button") resetGame();

    const computerSelection = getComputerSelection();
    const outcome = findOutcome(playerSelection, computerSelection);

    selectionMessage.textContent = `You chose ${playerSelection}. I chose ${rules[computerSelection][0]}.`;
    roundResultMessage.textContent = outcome;
    scoreMessage.textContent = `hacker: ${playerScore} | mainframe: ${computerScore}`;

    if(isOver(playerScore, computerScore)){
        tryAgainScreen.style.display = "flex";
        [gameResultMessage.textContent, tryAgainButton.textContent] = findResult();
    }
}

function isOver (playerScore, computerScore) {
    return playerScore + computerScore >= 5;
}

function findResult() {
    if(playerScore > computerScore){
        return ["YOU WIN THE GAME", "Play again"];
    }
    else if (playerScore === computerScore){
        return ["You Draw! Not too shabby", "Play again"];
    }
    return ["HA, YOU LOST THE GAME.", "Try again"];
}

