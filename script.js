let score = 0;
let currentQuestion = 0;
let timeLeft = 15;
let timer;

const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyper Transfer Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["CSS", "Java", "Python", "C++"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to websites?",
        options: ["Java", "JavaScript", "C", "Python"],
        answer: "JavaScript"
    },
    {
        question: "Which tag is used for images in HTML?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: "<img>"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Apple", "Netscape", "Google"],
        answer: "Netscape"
    }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressText = document.getElementById("progressText");
const restartBtn = document.getElementById("restartBtn");

function startTimer() {
    clearInterval(timer);

    timeLeft = 15;
    timerEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    const current = quizData[currentQuestion];

    progressText.textContent =
        `Question ${currentQuestion + 1} of ${quizData.length}`;

    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;

        btn.addEventListener("click", () => {
            checkAnswer(option);
        });

        optionsEl.appendChild(btn);
    });

    startTimer();
}

function checkAnswer(selectedAnswer) {
    clearInterval(timer);

    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
        resultEl.textContent = "✅ Correct!";
    } else {
        resultEl.textContent =
            `❌ Wrong! Correct Answer: ${correctAnswer}`;
    }

    scoreEl.textContent = score;

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionEl.textContent = "Quiz Finished! 🎉";

    let percentage = (score / quizData.length) * 100;

    optionsEl.innerHTML = "";

    resultEl.innerHTML =
        `Final Score: ${score}/${quizData.length}<br>
         Percentage: ${percentage}%`;

    restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;

    scoreEl.textContent = score;
    resultEl.textContent = "";
    restartBtn.style.display = "none";

    loadQuestion();
});

loadQuestion();