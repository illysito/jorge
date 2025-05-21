class Multiply {
  constructor(a, b, input, form, feedback) {
    this.A = a
    this.B = b
    this.INPUT = input
    this.FORM = form
    this.FEEDBACK = feedback

    this.successFeedback = [
      '¡Súuuuuper!',
      '¡Bien! El resultado es correcto :)',
      '¡Genial, sigue así!',
      '¡Claro que sí!',
    ]

    // genero 2 números aleatorios para operar
    this.prevA = 0
    this.prevB = 0
    this.a = 0
    this.b = 0
    this.targetResult = a + b
    this.inputResult = 0

    // valores de los contadores
    this.attemptCount = 0
    this.successCount = 0
    this.failCount = 0
    this.grade = 0

    // para el efecto reinicio
    this.interval = null
    this.time = 30
  }

  // genero la operación
  generateNumbers() {
    this.prevA = this.a
    this.prevB = this.b
    this.a = Math.floor(Math.random() * 31) - 15
    this.b = Math.floor(Math.random() * 31) - 15
    this.targetResult = this.a * this.b
  }

  // defino los posibles errores
  errors() {
    let expectedSign = Math.sign(this.targetResult)
    if (this.targetResult != this.inputResult) {
      this.FEEDBACK.textContent = 'Mmmmh, parece que te has equivocado...'
      if (Math.abs(this.inputResult) == Math.abs(this.targetResult)) {
        this.FEEDBACK.textContent =
          'Has multiplicado correctamente, pero te has equivocado en el signo. El resultado correcto es: ' +
          this.targetResult
      } else if (Math.sign(this.inputResult) == expectedSign) {
        'El signo es correcto, pero la te has equivocado en la multiplicación. El resultado correcto es: ' +
          this.targetResult
      }
    } else {
      this.FEEDBACK.textContent =
        this.successFeedback[Math.floor(Math.random() * 4)]
    }
  }

  // pongo los números en pantalla
  printNumbers() {
    this.A.textContent = this.a + '·'
    if (this.b >= 0) {
      this.B.textContent = this.b
    } else {
      this.B.textContent = '(' + this.b + ')'
    }
    this.INPUT.value = ''
  }

  printNumbersEffect() {
    let doneA = false
    let doneB = false

    if (this.interval) clearInterval(this.interval)

    this.interval = setInterval(() => {
      if (this.prevA < this.a) {
        this.prevA++
      } else if (this.prevA > this.a) {
        this.prevA--
      } else {
        doneA = true
      }

      if (this.prevB < this.b) {
        this.prevB++
      } else if (this.prevB > this.b) {
        this.prevB--
      } else {
        doneB = true
      }

      this.A.textContent = this.prevA + '·'
      if (this.prevB >= 0) {
        this.B.textContent = this.prevB
      } else {
        this.B.textContent = '(' + this.prevB + ')'
      }

      if (doneA && doneB) {
        clearInterval(this.interval)
        this.interval = null
      }
    }, this.time)
    this.INPUT.value = ''
  }

  // recojo el resultado & comparo el resultado introducido con el esperado
  fetchResult() {
    // input
    this.inputResult = parseInt(this.INPUT.value)

    // comparacion
    this.attemptCount++
    if (this.inputResult == this.targetResult) {
      this.successCount++
    } else {
      this.failCount++
    }
  }

  init() {
    this.generateNumbers()
    this.printNumbers()
  }

  restart() {
    this.errors()
    this.generateNumbers()
    this.printNumbersEffect()
  }

  // logica del ENTER y del SEND
  onEnter() {
    if (this.INPUT.value != '') {
      this.fetchResult()
      this.restart()
    } else {
      this.FEEDBACK.textContent = 'Ups! Debes introducir un valor.'
      return
    }
  }
  onSend() {
    if (this.INPUT.value == '') {
      this.FEEDBACK.textContent = 'Ups! Debes introducir un valor.'
      return
    }
    this.fetchResult()
    this.restart()
  }

  // get
  getPerformance() {
    this.grade = (10 * this.successCount) / this.attemptCount
    this.grade = Math.trunc(this.grade * 100) / 100
    return {
      attempts: this.attemptCount,
      success: this.successCount,
      fails: this.failCount,
      grade: this.grade,
    }
  }
}

export default Multiply
