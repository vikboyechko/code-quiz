// Declare all html elements and counters globally
var questionEl = document.querySelector('.question');
var questionH2 = questionEl.querySelector(':scope > h2');
var questionOl = document.querySelector('#questionOl');
var questionP = document.querySelector('.intro-text');
var timerSpan = document.querySelector('.time');
var startButton = document.querySelector('#start');
var form = document.querySelector('.form');
var submit = document.querySelector("#submit")
var goHome = document.querySelector('#goback');
var highscores = document.querySelector('#highscores');
var highscoresAfterGame = document.querySelector('#highscores-aftergame');
var viewHighScores = document.querySelector(".view-highscores");
var viewHighScoresButton = document.querySelector("#showscore");
var clearScoresButton = document.querySelector("#clearscores");
var questionCount = 0;
var userTotal = 0;
var timeLeft;
var timeInterval;

form.style.display = "none";
clearScoresButton.style.display = "none";
viewHighScoresButton.style.display = "none";
highscoresAfterGame.style.display = "none";
goHome.style.display = "none";
viewHighScores.addEventListener("click", showScores); // the button at the top of the home
viewHighScoresButton.addEventListener("click", showScores); // the button at the end of the quiz

// Global 'Go Home' button rather than call functions within functions
goHome.addEventListener('click', function(event) {
    location.reload();
})

function startQuiz() {
    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        questionP.textContent = "";
        startButton.setAttribute(
            "style",
            "display: none;"
        ); // using setAttribute instead of style.display just for practice
        timer(); // start timer
        newQuestion(); // start the questions function
    });    
}
startQuiz()

function newQuestion() {
    clearScoresButton.style.display = "none";
    questionOl.textContent = '';
    questionP.textContent = ''; 
    var currentQuestion = allQuestions[questionCount]; // [questionCount] is the index
    questionH2.textContent = currentQuestion.q; // sets each object question into the H2 element
    var answers = [currentQuestion.a1, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4]; // depends on objects having only 4 answers, but could add more later

    // For loop to get object answer, create LI element, and append to the parent OL
    for (var i = 0; i < answers.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = answers[i];
        questionOl.appendChild(listItem);

        // handle the answer select via cursor
        listItem.addEventListener('click', function(event) { 
            event.preventDefault();

            // my favorite lesson from this project is using 'this.textContent' to grab whatever the cursor clicks
            if (this.textContent === currentQuestion.correct) {
                userTotal += 10;
                timeLeft += 10;
                questionP.textContent = "Correct!"; 
            }

            if (this.textContent !== currentQuestion.correct) {
                userTotal -= 10;
                timeLeft -= 10;
                questionP.textContent = "Wrong!"
            }

            // waits 1 second to show correct/wrong message, and then grabs the next question and answer object
            if (questionCount < allQuestions.length - 1) {
                questionCount++;
                setTimeout(function() {
                    newQuestion();
                }, 1000);
            } else {
                setTimeout(function() {
                    clearInterval(timeInterval);
                    questionH2.textContent = "All done!";
                    var timeTally = timeLeft > 0 ? timeLeft : 0;
                    userTotal = userTotal + timeTally;
                    questionP.textContent = "Your final score is " + userTotal + ".";
                    questionOl.style.display = "none";
                    form.style.display = "block"; // show the initials form
                    submitScore(); // calls the 
                }, 1000); // time delay so the final question/answer will also show correct/wrong message
                }
            });
    }
    highscoresAfterGame.textContent = '';
}

function submitScore() {
    submit.addEventListener("click", function(event) {
        event.preventDefault();

        // html form input is set to max 3 characters
        var initials = document.querySelector("#initials").value.toUpperCase().trim();
        if (!initials) {
            alert("Please enter your initials!");
            return;
        }

        var newScore = {
            initials: initials,
            score: userTotal,
        };

        var storedScores = JSON.parse(localStorage.getItem("userScore") || "[]"); // first gets the local storage array for userScore. If none exist, creates array.
        storedScores.push(newScore); // adds the new score to the array
        localStorage.setItem("userScore", JSON.stringify(storedScores)); // stringifies for the local storage
        form.style.display = "none";
        questionP.textContent = "Thanks for playing! Click below to see how you did compared to others."; 
        viewHighScoresButton.style.display = "block"; // Showing button instead of default showing high scores to prevent cache and display issues
        goHome.style.display = "block";
    });
}

function showScores() {
    questionOl.innerHTML = "";
    questionH2.textContent = "High Scores";
    form.style.display = "none";
    questionP.textContent = "";
    highscores.textContent = ""; // Clear existing scores first
    highscoresAfterGame.textContent = "";
    highscoresAfterGame.style.display = "block";

    var storedScores = JSON.parse(localStorage.getItem("userScore") || "[]"); // Get scores from localStorage

    storedScores.sort(function(a,b) {
        return b.score - a.score;
    }); // sorts the scores

    if (storedScores.length > 0) {
        // Add each score to a list
        for (var i = 0; i < storedScores.length; i++) {
            
            var scoreItem = document.createElement("li");
            scoreItem.textContent = storedScores[i].initials + " - " + storedScores[i].score;
            highscores.appendChild(scoreItem);
            highscoresAfterGame.appendChild(scoreItem);
        }
        clearScoresButton.style.display = "block"; // show clear score button here
    } else {
        highscoresAfterGame.textContent = "No high scores yet.";
    }
    viewHighScoresButton.style.display = "none";
    startButton.style.display = "none";
    questionP.style.display = "none";
    goHome.style.display = "block"; // using the Go Home button rather than a restart quiz button to prevent display and cache issues
}

// global event listener for the clear scores button, but showing/hiding via style.display
clearScoresButton.addEventListener("click", function() {
    localStorage.removeItem("userScore");
    location.reload();
})

function timer() {
    timeLeft = 60;
    timerSpan.textContent = timeLeft; // show the time left on the page

    timeInterval = setInterval(function() {
        timeLeft--;
        timerSpan.textContent = timeLeft;

        // handles what to do when time is up mid-game
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerSpan.textContent = '0';
            questionH2.textContent = "Time's up!";
            questionOl.style.display = "none";
            clearScoresButton.style.display = "none";
            form.style.display = "block";
            submitScore();
            goHome.style.display = "block";
            
        }
    }, 1000);
}

// All the question objects below
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

var allQuestions = [question1, question2, question3, question4, question5]; // array for all the questions

