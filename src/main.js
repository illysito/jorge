import Add from './styles/scripts/math/Add'
import Multiply from './styles/scripts/math/Multiply'
import Heart from './styles/scripts/ui/Hearts'
import Menu from './styles/scripts/ui/Menu'
import Stats from './styles/scripts/ui/Stats'
// import sum from './styles/scripts/sum'

import './styles/style.css'

// DOM ELEMENTS
let gameElements = {
  A: document.querySelector('.a'),
  B: document.querySelector('.b'),
  input: document.querySelector('input'),
  butt: document.querySelector('.submit_button'),
  form: document.querySelector('form'),
  feedbackP: document.querySelector('.feedback-p'),
}

let heartElements = {
  hearts: document.querySelectorAll('.heart'),
}

let menuElements = {
  menu: document.querySelector('.menu'),
  modeButtons: document.querySelectorAll('.game_button'),
}

let statsElements = {
  stats: document.querySelectorAll('.stats-text'),
  stats_section: document.querySelector('.stats-overlay'),
}

// sum()

// object declaration
let menu = new Menu(menuElements.menu)
let sum = new Add(
  gameElements.A,
  gameElements.B,
  gameElements.input,
  gameElements.form,
  gameElements.feedbackP
)
let product = new Multiply(
  gameElements.A,
  gameElements.B,
  gameElements.input,
  gameElements.form,
  gameElements.feedbackP
)
let hearts = new Heart(heartElements.hearts)
let stats = new Stats(statsElements.stats, statsElements.stats_section)

// global variables
let gameFlags = {
  sum: false,
  product: false,
}
let failCount = 0
let previousFailCount = 0
let attemptCount = 0
let successCount = 0
let grade = 0

// global functions
function checkFails() {
  if (failCount != previousFailCount) {
    hearts.animate()
  }
  previousFailCount = failCount
  console.log(failCount)
  if (failCount == 5) {
    stats.viewStats()
  }
}

// event listeners
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    // IF SUM
    if (gameFlags.sum) {
      sum.onEnter()
      attemptCount = sum.getPerformance().attempts
      successCount = sum.getPerformance().success
      failCount = sum.getPerformance().fails
      grade = sum.getPerformance().grade
      stats.printStats(attemptCount, successCount, failCount, grade)
      checkFails()
    }

    // IF PRODUCT
    if (gameFlags.product) {
      product.onEnter()
      attemptCount = product.getPerformance().attempts
      successCount = product.getPerformance().success
      failCount = product.getPerformance().fails
      grade = product.getPerformance().grade
      stats.printStats(attemptCount, successCount, failCount, grade)
      checkFails()
    }
  }
})

gameElements.butt.addEventListener('click', () => {
  // IF SUM
  if (gameFlags.sum) {
    sum.onSend()
    failCount = product.getPerformance().fails
  }

  // IF PRODUCT
  if (gameFlags.product) {
    product.onSend()
    failCount = product.getPerformance().fails
  }
})

menuElements.modeButtons.forEach((b) => {
  b.addEventListener('click', (e) => {
    const button = e.currentTarget
    if (button.classList.contains('is--sum')) {
      gameFlags.product = false
      gameFlags.sum = true
    } else if (button.classList.contains('is--product')) {
      gameFlags.sum = false
      gameFlags.product = true
    }
    menu.chooseMode()
    init()
  })
})

function init() {
  if (gameFlags.sum) {
    sum.init()
  } else if (gameFlags.product) {
    product.init()
  }
}
