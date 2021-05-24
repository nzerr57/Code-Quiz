//Global Variables
var sec = document.querySelector("section");
var footerBtns = document.querySelectorAll("footer .btn");
var stage = 0;
var h2El = document.querySelector('h2');

var time = 100;
var timer = document.querySelector("#timer");
var formEl = document.querySelector("form");
var inputEl = document.querySelector("input[type=text]")

var scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
var highScoreEl = document.querySelector("#highscore");

//Questions being used for quiz set up as an object
var questions = [{
    questText: "What heading tag will produce the biggest font size by default?",
    options: [{
        label: "h1",
        correct: true
    },
    {
        label: "h3",
        correct: false
    },
    {
        label: "h5",
        correct: false
    },
    {
        label: "h6",
        correct: false
    },
    ]
},
{
    questText: "Which of the following are used to store multiple values within a single variable?",
    options: [{
        label: "class",
        correct: false
    },
    {
        label: "array",
        correct: true
    },
    {
        label: "id",
        correct: false
    },
    {
        label: "condition",
        correct: false
    },
    ]
},
{
    questText: "What does HTML stand for?",
    options: [{
        label: "HyperText Marking Language",
        correct: false
    },
    {
        label: "Hyperlink To Markup Language",
        correct: false
    },
    {
        label: "HyperText Markup Language",
        correct: true
    },
    {
        label: "HomepageText Markup Language",
        correct: false
    },
    ]
},
{
    questText: "What symbol is commonly found in front of an id?",
    options: [{
        label: ".",
        correct: false
    },
    {
        label: "$",
        correct: false
    },
    {
        label: "@",
        correct: false
    },
    {
        label: "#",
        correct: true
    },
    ]
},
{
    questText: "What is the structure for writing a comment in HTML?",
    options: [{
        label: "<!--comment-->",
        correct: true
    },
    {
        label: "//comment",
        correct: false
    },
    {
        label: "/*comment*/",
        correct: false
    },
    {
        label: "-comment-",
        correct: false
    },
    ]
},
{
    questText: "In javascript, what is the 3-letter abbreviation for variable?",
    options: [{
        label: "vbl",
        correct: false
    },
    {
        label: "vrb",
        correct: false
    },
    {
        label: "var",
        correct: true
    },
    {
        label: "vrl",
        correct: false
    },
    ]
},
];

var question = questions[stage];

//Function to display questions on page
function renderQuestions() {
    h2El.textContent = question.questText;
    sec.innerHTML = "";
    for (var i = 0; i < question.options.length; i++) {
        var answer = question.options[i];
        var btnEl = document.createElement("button");
        btnEl.textContent = answer.label;
        btnEl.setAttribute("class", "btn");
        btnEl.setAttribute("data-index", i);
        sec.appendChild(btnEl);
    }
}

//Function to cycle through quiz questions
function advanceQuiz() {
    stage++;
    if (stage >= questions.length) {
        console.log("END GAME");
        sec.innerHTML = "";
        formEl.style.display = "block";
    } else {
        question = questions[stage];
        renderQuestions();
    }
}

//Function to show high scores
function renderHighscore() {
    var sortedByScore = scoreboard.sort(function (a, b) {
        console.log(a.score, b.score);
        return b.score - a.score;
    });
    for (var item of sortedByScore) {
        var liEl = document.createElement("li");
        liEl.textContent = item.initials + ": " + item.score;
        highScoreEl.appendChild(liEl);
    }
}

//Function to begin quiz
function startQuiz() {
    timer.textContent = time;
    var timerInterval = setInterval(function () {
        time--;
        timer.textContent = time;
    }, 1000);
    if (highScoreEl) {
        renderHighscore();
    } else {
        renderQuestions();
    }
}

if (sec && formEl) {
    sec.addEventListener("click", function (event) {
        var element = event.target;
        if (element.matches("button")) {
            var index = parseInt(element.dataset.index);
            if (question.options[index].correct) {
                element.classList.add("correct");
            } else {
                element.classList.add("incorrect");
            }
            advanceQuiz();
        }
    });

    formEl.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("SUBMIT");
        var initials = inputEl.value;
        var data = { initials: initials, score: time };
        console.log("SUBMIT", data);
        scoreboard = scoreboard.concat(data);
        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    });
}


startQuiz();