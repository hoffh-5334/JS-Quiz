//Global variables
var countdown = 120;
var score = 0;
var i = 0;



//selecting Dom Elements
var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var header = document.querySelector("header");
var main = document.querySelector("main");
var currentScore = document.querySelector("#score");
var saveScore = document.createElement("highScore");
var inputButton = document.createElement("button");
var viewHighScore = document.createElement("button");
var playAgain = document.createElement("button");





//updates countdown timer
function setTime() {
  var timerInterval = setInterval(function () {
    countdown--;
    console.log(countdown);
    if (countdown === 0 || countdown < 0) {
      clearInterval(timerInterval);
      countdown = 0;
      endGame();
    }
    timer.textContent = countdown;

  }, 1000);
}



// Start Button that initiates everything

startButton.addEventListener("click", function () {
  header.innerHTML = ""             //important to clear, 
  setTime(); //a timer starts 
  askingQuestionX();
  //retrieveHighScore() ; //Not pushing to the array


});