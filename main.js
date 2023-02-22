const buttons = document.querySelectorAll("button");
const selectionMessage = document.querySelector(".selectionMessage")
const roundResultMessage = document.querySelector(".roundResultMessage");
const scoreMessage = document.querySelector(".scoreMessage");

buttons.forEach(button =>{
    button.addEventListener("click", playGame)
})


rules = [["rock", "paper"], ["paper", "scissors"], ["scissors", "rock"]];
let playerScore = 0,
    computerScore =0;

function resetGame() {
    playerScore = 0;
    computerScore = 0;
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
    const computerSelection = getComputerSelection();
    const outcome = findOutcome(playerSelection, computerSelection);

    selectionMessage.textContent = `You chose ${playerSelection}. I chose ${rules[computerSelection][0]}.`;
    roundResultMessage.textContent = outcome;
    scoreMessage.textContent = `hacker: ${playerScore} | mainframe: ${computerScore}`;
    
    // if(playerScore + computerScore >= 5){
    //     gameResultMessage.textContent = findResult();
    //     resetGame();
    // }
}

function findResult() {
    if(playerScore > computerScore){
        return "YOU WIN THE GAME";
    }
    else if (playerScore === computerScore){
        return "You Draw! Not too shabby";
    }
    return "HA, YOU LOST THE GAME."
}

