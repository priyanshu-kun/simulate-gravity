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
class Circle {
    constructor(x,y,radius,color) {
        this.x = x 
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    update() {
        this.draw()
        // here update circle properties
    }
}

// implementation 
// let objects 
let c1,c2
function init() {
    // objects = []
    // for (let i = 0; i < 400; i++) {
    //     // push objects
    // }
    c1 = new Circle(canvas.width/2,canvas.height/2,100,"black")
    c2 = new Circle(undefined,undefined,60,"hotpink")
}

// Animation loop 
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    c1.update()
    c2.x = mouse.x
    c2.y = mouse.y
    c2.update()
    // console.log(getDistance(c1.x,c1.y,c2.x,c2.y))
    if(getDistance(c1.x,c1.y,c2.x,c2.y) < c1.radius + c2.radius) {
        c1.color = "hotpink"
        c2.color = "black"
    }
    else {
        c1.color = "black"
        c2.color = "hotpink"
    }
    // console.log(c1.radius + c2.radius)
    // c.fillText("CANVAS BOLIERPLATE",mouse.x,mouse.y)
    // objects.forEach(o => {
    //     o.update()
    // })
}


init()
animate()