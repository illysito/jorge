function sum() {
  // elementos del DOM
  const A = document.querySelector('.a')
  const B = document.querySelector('.b')
  const input = document.querySelector('input')
  const butt = document.querySelector('.submit_button')
  const stats = document.querySelectorAll('.stats-text')
  const form = document.querySelector('form')

  // prevengo enter de reenviar el formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault() // stops the form from submitting
  })

  // genero 2 números aleatorios para operar
  let prevA = 0
  let prevB = 0
  console.log(prevB)
  let a = 0
  let b = 0
  let targetResult = a + b

  // valores de los contadores
  let attemptCount = 0
  let successCount = 0
  let failCount = 0
  let grade = 0

  function generateNumbers() {
    prevA = a
    console.log('prevA: ' + prevA)
    prevB = b
    console.log('prevB: ' + prevB)
    a = Math.floor(Math.random() * 31) - 15
    console.log('a: ' + a)
    b = Math.floor(Math.random() * 31) - 15
    console.log('b: ' + b)
    targetResult = a + b
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
    if (input.value === '') {
      console.log('no hay nada!')
      return
    }
    inputResult = parseInt(input.value)

    // comparacion
    if (inputResult === targetResult) {
      console.log('yeah! estás en lo cierto :)')
      successCount++
    } else {
      console.log('ups! error :(')
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
    generateNumbers()
    printNumbersEffect()
    console.log(targetResult)
  }

  // ejecución del código
  function init() {
    generateNumbers()
    printNumbers()
    fetchResult()
  }

  butt.addEventListener('click', () => {
    fetchResult()
    countPerformance()
    restart()
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      fetchResult()
      countPerformance()
      restart()
    }
  })

  init()
}

export default sum
