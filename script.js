var questionEl = document.querySelector('.question');
var questionH2 = questionEl.querySelector(':scope > h2');
var questionOl = document.querySelector('ol');
var questionP = document.querySelector('.intro-text');
var timerSpan = document.querySelector('.time')

// var demo = document.getElementById
var startButton = document.querySelector('#start');

startQuiz()

function startQuiz() {
    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        questionP.textContent = "";
        startButton.setAttribute(
            "style",
            "display: none;"
        )
        timer();
        newQuestion();
    });    
}

var questionCount = 0;
var userTotal = 0;
// var nextButton = document.createElement('button');
// nextButton.textContent = "Next Question";
// nextButton.setAttribute("style", "display: none;")

function newQuestion() {

    questionOl.textContent = ''; 
    var currentQuestion = allQuestions[questionCount];
    questionH2.textContent = currentQuestion.q;
    var answers = [currentQuestion.a1, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4];

    for (var i = 0; i < answers.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = answers[i];
        questionOl.appendChild(listItem);

        listItem.addEventListener('click', function(event) { 
            event.preventDefault();

            if (this.textContent === currentQuestion.correct) {
                console.log("Correct Answer");
                userTotal = userTotal + 10;
                console.log(userTotal)
            }

            if (questionCount > allQuestions.length - 1) {
                questionCount++;
                newQuestion();
            } else {
                console.log("Quiz complete")
            }
        });

    }

}

function timer() {
    var timeLeft = 10;

    timerSpan.textContent = timeLeft;
    // document.appendChild(timerSpan);

    var timeInterval = setInterval(function() {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        if (timeLeft === 0) {
            timerSpan.textContent = '0'
            clearInterval(timeInterval);
        }
    }, 1000);

}

var question1 = {
    q: "Commonly used data types DO NOT include:",
    a1: "strings",
    a2: "boolean",
    a3: "alerts",
    a4: "numbers",
    correct: "alerts",
}

var question2 = {
    q: "The condition in an if / else statement is enclosed within ___.",
    a1: "quotes",
    a2: "curly brackets",
    a3: "parentheses",
    a4: "square brackets",
    correct: "parentheses",
}

var question3 = {
    q: "Arrays in JavaScript can be used to store ___.",
    a1: "numbers and strings",
    a2: "other arrays",
    a3: "booleans",
    a4: "all of the above",
    correct: "all of the above",
}

var question4 = {
    q: "String values must be enclosed within ___ when being assigned to variables.",
    a1: "commas",
    a2: "curly brackets",
    a3: "quotes",
    a4: "parentheses",
    correct: "quotes",
}

var question5 = {
    q: "A very useful tool used during development and debugging for printing content to the debugger is ___.",
    a1: "JavaScript",
    a2: "terminal/bash",
    a3: "for loops",
    a4: "console log",
    correct: "console log",
}





var allQuestions = [question1, question2, question3];

