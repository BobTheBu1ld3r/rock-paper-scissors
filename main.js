const computerText = document.querySelector(".computer-text");

const buttons = document.querySelectorAll("button");
const selectionMessage = document.querySelector(".selectionMessage")
const roundResultMessage = document.querySelector(".roundResultMessage");
const scoreMessage = document.querySelector(".scoreMessage");

const tryAgainScreen = document.querySelector(".try-again-screen")
const gameResultMessage =  document.querySelector(".game-result-message");
const tryAgainButton =  document.querySelector(".try-again-button");


const computerMessages = document.querySelectorAll(".computer-declaration");
console.log(computerMessages);


function type (element) {
    const message = element.dataset.message.split("");

    const newInterval = setInterval(function(){
        if(message.length === 0) return clearInterval(newInterval);
        element.textContent += message.shift();
    }, 100);
}

function erase(element) {
    const newInterval = setInterval(()=>{
        element.textContent = element.textContent.slice(0,-1);
    },50)
}


function computeTimeout (element) {
    let LETTER_DELAY = 100;
    let NEWLINE_DELAY = 400;
    return element.dataset.message.length*LETTER_DELAY*1.1 + NEWLINE_DELAY;
}


setTimeout(()=>{
    computerMessages[0].classList.toggle("typing");
    type(computerMessages[0]);
    setTimeout(()=>{
        computerMessages[0].classList.toggle("typing");
        computerMessages[1].classList.toggle("typing");
        type(computerMessages[1]);
        setTimeout(()=>{
            computerMessages[1].classList.toggle("typing");
            computerMessages[2].classList.toggle("typing");
            type(computerMessages[2]);
            setTimeout(()=>{
                computerMessages[2].classList.toggle("typing");
                computerMessages[3].classList.toggle("typing");
                type(computerMessages[3]);
                setTimeout(()=>{
                    computerMessages[3].classList.toggle("typing");
                    computerMessages[4].classList.toggle("typing");
                    type(computerMessages[4]);
                }, computeTimeout(computerMessages[3]));
            }, computeTimeout(computerMessages[2]));
        },computeTimeout(computerMessages[1]));
    }, computeTimeout(computerMessages[0]));
},1000);






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
    selectionMessage.textContent = "";
    roundResultMessage.textContent = "";
    scoreMessage.textContent = "";

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

    if(playerSelection === "try-again-button") return resetGame();

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
