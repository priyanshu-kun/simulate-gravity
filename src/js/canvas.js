// import { util } from 'prettier'
import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let friction = 0.9
let gravity = 0.6

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y,dx,dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if(this.y+this.radius+this.dy > canvas.height) {
      this.dy = -this.dy * friction
    }
    else {
      this.dy += gravity
    }    

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx
    }

    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let balls;
function init() {
  balls = []
  for (let i = 0; i < 10; i++) {
    const randomRad = utils.randomIntFromRange(10,30)
    const randomIntx = utils.randomIntFromRange(randomRad,canvas.width-randomRad)
    const randomInty = utils.randomIntFromRange(0,canvas.height-randomRad)
    const dx = utils.randomIntFromRange(-2,2)
    const dy = utils.randomIntFromRange(-1,1)
    balls.push(new Ball(randomIntx,randomInty,dx,dy,randomRad,utils.randomColor(colors)))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  balls.forEach(ball => ball.update())
}

init()
animate()
