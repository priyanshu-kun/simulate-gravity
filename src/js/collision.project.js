/**
 * Partilces creating steps
 * 1: create particles on screen randomely
 * 2: make sure particles dont spawn top of each other
 */


import {
    randomIntFromRange, 
    randomColor, 
    distance 
   } from "./utils";
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
   x: innerWidth/2,
   y: innerHeight/2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener("mousemove",(e) => {
   mouse.x = e.clientX
   mouse.y = e.clientY
})

addEventListener('resize',() => {
   canvas.width = innerWidth
   canvas.height = innerHeight
   init()
})

function getDistance(x1,y1,x2,y2) {
   let xDistance = x2 - x1 
   let yDistance = y2 - y1
   return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2))
}

// class for create circles
class Particles {
   constructor(x,y,radius,color) {
       this.x = x 
       this.y = y
       this.radius = radius
       this.color = color
   }

   draw() {
       c.beginPath()
       c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
       c.strokeStyle = this.color
       c.stroke()
       c.closePath()
   }
   update() {
       this.draw()
       // here update circle properties
   }
}

// implementation 
let particles 
function init() {
    particles = []
   for (let i = 0; i < 5; i++) {
       // push objects
       const radius = 100
       let x = randomIntFromRange(radius,canvas.width-radius)
       let y = randomIntFromRange(radius,canvas.height-radius)
       const color = "hotpink"
       if(i !== 0) {
           for(let j = 0; j < particles.length; j++) {
               if(getDistance(x,y,particles[j].x,particles[j].y) - radius*2 < 0) {
                 x = randomIntFromRange(radius,canvas.width-radius)
                 y = randomIntFromRange(radius,canvas.height-radius)
                 j = -1;
               }
           }
       }
       particles.push(new Particles(x,y,radius,color))
   }
 
}

// Animation loop 
function animate() {
   requestAnimationFrame(animate)
   c.clearRect(0,0,canvas.width,canvas.height)
  particles.forEach(p => {
    p.update()
  })
   // console.log(c1.radius + c2.radius)
   // c.fillText("CANVAS BOLIERPLATE",mouse.x,mouse.y)
   // objects.forEach(o => {
   //     o.update()
   // })
}


init()
animate()