//Global variables
var count = 50;
var score = 0;
var i = 0;

var arrayOfScores;


//Selecting DOM elments
var startButton = document.querySelector("#startbutton");
var timer = document.querySelector("#timer");
var header = document.querySelector("header");
var main = document.querySelector("main");
var scoreEl = document.querySelector("#scoreid");
var inputText = document.createElement("input");
var inputButton = document.createElement("button");
var viewHighScore = document.createElement("button");
var playAgain = document.createElement("button");



//Questions in an array of objects
var questions = [
  {
    q: "Inside which HTML element do we put the JavaScript?",
    lista: ["<javascript>", "<script>", "<js>", "<scripting>"],
    a: "<script>"
  },
  {
    q: "Which of the following object is the main entry point to all client-side JavaScript features and APIs? color?",
    lista: ["position", "window", "standard", "location"],
    a: "window"
  },
  {
    q: "Which of the following can be used to call a JavaScript Code Snippet?",
    lista: ["function", "preprocessor", "triggeringevent", "rmi"],
    a: "function"
  },
  {
    q: "Which of the following scoping type does JavaScript use?",
    lista: ["sequential", "segmental", "lexical", "literal"],
    a: "lexical"
  },
  {
    q: "What is the result of console.log(p)?",
    lista: ["valueNotfound", "referenceError", "null", "zero"],
    a: "referenceError"
  },
  {
    q: "Which of the following is not a framework?",
    lista: ["JavaScript.NET", "JavaScript", "CocoaJS", "jQuery"],
    a: "JavaScript"
  },
  {
    q: "Which acronym stands for HyperText Markup language  ",
    lista: ["HTML", "JavaScript", "CocoaJS", "Span"],
    a: "HTML"
  },
  {
    q: "Which of the following is the source of a img html code",
    lista: ["alt", "src", "a", "width"],
    a: "src"
  },
]


function init() {
  var getScore = JSON.parse(localStorage.getItem("highScore"));
  console.log(getScore);

  if (!getScore) {
    arrayOfScores = []
  } else {
    arrayOfScores = getScore
  }
  var stringedArray = JSON.stringify(arrayOfScores)
  console.log(stringedArray);
  var retrievehighS = JSON.parse(stringedArray)
  localStorage.setItem("stringedArray", retrievehighS);
  // when we save a game:
  // get the score 
  // add score to score to arrayOfScores
  // stringify and put into local storage 

}




function endGame() {
  header.innerHTML = "";
  main.innerHTML = "";
  main.textContent = "Game Over! Please save your intials"
  count = 0;

  //Assigning values to buttons at end
  inputButton.textContent = "Save"
  viewHighScore.textContent = "View High Score";
  playAgain.textContent = "Play Again";
  main.appendChild(inputText);
  main.appendChild(inputButton);
  main.appendChild(viewHighScore)
  main.appendChild(playAgain);



  inputButton.addEventListener("click", function (event) {
    event.preventDefault();
    //retrieve what is input text
    console.log(inputText.value);
    //highScoreArray.push(inputText.value);
    localStorage.setItem("initals", inputText.value);
    localStorage.setItem("highScore", score);


  })

  playAgain.addEventListener("click", function (event) {
    document.location.reload(true);
  })

  viewHighScore.addEventListener("click", function (event) {

    // We want it to retrieve the array and find high score
    //var HighestValue = Math.max(...arrayOfScores);
    alert("The high score is:  " + arrayOfScores);


  })

}


//function that asks questions[i]
function askingQuestionX() {

  //creating elements to later append

  var questionText = document.createElement("h4");
  var answerTextUl = document.createElement("ul");
  var answerTextLi1 = document.createElement("button");
  var answerTextLi2 = document.createElement("button");
  var answerTextLi3 = document.createElement("button");
  var answerTextLi4 = document.createElement("button");

  questionText.textContent = questions[i].q;
  answerTextLi1.textContent = questions[i].lista[0];
  answerTextLi2.textContent = questions[i].lista[1];
  answerTextLi3.textContent = questions[i].lista[2];
  answerTextLi4.textContent = questions[i].lista[3];

  main.appendChild(questionText);
  main.appendChild(answerTextUl);
  answerTextUl.appendChild(answerTextLi1);
  answerTextUl.appendChild(answerTextLi2);
  answerTextUl.appendChild(answerTextLi3);
  answerTextUl.appendChild(answerTextLi4);

  answerTextUl.addEventListener("click", function (event) {
    //console.log(event.target);    to make sure correct event is targeted
    if (event.target.textContent === questions[i].a) {
      console.log("correct answer")
      score++;
      scoreEl.textContent = score;

    } else {
      count -= 10;
      console.log("wrong answer");
    }

    i++;
    main.innerHTML = "";

    if (i > questions.length - 1) {

      endGame()
    } else {
      askingQuestionX();
    }

  });

}



init();

//Timer intervals & Updateing the count on page
function setTime() {
  var timerInterval = setInterval(function () {
    count--;
    console.log(count);
    if (count === 0 || count < 0) {
      clearInterval(timerInterval);
      count = 0;
      endGame();
    }
    timer.textContent = count;

  }, 1000);
}



// Start Button that initiates everything

startButton.addEventListener("click", function () {
  header.innerHTML = ""             //important to clear, 
  setTime(); //a timer starts 
  askingQuestionX();
  //retrieveHighScore() ; //Not pushing to the array


});