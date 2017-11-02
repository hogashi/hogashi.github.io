// suna.js

const min = (a, b) => a < b ? a : b

class SunaArashi {
  constructor() {
    this.state = {
      windowWidth : window.innerWidth,
      windowHeight: window.innerHeight,
      sunaSize    : min(window.innerWidth, window.innerHeight) / 30,
      interval    : 10,
      timer       : null,
    }
    this.sunas = []
    this.updateStormInThis = this.updateStorm.bind(this)
    this._initSuna()
  }

  setState(state) {
    this.state = {...state}
  }

  _initSuna() {
    const { windowWidth, windowHeight, sunaSize } = this.state
    const body = document.querySelector('body')
    for(let i = 0; i < windowWidth * windowHeight / sunaSize; i += sunaSize) {
      const suna = document.createElement('div')
      suna.setAttribute('class', 'suna')
      suna.style.width = `${sunaSize}px`
      suna.style.height = `${sunaSize}px`
      suna.style.background = '#ccc'
      this.sunas.push(suna)
      body.appendChild(suna)
    }
  }

  toggleStorm() {
    if (this.state.isActive) {
      this.stopStorm()
    }
    else {
      this.startStorm()
    }
  }

  startStorm() {
    this.setState({
      timer   : setInterval(this.updateStormInThis, this.state.interval),
      isActive: true,
    })
  }

  updateStorm() {
    this.sunas.forEach(suna => {
      const color = parseInt(Math.random() * 255)
      suna.style.background = `rgb(${color}, ${color}, ${color})`
    })
  }

  stopStorm() {
    clearInterval(this.state.timer)
    this.setState({
      timer   : null,
      isActive: false,
    })
  }
}

sunaArashi = new SunaArashi()
document.querySelector('#button').addEventListener('click',
  sunaArashi.toggleStorm.bind(sunaArashi)
)
