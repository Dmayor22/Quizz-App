// variables
const score = document.getElementById("score");
const question = document.getElementById("question");
const quizOptions = document.querySelectorAll(".quiz_options button");
const nextBtn = document.querySelector(".next_cta");

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
const userScore = 0;
const totalScore = studentQuestions.length;

// add score to display for user
score.innerHTML = `Score: ${userScore} out of ${totalScore}`;

// get and set question to UI
const currentQuestion = 0;
const getQuestion = studentQuestions[currentQuestion];
question.innerHTML = `${getQuestion.id}. ${getQuestion.questions}`;

// get and set options to UI
const questionOptions = studentQuestions.map((quesOpt) => {
  return quesOpt.options;
});

const getOptions = questionOptions[currentQuestion];

quizOptions.forEach((optbtn, i) => {
  optbtn.innerHTML = getOptions[i];
});

// set correct and wrong options
const correctOpt = studentQuestions.map((answer) => {
  return answer.correctOptions;
});

const correctAnswer = correctOpt[currentQuestion];

// get user clicked option
const userOption = quizOptions.forEach((useropt) => {
  useropt.addEventListener("click", () => {
    if (correctAnswer === useropt.textContent) {
      useropt.classList.toggle("correct");


      
    } else {
      useropt.classList.toggle("wrong");
    }
  });
});
