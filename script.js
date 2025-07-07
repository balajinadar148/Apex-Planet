// Quiz Logic
const questions = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Syntax",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What is the correct HTML tag for inserting a line break?",
        options: ["<lb>", "<br>", "<break>", "<line>"],
        answer: "<br>"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const resultText = document.getElementById("resultText");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    selectedOption = null;
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => {
            document.querySelectorAll("#optionsContainer button").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOption = option;
        };
        optionsContainer.appendChild(btn);
    });
}

nextBtn.addEventListener("click", () => {
    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionText.style.display = "none";
        optionsContainer.style.display = "none";
        nextBtn.style.display = "none";
        resultText.textContent = `Quiz completed! Your score: ${score} / ${questions.length}`;
    }
});

// Initialize quiz
loadQuestion();

// Joke API Logic
document.getElementById("jokeBtn").addEventListener("click", async () => {
    const jokeText = document.getElementById("jokeText");
    jokeText.textContent = "Loading...";
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
        const data = await response.json();
        jokeText.textContent = data.joke || "Couldn't fetch a joke!";
    } catch (error) {
        jokeText.textContent = "Error fetching joke.";
    }
});
