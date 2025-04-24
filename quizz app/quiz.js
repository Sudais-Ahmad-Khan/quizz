let outerModal = document.querySelector(".outerModal");
let innerModal = document.querySelector(".innerModal");
let btn = document.querySelector("#btn");
let cancel = document.querySelector("#cross");
let questionNo = document.getElementById("questionNo");
let question = document.getElementById("question");
let optionOne = document.getElementById("optionOne");
let optionTwo = document.getElementById("optionTwo");
let optionThree = document.getElementById("optionThree");
let optionFour = document.getElementById("optionFour");
let Next = document.getElementById("next");
let backHome = document.getElementById("backHome");
let circles = document.querySelectorAll(".circle");
let selected = document.querySelector(".selected");
let resultDialog = document.querySelector(".compelete");
let result = document.getElementById("result");
let score = 0;
let currentIndex = 0;
let clicked = false;
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
function input (){
    questionNo.textContent = `Qno #: ${currentIndex + 1}`;
    question.textContent = quizData[currentIndex].question;
    optionOne.textContent = quizData[currentIndex].options[0];
    optionTwo.textContent = quizData[currentIndex].options[1];
    optionThree.textContent = quizData[currentIndex].options[2];
    optionFour.textContent = quizData[currentIndex].options[3];
    result.textContent = `You Have Scored ${score} Marks`;
    clicked = false;
}
function selectOption(){
    circles.forEach(function(option){
        option.addEventListener("click", function(){
            if(clicked){
                return;
            }
            circles.forEach(e => e.classList.remove("selected", "bg-body"));
            option.classList.add("selected", "bg-body");
            if(option.nextElementSibling.textContent == quizData[currentIndex].correct){
                score++;
                console.log(score);
            }
            clicked = true;
        });
    });
}
function nextQues(){
    window.addEventListener("keydown", function(e){
        if(e.key= "Enter"){
            clicked = false;
        let selected = document.querySelector(".selected");
        if(!selected){
            return;
        }
        if(currentIndex < quizData.length - 1){
            currentIndex++;
        }else {
            resultDialog.classList.remove("hidden");
        }
        input();
        circles.forEach(e => e.classList.remove("selected", "bg-body"));
        }
    });
    Next.addEventListener("click", function(){
        clicked = false;
        let selected = document.querySelector(".selected");
        if(!selected){
            return;
        }
        if(currentIndex < quizData.length - 1){
            currentIndex++;
        }else {
            resultDialog.classList.remove("hidden");
        }
        input();
        circles.forEach(e => e.classList.remove("selected", "bg-body"));
    });
}
function exit(){
    outerModal.classList.add("hidden")
    currentIndex = 0;
    clicked = false;
    score = 0;
    circles.forEach(e => e.classList.remove("selected", "bg-body"));
}
// opening modal
    selectOption();
    btn.addEventListener("click", function(){
    outerModal.classList.remove("hidden");
    resultDialog.classList.add("hidden");
    currentIndex = 0; 
    score = 0;
    clicked = false;
    input();
    nextQues();
});
outerModal.addEventListener("click", function(e){
    if(!e.target.closest(".innerModal")){
        exit();
    }
});
backHome.addEventListener("click", function(){
    exit();
});
window.addEventListener("keydown", function(e){
    if(e.key==`Escape`){
        exit();
    }
});
cancel.addEventListener("click", function(){
    exit();
});