
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the sum of 2 + 2?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "4"
    },
    {
        question: "Who wrote the play “Romeo and Juliet”?",
        options: ["William", "Jane Austen", "Charles Dick", "Mark Twain"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "CH4"],
        correctAnswer: "H2O"
    },
    {
        question: "Which planet is known as the “Red Planet”?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the square root of 16?",
        options: ["4", "2", "8", "16"],
        correctAnswer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Jupiter", "Neptune", "Mars"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Who is known as the “Father of Computer Science”?",
        options: ["Charles Babbage", "Alan Turing", "John von", "Ada Lovelace"],
        correctAnswer: "Alan Turing"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic"],
        correctAnswer: "Mitochondria"
    },
    {
        question: "Humans and chimpanzees share roughly how much DNA?",
        options: ["98%", "85%", "92%", "76%"],
        correctAnswer: "98%"
    }
];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const currentQuizQuestion = questions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;
    optionsElement.innerHTML = '';
    currentQuizQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => {
            checkAnswer(option === currentQuizQuestion.correctAnswer);
        });
        optionsElement.appendChild(button);
    });
}
function checkAnswer(correct) {
    const currentQuizQuestion = questions[currentQuestion];
    const correctSound = document.getElementById('correctSound');
    const wrongSound = document.getElementById('wrongSound');

    if (correct) {
        score++;
        resultElement.textContent = 'Correct!';
        resultElement.classList.add('correct-answer');
        correctSound.play();
    } else {
        resultElement.innerHTML = `Wrong! The correct answer is: <strong>${currentQuizQuestion.correctAnswer}</strong>`;
        resultElement.classList.add('wrong-answer');
        wrongSound.play();
    }
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
        resultElement.classList.remove('correct-answer', 'wrong-answer');
    }, 2000); // 2 seconds delay
}

function showScore() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    submitButton.style.display = 'none';
    if (score < 5) {
        resultElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
        resultElement.innerHTML += `<button id="retry">Retry</button>`;
        const retryButton = document.getElementById('retry');
        retryButton.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            loadQuestion();
            resultElement.innerHTML = '';
            submitButton.style.display = 'block';
        });
    } else {
        resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
    }
}
submitButton.addEventListener('click', loadQuestion);

loadQuestion();
