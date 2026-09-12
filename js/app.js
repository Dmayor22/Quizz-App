// variables
const score = document.getElementById("score");
const question = document.getElementById("question");
const quizOptions = document.querySelector(".quiz_options");
const nextBtn = document.querySelector(".next_cta");

// set score
const userScore = 0;
const totalScore = 100;

// add score to display for user
score.innerHTML = `Score: ${userScore} out of ${totalScore}`;
