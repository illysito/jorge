import gsap from 'gsap'

class Menu {
  constructor(menu) {
    this.menu = menu
  }

  chooseMode() {
    gsap.to(this.menu, {
      opacity: 0,
      zIndex: -1,
      duration: 0.4,
    })
  }
}

export default Menu
