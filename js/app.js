// variables
const score = document.getElementById("score");
const question = document.getElementById("question");
const quizOptions = document.querySelectorAll(".quiz_options button");
const nextBtn = document.querySelector("#next_cta");

// data
const studentQuestions = [
  {
    id: 1,
    questions: "What is Your Name?",
    options: ["A", "B", "C", "D"],
    correctOptions: "A",
  },
  {
    id: 2,
    questions: "What is Your Naccccme?",
    options: ["A", "B", "C", "D"],
  },
];

// set score
let userScore = 0;
let currentQuestion = 0;
const totalScore = studentQuestions.length;

// add score to display for user
function updateScore() {
  score.innerHTML = `Score: ${userScore} out of ${totalScore}`;
}

// get and set question to UI
function loadQuestion() {
  // get current question
  const getQuestion = studentQuestions[currentQuestion];

  // Display question
  question.innerHTML = `${getQuestion.id}. ${getQuestion.questions}`;

  // get and set options to UI
  const questionOptions = studentQuestions.map((quesOpt) => {
    return quesOpt.options;
  });

  const getOptions = questionOptions[currentQuestion];

  quizOptions.forEach((optbtn, i) => {
    optbtn.innerHTML = getOptions[i];

    // Remove previous styles and enable btn
    optbtn.classList.remove("correct");
    optbtn.classList.remove("wrong");
    optbtn.disabled = false;
    optbtn.style.display = "block";
  });

  // Hide next button until an answer is selected
  nextBtn.disabled = true;

  updateScore();
}
loadQuestion();

// set correct and wrong options
const correctOpt = studentQuestions.map((answer) => {
  return answer.correctOptions;
});

const correctAnswer = correctOpt[currentQuestion];

// get user clicked option
quizOptions.forEach((useropt) => {
  useropt.addEventListener("click", () => {
    const currentQuiz = studentQuestions[currentQuestion];
    const correctAnswer = currentQuiz.correctOptions;
    const selectedAnswer = useropt.textContent.trim();


    
    if (correctAnswer === useropt.textContent) {
      useropt.classList.toggle("correct");

      updateScore();
    } else {
      useropt.classList.toggle("wrong");
      useropt.classList.toggle("correct");
    }
  });
});
