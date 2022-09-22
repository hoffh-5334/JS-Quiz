
//Global variables
var count = 60;
var score = 0;
var i = 0;
var sampleArray = [4, 5 , 1 ,9 ,8]

//Selecting DOM elements
var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var header = document.querySelector("header");
var main = document.querySelector("main");
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
q: "What does JS stand for?",
choices: ["Just Sayin", "Jelly Sandwich", "JavaScript", "Jam Session"],
a: "JavaScript"
},
{
q: "What does JS stand for?",
choices: ["Just Sayin", "JavaScript", "Jelly Sandwich", "Jam Session"],
a: "JavaScript"
},

{
q: "What does JS stand for?",
choices: ["Just Sayin", "Jelly Sandwich", "Jam Session", "JavaScript"],
a: "JavaScript"
},

]



function gameOver() {
  header.innerHTML = "";
  main.innerHTML = "";
  main.textContent = "Game Over! Please save your initials"
  saveScore.textContent = "Save Your Score"
  viewScores.textContent = "View  Scores";
  newGame.textContent = "Play Again";
  main.appendChild(addScore);
  main.appendChild(saveScore);
  main.appendChild(viewScores)
  main.appendChild(newGame);


  saveScore.addEventListener("click", function (event) {
    event.preventDefault();
  
    console.log(addScore.value);
    // savedHighScore.set(addScore.value);
    localStorage.setItem("initials", addScore.value);
    localStorage.setItem("highScore", score);

    //Retrieve high score from local memory and push into array

    
    var finalScore = {
      initials: addScore.value,
      score: score
    };
    var savedHighScore = localStorage.getItem("highScore");
    //   console.log(finalScore);
    if (savedHighScore === null) {
      savedHighScore = []
    } else {
      savedHighScore = JSON.parse(savedHighScore)
    }
    var emptyArray = [];
    emptyArray.push(finalScore);
    console.log(emptyArray);

    //savedHighScore.push(finalScore);
    console.log(savedHighScore);
  })

  newGame.addEventListener("click", function(event){
    document.location.reload(true);
  })

  viewScores.addEventListener("click", function(event){

    // need to actually create high score array instead of SampleArray
    var topScore = Math.max(savedHighScore);
    console.log(sampleArray);
    console.log(indexOfHighestValue);
    alert("The high score is:  " + topScore);


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

  main.appendChild(quizQuestion);
  main.appendChild(quizAnswer);
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
    main.innerHTML = "";

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



// Start button to start game

startButton.addEventListener("click", function () {
  header.innerHTML = ""            
  countdownTimer(); 
  quizQuestionPrompt();
  


});



