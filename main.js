const buttons = document.querySelectorAll("button");
const roundResult = document.querySelector(".roundResult");
const compScore = document.querySelector(".computerScore");
const playScore = document.querySelector(".playerScore");
const gameResult = document.querySelector(".gameResult");

buttons.forEach(button =>{
    button.addEventListener("click", playGame)
})



rules = [["rock", "paper"], ["paper", "scissors"], ["scissors", "rock"]];
let playerScore = 0,
    computerScore =0;



// for (let i = 0; i<5; i++){
//     playGame();
//     console.log(`Player Score: ${playerScore}\nComputer Score: ${computerScore}`);
// }

// console.log(findResult());

function resetGame() {
    playerScore = 0;
    computerScore = 0;
}


function getComputerSelection() {
    return Math.floor(Math.random()*3);
}


function findOutcome (playerSelection, computerSelection) {
    if(playerSelection ===  rules[computerSelection][0]) {
        return "Draw";
    };
    if(playerSelection === rules[computerSelection][1]) {
        playerScore++;
        return "Win";
    };
    computerScore++;
    return "Loose";

}

function playGame(clickEvent) {
    gameResult.textContent = "";
    const playerSelection = clickEvent.target.getAttribute("class");
    if(playerSelection === "reset") {
        resetGame();
        roundResult.textContent = "Game reset"
    }
    else { 
        const computerSelection = getComputerSelection();
        const outcome = findOutcome(playerSelection, computerSelection);
        roundResult.textContent = `You chose ${playerSelection} and the computer chose ${rules[computerSelection][0]}. You ${outcome} the round`;
    }

    playScore.textContent = `Player score: ${playerScore}`;
    compScore.textContent = `Computer score: ${computerScore}`;
    
    if(playerScore + computerScore >= 5){
        gameResult.textContent = findResult();
        resetGame();
    }
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

