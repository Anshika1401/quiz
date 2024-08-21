document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const startButton = document.querySelector(".start");
    const nextButton = document.querySelector(".next-btn");
    const questionText = document.querySelector(".question-text");
    const optionList = document.querySelectorAll(".option");
    const totalQuestionText = document.querySelector(".question-total");
    const headerScore = document.querySelector(".header-score");
    const feedbackBox = document.querySelector(".feedback");
    const restartButton = document.querySelector(".restart-btn");

    let currentQuestionIndex = 0;
    let score = 0;
    const userAnswers = [];

    const quizData = [
        { question: "What does HTML stand for?", options: ["Hyper type makeup language", "Hyper type multiple language", "Hypertext Markup Language", "Home text multi language"], answer: 2 },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Central Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"], answer: 0 },
        { question: "What year was JavaScript created?", options: ["1996", "1995", "1994", "None of the above"], answer: 1 },
        { question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "Mozilla"], answer: 0 },
        { question: "Which is not a JavaScript data type?", options: ["Undefined", "Number", "Boolean", "Float"], answer: 3 }
    ];

    function displaySection(target) {
        sections.forEach(section => {
            section.classList.toggle("active", section.id === target);
        });
    }

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionList.forEach((option, index) => {
            option.textContent = `${String.fromCharCode(97 + index)}) ${currentQuestion.options[index]}`;
            option.classList.remove("selected");
            option.dataset.index = index;
        });
        totalQuestionText.textContent = `${currentQuestionIndex + 1} of ${quizData.length} Questions`;
        feedbackBox.textContent = '';
    }

    function resetOptions() {
        optionList.forEach(option => {
            option.classList.remove("selected");
        });
    }

    function handleOptionClick(e) {
        const selectedOption = e.target;
        if (selectedOption.classList.contains("option")) {
            resetOptions();
            selectedOption.classList.add("selected");
        }
    }

    function checkAnswer() {
        const selectedOption = document.querySelector(".option.selected");
        if (selectedOption) {
            const selectedAnswer = parseInt(selectedOption.dataset.index);
            const correctAnswer = quizData[currentQuestionIndex].answer;

            userAnswers[currentQuestionIndex] = selectedAnswer; // Save user answer

            if (selectedAnswer === correctAnswer) {
                score++;
                feedbackBox.textContent = 'Correct!';
            } else {
                feedbackBox.textContent = `Wrong. The correct answer was: ${String.fromCharCode(97 + correctAnswer)}) ${quizData[currentQuestionIndex].options[correctAnswer]}`;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                displaySection("results");
                headerScore.textContent = `Your score: ${score} out of ${quizData.length}`;
                displayFeedback();
            }
        }
    }

    function displayFeedback() {
        feedbackBox.innerHTML = quizData.map((question, index) => {
            const userAnswer = userAnswers[index];
            const selectedAnswer = userAnswer !== undefined ? String.fromCharCode(97 + userAnswer) + ') ' + question.options[userAnswer] : 'None';
            const correctAnswer = question.answer;

            return `<p>${question.question}<br>Selected: ${selectedAnswer}<br>Correct: ${String.fromCharCode(97 + correctAnswer)}) ${question.options[correctAnswer]}</p>`;
        }).join('');
    }

    if (startButton) {
        startButton.addEventListener("click", () => {
            displaySection("quiz");
            loadQuestion();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = e.target.getAttribute("data-target");
            displaySection(target);
        });
    });

    optionList.forEach(option => {
        option.addEventListener("click", handleOptionClick);
    });

    if (nextButton) {
        nextButton.addEventListener("click", checkAnswer);
    }

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            currentQuestionIndex = 0;
            score = 0;
            userAnswers.length = 0; // Clear user answers
            displaySection("home");
        });
    }

    displaySection("home");
});
