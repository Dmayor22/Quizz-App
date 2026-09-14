// VARIABLES
const score = document.getElementById("score");
const question = document.getElementById("question");
const quizOptions = document.querySelectorAll(".quiz_options button");
const nextBtn = document.querySelector("#next_cta");
const timer = document.querySelector("#timer");

// DATA
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

// SCORE & QUESTION TRACKING
let userScore = 0;
let currentQuestion = 0;
const totalScore = studentQuestions.length;

// TIMER
let time = 30;
let timerInterval = null;

// UPDATE SCORE
function updateScore() {
  score.innerHTML = `Score: ${userScore} out of ${totalScore}`;
}

// START TIMER
function startTimer() {
  stopTime();

  // Reset time
  time = 30;
  timer.textContent = time;

  timerInterval = setInterval(() => {
    time--;

    timer.textContent = time;

    // Time is finished
    if (time <= 0) {
      stopTime();

      handleTimeUp();
    }
  }, 1000);
}

// STOP TIMER
function stopTime() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// HANDLE TIME UP
function handleTimeUp() {
  const currentQuiz = studentQuestions[currentQuestion];
  const correctAnswer = currentQuiz.correctOptions;

  // Disable all options
  quizOptions.forEach((option) => {
    option.disabled = true;

    // Show correct answer
    if (option.textContent.trim() === correctAnswer) {
      option.classList.add("correct");
    }
  });

  // Enable next button
  nextBtn.disabled = false;
}

// LOAD QUESTION
function loadQuestion() {
  const getQuestion = studentQuestions[currentQuestion];

  // Display question
  question.innerHTML = `${getQuestion.id}. ${getQuestion.questions}`;

  // Get options
  const getOptions = getQuestion.options;

  quizOptions.forEach((optbtn, i) => {
    optbtn.innerHTML = getOptions[i];

    // Remove previous styles
    optbtn.classList.remove("correct");
    optbtn.classList.remove("wrong");

    // Enable button
    optbtn.disabled = false;

    // Make sure button is visible
    optbtn.style.display = "block";
  });

  // Disable next button until answer/time-up
  nextBtn.disabled = true;

  // Start fresh timer
  startTimer();

  // Update score
  updateScore();
}

// HANDLE USER ANSWER
quizOptions.forEach((useropt) => {
  useropt.addEventListener("click", () => {
    const currentQuiz = studentQuestions[currentQuestion];

    const correctAnswer = currentQuiz.correctOptions;
    const selectedAnswer = useropt.textContent.trim();

    // Stop timer
    stopTime();

    // Prevent multiple answers
    quizOptions.forEach((option) => {
      option.disabled = true;
    });

    // Check answer
    if (selectedAnswer === correctAnswer) {
      useropt.classList.add("correct");

      userScore++;

      updateScore();
    } else {
      useropt.classList.add("wrong");

      // Show correct answer
      quizOptions.forEach((option) => {
        if (option.textContent.trim() === correctAnswer) {
          option.classList.add("correct");
        }
      });
    }

    // Enable Next button
    nextBtn.disabled = false;
  });
});

// NEXT QUESTION
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  // Check if there are more questions
  if (currentQuestion < studentQuestions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
});

// FINISH QUIZ
function finishQuiz() {
  // Stop timer
  stopTime();

  // Display completed message
  question.innerHTML = `Quiz Completed! 🎉`;

  // Display final score
  score.innerHTML = `Final Score: ${userScore} out of ${totalScore}`;

  // Hide options
  quizOptions.forEach((option) => {
    option.style.display = "none";
  });

  // Hide next button
  nextBtn.style.display = "none";

  // Display 0 or completed state on timer
  timer.textContent = "Done";

  if ((timer.textContent = "Done")) {
    timer.textContent = "Done";
    timer.style.padding = "25px";
    timer.style.backgroundColor = "green";
  }
}

// START QUIZ
loadQuestion();
