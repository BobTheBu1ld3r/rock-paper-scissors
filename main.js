rules = [["rock", "paper"], ["paper", "scissors"], ["scissors", "rock"]];
let playerScore = 0,
    computerScore =0;

for (let i = 0; i<5; i++){
    playGame();
    console.log(`Player Score: ${playerScore}\nComputer Score: ${computerScore}`);
}

console.log(findResult());


function getComputerSelection() {
    return Math.floor(Math.random()*3);
}

function getPlayerSelection() {
    let input;
    while(!(input==="rock"||input==="scissors"||input==="paper")){
        input = prompt("Rock, paper or scissors").toLowerCase();
    }
    return input;
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

function playGame() {
    const playerSelection = getPlayerSelection();
    const computerSelection = getComputerSelection();
    console.log(`You chose ${playerSelection} and the computer chose ${rules[computerSelection][0]}`);
    const outcome = findOutcome(playerSelection, computerSelection);
    console.log(`You ${outcome}!`);
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

