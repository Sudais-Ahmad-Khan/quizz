let outerModal = document.querySelector(".outerModal");
let btn = document.querySelector("#btn");
let cancel = document.querySelector("#cross");
let questionNo = document.getElementById("questionNo");
let question = document.getElementById("question");
let optionOne = document.getElementById("optionOne");
let optionTwo = document.getElementById("optionTwo");
let optionThree = document.getElementById("optionThree");
let optionFour = document.getElementById("optionFour");
let radios = document.querySelectorAll("input[type=radio]");
let Next = document.getElementById("next");
let backHome = document.getElementById("backHome");
let resultDialog = document.querySelector(".compelete");
let result = document.getElementById("result");

let score = 0;
let currentIndex = 0;

const quizData = [
    {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Digital Output Mechanism", "Document Oriented Model"],
        correct: "Document Object Model"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "int", "String", "function"],
        correct: "var"
    },
    {
        question: "Which of these is not a JavaScript data type?",
        options: ["Boolean", "Undefined", "Float", "Symbol"],
        correct: "Float"
    } 
];

//  Fill Question & Options
function loadQuestion() {
    let current = quizData[currentIndex];
    questionNo.textContent = `Q${currentIndex + 1}:`;
    question.textContent = current.question;

    optionOne.textContent = current.options[0];
    optionTwo.textContent = current.options[1];
    optionThree.textContent = current.options[2];
    optionFour.textContent = current.options[3];

    // reset radio buttons
    radios.forEach(r => r.checked = false);
}

//  Check Answer
function checkAnswer() {
    let selectedOption = null;
    radios.forEach((r, i) => {
        if (r.checked) {
            selectedOption = quizData[currentIndex].options[i];
        }
    });
    if (!selectedOption) return false; 
    if (selectedOption === quizData[currentIndex].correct) {
        score++;
    }
    return true;
}

//  Next Button
Next.addEventListener("click", function() {
    if (!checkAnswer()) return; 

    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        result.textContent = `You scored ${score} / ${quizData.length}`;
        resultDialog.classList.remove("hidden");
    }
});

//  Open modal
btn.addEventListener("click", function() {
    outerModal.classList.remove("hidden");
    resultDialog.classList.add("hidden");
    score = 0;
    currentIndex = 0;
    loadQuestion();
});

//  Close modal
function exit() {
    outerModal.classList.add("hidden");
    score = 0;
    currentIndex = 0;
}
cancel.addEventListener("click", exit);
backHome.addEventListener("click", exit);
outerModal.addEventListener("click", function(e) {
    if (!e.target.closest(".innerModal")) exit();
});
window.addEventListener("keydown", function(e){
    if (e.key === "Escape") exit();
});
