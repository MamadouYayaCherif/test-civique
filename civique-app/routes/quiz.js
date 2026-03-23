const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/quiz", (req, res) => {
  db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 40", (err, results) => {
    if (err) throw err;
    res.render("quiz", { questions: results });
  });
});

/*router.post("/submit", (req, res) => {
  const answers = req.body;
  let score = 0;
  let total = Object.keys(answers).length;

  db.query("SELECT * FROM questions", (err, questions) => {
    questions.forEach(q => {
      if (answers["q" + q.id] && answers["q" + q.id] == q.answer) {
        score++;
      }
    });

    res.render("result", {
      score,
      total
    });
  });
});*/

router.post("/submit", (req, res) => {
  const answers = req.body; // toutes les réponses envoyées
  let score = 0;
  let total = Object.keys(answers).length;
  let wrongQuestions = []; // stocker questions ratées

  db.query("SELECT * FROM questions", (err, questions) => {
    if (err) throw err;

    questions.forEach(q => {
      const userAnswer = answers["q" + q.id];
      if (parseInt(userAnswer) === q.answer) {
        score++;
      } else if (userAnswer) {
        // question ratée → on garde info
        wrongQuestions.push({
          question: q.question,
          userAnswer: q["choice" + userAnswer],
          correctAnswer: q["choice" + q.answer]
        });
      }
    });

    res.render("result", {
      score,
      total,
      wrongQuestions
    });
  });
});

module.exports = router;