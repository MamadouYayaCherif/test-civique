// Timer global examen : 40 minutes
let totalTime = 40 * 60; // 40 minutes
function updateGlobalTimer() {
  let min = Math.floor(totalTime / 60);
  let sec = totalTime % 60;
  document.getElementById("globalTimer").innerText = min + ":" + (sec < 10 ? "0" : "") + sec;
  if (totalTime <= 0) {
    alert("Temps écoulé !");
    document.getElementById("quizForm").submit();
  }
  totalTime--;
}
setInterval(updateGlobalTimer, 1000);

// Gestion des questions
const questions = document.querySelectorAll(".question-box");
const submitBtn = document.getElementById("submitBtn");
const progressBar = document.getElementById("progress");
const questionTimerDisplay = document.getElementById("questionTimer");

let current = 0;
let questionTime = 30; // secondes par question
let remainingTime = questionTime;
let questionInterval;

// Affiche la question courante
function showQuestion(index) {
  questions.forEach((q, i) => {
    q.style.display = (i === index ? "block" : "none");
    q.style.opacity = (i === index ? 1 : 0);
  });

  // Réinitialiser le timer de la question
  remainingTime = questionTime;
  questionTimerDisplay.innerText = remainingTime + "s";
  clearInterval(questionInterval);
  questionInterval = setInterval(updateQuestionTimer, 1000);
}

// Timer par question
function updateQuestionTimer() {
  remainingTime--;
  questionTimerDisplay.innerText = remainingTime + "s";
  if (remainingTime <= 0) {
    clearInterval(questionInterval);
    nextQuestion(); // passe automatiquement
  }
}

// Passe à la question suivante
function nextQuestion() {
  const qBox = questions[current];
  const selected = qBox.querySelector("input[type=radio]:checked");
  // Si pas de réponse, on continue quand même
  current++;
  let progressPercent = Math.round((current / questions.length) * 100);
  progressBar.style.width = progressPercent + "%";

  if (current < questions.length) {
    showQuestion(current);
  } else {
    submitBtn.style.display = "block";
    progressBar.style.width = "100%";
  }
}

// Bouton “Suivant”
questions.forEach((qBox, index) => {
  const nextBtn = qBox.querySelector(".next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(questionInterval); // stop timer question
      const selected = qBox.querySelector("input[type=radio]:checked");
      if (!selected) {
        alert("Veuillez sélectionner une réponse avant de continuer !");
        return;
      }
      nextQuestion();
    });
  }
});

// Initialiser la première question
showQuestion(current);