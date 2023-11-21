var questionEl = document.querySelector('.question');
var questionH2 = questionEl.querySelector(':scope > h2');
var questionOl = document.querySelector('ol');
var questionP = document.querySelector('p');


var startButton = document.querySelector('#start');

startQuiz()

var questionCount = 0;

function startQuiz() {
    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        questionP.textContent = "";
        startButton.setAttribute(
            "style",
            "display: none;"
        )
        newQuestion();
    });    
}

function newQuestion() {

    questionOl.innerHTML = '';
    var currentQuestion = allQuestions[questionCount];
    questionH2.textContent = currentQuestion.q;
    var answers = [currentQuestion.a1, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4];

    for (var i = 0; i < answers.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = answers[i];
        questionOl.appendChild(listItem);
    }

    var nextButton = document.createElement('button');
    questionEl.appendChild(nextButton);
    nextButton.addEventListener('click', function(event) { 
        event.preventDefault();
        questionCount++;
        newQuestion();

    });
}

var question1 = {
    q: "What is jquery?",
    a1: "Answer 1",
    a2: "Answer 2",
    a3: "Answer 3",
    a4: "Answer 4",
}

var question2 = {
    q: "What is php?",
    a1: "New Answer 1",
    a2: "New Answer 2",
    a3: "New Answer 3",
    a4: "New Answer 4",
}

var allQuestions = [question1, question2];



    // questionH2.textContent = question1.q;

    // questionOl.appendChild(li1);
    // questionOl.appendChild(li2);
    // questionOl.appendChild(li3);
    // questionOl.appendChild(li4);
    // li1.textContent = question1.a1;
    // li2.textContent = "Question 2";
    // li3.textContent = "Question 3";
    // li4.textContent = "Question 4";
