const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const startHeader = document.getElementById("start-header");
const startParagraph = document.getElementById("start-paragraph");
const startUl = document.getElementById("start-ul");
const startParagraph2 = document.getElementById("start-paragraph2");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");

  startHeader.classList.add("hide");
  startParagraph.classList.add("hide");
  startUl.classList.add("hide");
  startParagraph2.classList.add("hide");

  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "When did Ireland witness the widespread introduction of electricity?",
    answers: [
      { text: "A) 1866", correct: false },
      { text: "B) 1920s", correct: true },
      { text: "C) 1957", correct: false },
      { text: "D) 1991", correct: false },
    ],
  },
  {
    question:
      "Which milestone marked Ireland's first connection to the internet?",
    answers: [
      { text: "A) Transatlantic Cable Message", correct: false },
      { text: "B) Arrival of smartphones", correct: false },
      { text: "C) First official computer acquisition", correct: false },
      { text: "D) Trinity College's internet connection", correct: true },
    ],
  },
  {
    question:
      "What was the primary reason for the attraction of Foreign Direct Investment (FDI) to Ireland?",
    answers: [
      { text: "A) Presence of multinational tech companies", correct: true },
      { text: "B) Widespread adoption of internet", correct: false },
      { text: "C) Introduction of household appliances", correct: false },
      { text: "D) Emergence of smartphones", correct: false },
    ],
  },
  {
    question:
      "Which decade saw the widespread adoption of smartphones in Ireland?",
    answers: [
      { text: "A) 1866", correct: false },
      { text: "B) 1920s", correct: false },
      { text: "C) 1991", correct: false },
      { text: "D) 2010s", correct: true },
    ],
  },
  {
    question: "Which city in Ireland emerged as a leading European tech hub?",
    answers: [
      { text: "A) Cork", correct: false },
      { text: "B) Galway", correct: false },
      { text: "C) Limerick", correct: false },
      { text: "D) Dublin", correct: true },
    ],
  },
];
