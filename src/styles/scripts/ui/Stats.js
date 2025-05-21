import gsap from 'gsap'

class Stats {
  constructor(stats, stats_section) {
    this.stats = stats
    this.stats_section = stats_section
  }

  printStats(attemptCount, successCount, failCount, grade) {
    this.stats[0].textContent = 'Intentos: ' + attemptCount
    this.stats[1].textContent = 'Aciertos: ' + successCount
    this.stats[2].textContent = 'Errores: ' + failCount
    this.stats[4].textContent = grade + '/10'
  }

  viewStats() {
    gsap.to(this.stats_section, {
      opacity: 1,
      zIndex: 1,
      duration: 0.4,
    })
  }
}

export default Stats
