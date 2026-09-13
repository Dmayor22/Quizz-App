// variables
const score = document.getElementById("score");
const question = document.getElementById("question");
const quizOptions = document.querySelectorAll(".quiz_options button");
const nextBtn = document.querySelector("#next_cta");
const timer = document.querySelector("#timer");

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
    correctOptions: "A",
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
  const getOptions = studentQuestions[currentQuestion].options;

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

  resetTime();
  updateTimer();
}
loadQuestion();

// set correct and wrong options

// get user clicked option
quizOptions.forEach((useropt) => {
  useropt.addEventListener("click", () => {
    const currentQuiz = studentQuestions[currentQuestion];
    const correctAnswer = currentQuiz.correctOptions;
    const selectedAnswer = useropt.textContent.trim();

    // PREVENT MULTIPLE ANSWERS
    // Disable all options after one click
    quizOptions.forEach((option) => {
      option.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
      useropt.classList.add("correct");
      userScore++;
      updateScore();
      stopTime();
    } else {
      useropt.classList.add("wrong");

      quizOptions.forEach((option) => {
        if (option.textContent.trim() === correctAnswer) {
          option.classList.add("correct");
        }
      });
      stopTime();
    }

    // Enable Next button
    nextBtn.disabled = false;
  });
});

// NEXT QUESTION
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  // Check if quiz is finished
  if (currentQuestion < studentQuestions.length) {
    loadQuestion();
  } else {
    // Quiz finished
    question.innerHTML = `
      Quiz Completed! 🎉
    `;

    score.innerHTML = `
      Final Score: ${userScore} out of ${totalScore}
    `;

    // Hide options
    quizOptions.forEach((option) => {
      option.style.display = "none";
    });

    // Hide next button
    nextBtn.style.display = "none";
  }

  updateTimer();
});

// START QUIZ

loadQuestion();

function updateTimer() {
  // set time
  let time = 30;
  setInterval(() => {
    if (time === 0) {
      stopTime();

      resetTime();
    } else {
      time -= 1;

      timer.textContent = time;
    }

    return time;
  }, 1000);
}

function resetTime() {
  const resetime = 30;
  timer.textContent = resetime;
}

function stopTime() {
  clearInterval();
}
