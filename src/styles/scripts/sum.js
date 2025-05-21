import gsap from 'gsap'

function sum() {
  // elementos del DOM
  const A = document.querySelector('.a')
  const B = document.querySelector('.b')
  const input = document.querySelector('input')
  const butt = document.querySelector('.submit_button')
  const stats = document.querySelectorAll('.stats-text')
  const form = document.querySelector('form')
  const feedbackP = document.querySelector('.feedback-p')
  const hearts = document.querySelectorAll('.heart')
  const heartArray = Array.from(hearts)

  // array de feedback correcto
  const successFeedback = [
    '¡Súuuuuper!',
    '¡Bien! El resultado es correcto :)',
    '¡Genial, sigue así!',
    '¡Claro que sí!',
  ]

  // prevengo enter de reenviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault() // stops the form from submitting
  })

  // genero 2 números aleatorios para operar
  let prevA = 0
  let prevB = 0
  let a = 0
  let b = 0
  let targetResult = a + b

  // errores
  let difference = 0
  let addition = 0

  // valores de los contadores
  let attemptCount = 0
  let successCount = 0
  let failCount = 0
  let grade = 0

  // genero la operación
  function generateNumbers() {
    prevA = a
    prevB = b
    a = Math.floor(Math.random() * 31) - 15
    b = Math.floor(Math.random() * 31) - 15
    targetResult = a + b
  }

  // defino los posibles errores
  function errors() {
    let absA = Math.abs(a)
    let absB = Math.abs(b)
    difference = Math.abs(absA - absB)
    addition = absA + absB
    console.log(a, b)
    console.log('diff: ' + difference)
    console.log('sum: ' + addition)
    let expectedSign = Math.sign(targetResult)
    // Si tienen el mismo signo, hay que SUMAR
    if (targetResult != inputResult) {
      feedbackP.textContent = 'Mmmmh, parece que te has equivocado...'
      animateHearts()
      if (Math.sign(a) == Math.sign(b)) {
        if (
          // Si el número introducido corresponde con la suma, pero el signo es diferente del esperado:
          Math.abs(inputResult) == addition &&
          Math.sign(inputResult) != expectedSign
        ) {
          feedbackP.textContent =
            '¡Has sumado correctamente los números, pero te has confundido con el signo! El resultado correcto es: ' +
            targetResult
        } else if (Math.abs(inputResult) == difference) {
          feedbackP.textContent =
            'Ups! Has restado, pero había que sumar. El resultado correcto es: ' +
            targetResult
        }
      } else if (Math.sign(a) != Math.sign(b)) {
        if (
          Math.abs(inputResult) == difference &&
          Math.sign(inputResult) != expectedSign
        ) {
          feedbackP.textContent =
            '¡Has restado correctamente los números, pero te has confundido con el signo! El resultado correcto es: ' +
            targetResult
        } else if (Math.abs(inputResult) == addition) {
          feedbackP.textContent =
            'Ups! Has sumado, pero había que restar. El resultado correcto es: ' +
            targetResult
        }
      }
    } else {
      feedbackP.textContent = successFeedback[Math.floor(Math.random() * 4)]
    }
  }

  // pongo los números en pantalla
  function printNumbers() {
    A.textContent = a
    if (b >= 0) {
      B.textContent = '+' + b
    } else {
      B.textContent = b
    }
    input.value = ''
  }

  let interval = null
  let time = 30
  function printNumbersEffect() {
    let doneA = false
    let doneB = false

    if (interval) clearInterval(interval)

    interval = setInterval(() => {
      if (prevA < a) {
        prevA++
      } else if (prevA > a) {
        prevA--
      } else {
        doneA = true
      }

      if (prevB < b) {
        prevB++
      } else if (prevB > b) {
        prevB--
      } else {
        doneB = true
      }

      A.textContent = prevA
      if (prevB >= 0) {
        B.textContent = '+' + prevB
      } else {
        B.textContent = prevB
      }

      if (doneA && doneB) {
        clearInterval(interval)
        interval = null
      }
    }, time)
    input.value = ''
  }

  // recojo el resultado & comparo el resultado introducido con el esperado
  let inputResult = 0
  function fetchResult() {
    // input
    inputResult = parseInt(input.value)

    // comparacion
    if (inputResult === targetResult) {
      // console.log('yeah! estás en lo cierto :)')
      successCount++
    } else {
      // console.log('ups! error :(')
      failCount++
    }
  }

  // cuento intentos, aciertos, resultados y nota media
  function countPerformance() {
    attemptCount++
    grade = (10 * successCount) / attemptCount
    grade = Math.trunc(grade * 100) / 100
    stats[0].textContent = 'Intentos: ' + attemptCount
    stats[1].textContent = 'Aciertos: ' + successCount
    stats[2].textContent = 'Errores: ' + failCount
    stats[4].textContent = grade + '/10'
  }

  // reinicio el rollo!
  function restart() {
    errors()
    generateNumbers()
    printNumbersEffect()
    console.log(targetResult)
  }

  // ejecución del código
  function init() {
    // errors()
    generateNumbers()
    printNumbers()
    fetchResult()
  }

  butt.addEventListener('click', () => {
    if (input.value == '') {
      feedbackP.textContent = 'Ups! Debes introducir un valor.'
      return
    }
    fetchResult()
    countPerformance()
    restart()
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value != '') {
      fetchResult()
      countPerformance()
      restart()
    }
  })

  // animations
  let currentHeartIndex = heartArray.length - 1
  function animateHearts() {
    gsap.to(heartArray[currentHeartIndex], {
      opacity: 0,
      duration: 0.8,
    })
    currentHeartIndex--
  }

  init()
}

export default sum
