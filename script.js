// Dom Elements
const startScreen = document.getElementById('start-screen');
const questionsScreen = document.getElementById('questions-screen');
const resultScreen = document.getElementById('result-screen');

const startQuizBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question-text');
const currentQuestionSpan = document.getElementById('curren-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentScoreSpan = document.getElementById('current-score');
const choicesContainer = document.getElementById('choices-container');
const progressElement = document.getElementById('progress');

const scoreResultSpan = document.getElementById('score-result');
const maxScoreSpan = document.getElementById('max-score');
const resultMessagePara = document.getElementById('result-message');
const restartQuizBtn = document.getElementById('restart-btn');

const quizQuestions = [
    {
        question: "What is the capital of France?",
        choices: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ]
  },
  {
    question: "Which contnent is Egypt locate in",
        choices: [
          { text: "Africa", correct: true },
          { text: "Europe", correct: false },
          { text: "Australlia", correct: false },
          { text: "Asia", correct: false },
        ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    choices: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

let currentQuestionIndex = 0;
let currentScore = 0;
let disabledSelect = false
const maxScore = quizQuestions.length;


function activateScreen(screen){
    
        // startScreen.classList.remove('active');
        // questionsScreen.classList.remove('active');
        // resultScreen.classList.remove('active');
        [...document.getElementsByClassName('screen')].forEach(scr => {
            scr.classList.remove('active')
        })
  
    screen.classList.add('active')
}

startQuizBtn.addEventListener('click',showQuiz)

// Show the quiz Screen
function showQuiz(){
    // check which Screen to show
    if(currentQuestionIndex < quizQuestions.length) activateScreen(questionsScreen);
    else{
        activateScreen(resultScreen);
        showQuizResult()
        return 
    } 

    disabledSelect = false

    // Show the Question Info => Question Content , Current Number Question , Current Score
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    currentScoreSpan.textContent = currentScore;

    // show progress percentage
    const progPercen =  (currentQuestionIndex / quizQuestions.length ) * 100
    progressElement.style.width = progPercen + '%';

    // Show The choices
    choicesContainer.innerHTML = ''
    currentQuestion.choices.forEach(choice => {
        choicesContainer.innerHTML += `
            <button onclick='selectChoice(event)' data-correct=${choice.correct}>${choice.text}</button>
        `
    })
}

// When Select a Choice
function selectChoice(event){
    // prevent more one click at the same question
    if(disabledSelect){
        return ;
    }
    disabledSelect = true;

    currentQuestionIndex++;
    currentScore++;

    // Check Correct Answer
   document.querySelector(`button[data-correct='true']`).classList.add('correct');
   if(event.target.dataset.correct === 'false') {
    event.target.classList.add('incorrect');
    currentScore--;
   }

    // Show the next Question after 1 second 
    setTimeout(_ => showQuiz() , 1000)
}

// Show the Result of the Quiz
function showQuizResult(){
    // Get the Score Percentage
    const scorePercentage = (currentScore / maxScore) * 100;

    // Show the Result Meassage depend on Score
    if(scorePercentage === 100) resultMessagePara.textContent = "Perfect! You're a genius!";
    else if(scorePercentage >= 85) resultMessagePara.textContent = "Great job! You know your stuff!";
    else if(scorePercentage >= 60) resultMessagePara.textContent = "Good effort! Keep learning!";
    else if(scorePercentage >= 35) resultMessagePara.textContent = "Not bad! Try again to improve!";
    else  resultMessagePara.textContent = "Keep studying! You'll get better!";
    scoreResultSpan.textContent = currentScore;
} 

// When a Restart Button clicked to repeat the quiz
restartQuizBtn.addEventListener('click', _ => {
    currentQuestionIndex = 0 ; 
    currentScore = 0;
    showQuiz();
})