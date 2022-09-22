//Global variables
var score = 0;
var i = 0;
var count = 50;
var scoreArray;


//Selecting DOM elements
var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var header = document.querySelector("header");
var section = document.querySelector("section");
var currentScore = document.querySelector("#score");
var addScore = document.createElement("input");
var saveScore = document.createElement("button");
var viewScores = document.createElement("button");
var newGame = document.createElement("button");



//Questions in an array of objects
var questions = [
{q: "What does JS stand for?",
choices: ["JavaScript", "Just Sayin", "Jelly Sandwich", "Jam Session"],
a: "JavaScript"
},
{
q: "WHat tag do you use to insert JavaScript into an HTML page?",
choices: ["<h2>", "<JavaScript>", "<script>", "<js>"],
a: "<script>"
},
{
q: "What language dictates the behavior of a webpage",
choices: ["JavaScript", "HTML", "CSS", "Gary's Special Language"],
a: "<JavaScript>"
},

{
q: "Where is the correct place to insert a JavaScript",
choices: ["Head", "Footer", "Credits", "Body"],
a: "Body"
},
]


//function to pull scores out of local storage
function init(){
  var pullScore = JSON.parse(localStorage.getItem("highScore"));

    if(!pullScore){
    scoreArray =[]
    }else{
      scoreArray = pullScore
    }
  var stringOfScores = JSON.stringify(scoreArray)
    console.log(stringOfScores);
    var pullScore2 = JSON.parse(stringOfScores)
    localStorage.setItem("stringOfScores", pullScore2);

  }

function gameOver() {
  header.innerHTML = "";
  section.innerHTML = "";
  section.textContent = "Game Over! Please save your initials"


  saveScore.textContent = "Save Your Score"
  viewScores.textContent = "View  Scores";
  newGame.textContent = "Play Again";
  section.appendChild(addScore);
  section.appendChild(saveScore);
  section.appendChild(viewScores);
  section.appendChild(newGame);
  count = 0;



  saveScore.addEventListener("click", function (event) {
    event.preventDefault();
  
    console.log(addScore.value);
    localStorage.setItem("initials", addScore.value);
    localStorage.setItem("viewScore", score);

  })


  newGame.addEventListener("click", function (event) {
    document.location.reload(true);
  })

  viewScores.addEventListener("click", function (event) {

    // We want it to retrieve the array and find high score
    //var HighestValue = Math.max(...arrayOfScores);
    alert("The high score is:  " + scoreArray);


  })

}
    


//quiz
function quizQuestionPrompt() {


  var quizQuestion = document.createElement("h4");            
  var quizAnswer = document.createElement("ul");
  var answer1 = document.createElement("button");
  var answer2 = document.createElement("button");
  var answer3 = document.createElement("button");
  var answer4 = document.createElement("button");

  quizQuestion.textContent = questions[i].q;
  answer1.textContent = questions[i].choices[0];
  answer2.textContent = questions[i].choices[1];
  answer3.textContent = questions[i].choices[2];
  answer4.textContent = questions[i].choices[3];

  section.appendChild(quizQuestion);
  section.appendChild(quizAnswer);
  quizAnswer.appendChild(answer1);
  quizAnswer.appendChild(answer2);
  quizAnswer.appendChild(answer3);
  quizAnswer.appendChild(answer4);

  quizAnswer.addEventListener("click", function (event) {
    //console.log(event.target);    to make sure correct event is targeted
    if (event.target.textContent === questions[i].a) {
      console.log("correct answer")
      score++;
      currentScore.textContent = score;

    } else {
      count -= 10;
      console.log("wrong answer");
    }

    i++;
    section.innerHTML = "";

    if (i > questions.length - 1) {

      gameOver()
    } else {
      quizQuestionPrompt();
    }

  });

}




//Timer
//Need to wipe out count after game is over
function countdownTimer() {
  var timerInterval = setInterval(function () {
    count--;
    console.log(count);
    if (count === 0 || count < 0) {
      clearInterval(timerInterval);
      count = 0;
    }
    timer.textContent = count;

  }, 1000);
}



//pulls high scores
init();

// Start button to start game
startButton.addEventListener("click", function () {
  header.innerHTML = ""            
  countdownTimer(); 
  quizQuestionPrompt();
  
  


});

