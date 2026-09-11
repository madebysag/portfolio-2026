import Vec2 from "/js/utils/Vec2.js"

const canvas = document.getElementById("snake")
const ctx = canvas.getContext("2d")

let height = canvas.height = window.innerHeight
let width = canvas.width = window.innerWidth

// window.addEventListener("resize", () => {
//     height = canvas.height = window.innerHeight
//     width = canvas.width = window.innerWidth 
// })

// About snake
const snake = {
    x: 0,
    y: 0,
    radius: 10,
    angle: 0
}

const snakeSegmentTypes = [
    {
        radius: 10,
        fill: true,
        radius2: false
    },
    {
        radius: 10,
        fill: false,
        radius2: false
    },
    {
        radius: 20,
        fill: true,
        radius2: false
    },
    {
        radius: 20,
        fill: false,
        radius2: false
    },
    {
        radius: 10,
        fill: true,
        radius2: 20
    }
]

const snakeSegments = [];
const randomSegment = () => Math.floor(Math.random() * snakeSegmentTypes.length);
let noSegments = 20

let angleX = Math.random() * Math.PI * 2 + 0.3, 
    angleY = Math.random() * Math.PI * 2 + 0.3; 
const speedX = Math.random() * .001 + 0.005,
    speedY = Math.random() * .001 + 0.015;

for (let i = 0; i < noSegments; i++) {
    snakeSegments.push(snakeSegmentTypes[randomSegment()]);
}

// History buffer
const history = []

function drawSnake(ctx) {

    ctx.save()
    
    ctx.fillStyle = "hsl(0, 0%, 45%)"
    ctx.strokeStyle = "hsl(0, 0%, 85%)"
    ctx.lineWidth = 2

    let x = Math.cos(angleX) * (width * 0.3),
        y = Math.sin(angleY) * (height * 0.3);
    
    angleX += speedX;
    angleY += speedY;

    history.unshift(new Vec2(x , y))

    if (history.length > snakeSegments.length * 5) { history.pop()}

    ctx.translate(width * 0.5, height * 0.5)

    snakeSegments.forEach((segment, segmentIndex) => {

        const historyIndex = Math.round(segmentIndex * 3);
        
        [x, y] = history[historyIndex] ? [history[historyIndex].x, history[historyIndex].y] : [x, y]

        
        ctx.beginPath()
        ctx.arc(x -segment.radius / 2, y - segment.radius / 2, segment.radius, 0, Math.PI * 2, false)

        if (segment.fill) ctx.fill()
            else ctx.stroke()
        
        if (segment.radius2){
            ctx.beginPath()
            ctx.arc(x -segment.radius2 / 2, y - segment.radius2 / 2, segment.radius2, 0, Math.PI * 2, false)
            ctx.stroke()
        }
        
    });
    

    ctx.restore()

    // console.log(x, y);
    
}


requestAnimationFrame(animate);

let startTime = performance.now(),
    lastTimestamp;   // for calculation Delta time

function animate(currentTimestamp) {

    const delta = lastTimestamp ? currentTimestamp - lastTimestamp : 16

    lastTimestamp = currentTimestamp
    
    let elapsedTime = currentTimestamp - startTime; 
    
    ctx.clearRect(0, 0, width, height)
    
    
    // ctx.translate(width * 0.5, height * 0.5)
    drawSnake(ctx)
        
    // snake.y = snake.x += delta * 0.1
    requestAnimationFrame(animate)
}



