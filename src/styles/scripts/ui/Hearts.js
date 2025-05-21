import gsap from 'gsap'

class Heart {
  constructor(hearts) {
    this.hearts = hearts
    this.currentHeartIndex = this.hearts.length - 1
  }

  // animacion
  animate() {
    gsap.to(this.hearts[this.currentHeartIndex], {
      opacity: 0,
      duration: 0.8,
    })
    this.currentHeartIndex--
  }
}

export default Heart
