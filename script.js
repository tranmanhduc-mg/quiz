const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }else{
      button.dataset.wrong = answer.wrong
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    
    element.classList.add('wrong')
  } 

}



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  
}

const questions = [
  {
    question: 'Ai là ca sĩ?',
    answers: [
      { text: 'A. Minh Hằng', correct: true },
      { text: 'B. Minh Béo', correct: false },
      { text: 'C. Minh Nhí', correct: false },
      { text: 'D. Minh Mo', correct: false }

    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'A. Web Dev Simplified', correct: false },
      { text: 'B. Traversy Media', correct: false },
      { text: 'C. Dev Ed', correct: true },
      { text: 'D. Fun Fun Function', correct: false}
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'Vạn lý trường thành nằm ở đâu?',
    answers: [
      { text: 'A. Nhật Bản', correct: false },
      { text: 'B. Trung Quốc', correct: true },
      { text: 'C. Hàn Quốc', correct:false},
      { text: 'D. Ấn Độ', correct:false}
    ]
  },
  {
    question: 'Ai là the best?',
    answers: [
      { text: 'A. CM Punk', correct: true },
      { text: 'B. John Cena', correct: false },
      { text: 'C. Roman Reigns' , correct: false},
      { text: 'D. Dean Ambrose' , correct:false}
    ]
  }
]