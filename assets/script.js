

//Global Variables
var startButton = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var emptyWord = document.querySelector(".empty-word");
var timerCount = 100;
var sec = document.querySelector("section")
var rightWrong = document.querySelector("#right-Wrong");
var optionsEl = document.querySelector("#options")
var activeQuestionNum = 0;
var stage = 0;
var selection = document.createElement("button");

var timer;
var timerCount;


//Questions being used for quiz set up as an object
var questions = [
    {
    questText: "What heading tag will produce the biggest font size by default?",
    options: ["h1", "h3", "h5", "h6"],
    answer: "h1"
    },
    {
    questText: "Which of the following are used to store multiple values within a single variable?",
    options: ["class", "array", "id", "condition"],
    answer: "array"
    },
    {
    questText: "What does HTML stand for?",
    options: ["HyperText Marking Language", "Hyperlink To Markup Language", "HyperText Markup Language", "HomepageText Markup Language"],
    answer: "HyperText Markup Language"
    },
    {
    questText: "What symbol is commonly found in front of an id to establish it as an id?",
    options: [".", "$", "@", "#"],
    answer: "#"
    },
    {
    questText: "What is the structure for writing a comment in HTML?",
    options: ["<!--comment-->", "//comment", "/*comment*/", "-comment-"],
    answer: "<!--comment-->"
    },
    {
    questText: "In javascript, what is the 3-letter abbreviation for variable?",
    options: ["vbl", "vrb", "var", "vrl"],
    answer: "var"
    },
    ];


//function to begin game once start button is clicked
function gameStart() {
    timer = setInterval(tick, 1000);
    timerEl.textContent = timerCount;

    renderQuestion();
}

function countDown() {
    timerCount--;
    timerEl.textContent = timerCount;

    if (time <= 0) {
        gameOver();
    }
}

function renderQuestion() {
    
    var activeQuestion = questions[activeQuestionNum];
    var questTextEl = document.getElementById("question-text");
    questTextEl.textContent = activeQuestion.questText;
    optionsEl.innerHTML = '';

    activeQuestion.options.forEach(funtion(option, i) {

        selection.setAttribute("class", "option");
        selection.setAttribute("value", option);

        selection.onclick = clickedSelection;
        optionsEl.appendChild(selection);
    });
}

function clickedSelection () {
    if(this.value !== questions[activeQuestionNum].answer) {
        time -= 10;

        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
    } else{
        rightWrong.text = "Correct";
    }
    activeQuestionNum++;
    if (activeQuestionNum === questions.length) {
        gameOver();
    } else {
        presentQuestion();
    }
}

function gameOver () {
    timerEl.textContent = "Game Over"

}

startButton.addEventListener("click", gameStart);











