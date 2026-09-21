import Vec2 from "/js/utils/Vec2.js"

const canvas = document.getElementById("snake")
const ctx = canvas.getContext("2d")

const dpr = window.DevicePixelRatio || 1

let height = canvas.height = window.innerHeight * dpr
let width = canvas.width = window.innerWidth * dpr

canvas.style.height = window.innerHeight *10
canvas.style.width = window.innerWidth * 10

// Resize the window
window.addEventListener("resize", () => {
    height = canvas.height = window.innerHeight * dpr
    width = canvas.width = window.innerWidth * dpr 

    canvas.style.height = window.innerHeight
    canvas.style.width = window.innerWidth 
})

ctx.scale(dpr, dpr)



// About snake
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


// Random angle(x and y) for snake which determine the random Path
let angleX = Math.random() * Math.PI * 2 + 0.3, 
    angleY = Math.random() * Math.PI * 2 + 0.3; 
const speedX = Math.random() * .001 + 0.005,
    speedY = Math.random() * .001 + 0.015;

for (let i = 0; i < noSegments; i++) {
    snakeSegments.push(snakeSegmentTypes[randomSegment()]);
}

// About moving to where click is and State logic
let oldPos, startPos, targetPos;

let period = 0;

const STATE_MOVING_TO_CLICK = "moving_to_click",
    STATE_RETURNING_TO_PATH = "returning_to_path",
    STATE_ON_PATH = "on_path";

let currentPathState = STATE_ON_PATH;

// History buffer
const history = []


function drawSnake(ctx) {
 
    let x, y;

    if (currentPathState == STATE_ON_PATH) {
    // if (true) {

        // Calculate x and y from the angles
        x = Math.cos(angleX) * (width * 0.3);
        y = Math.sin(angleY) * (height * 0.3);
        
        oldPos= startPos = {x , y}
            
        // Increase x and y angles
        angleX += speedX;
        angleY += speedY;
    } else if (currentPathState == STATE_MOVING_TO_CLICK) {
        x = lerp(period, startPos.x, targetPos.x)
        y = lerp(period, startPos.y, targetPos.y)
        period += 0.01;

        if (period > 1) { 
            period = 0;

            currentPathState = STATE_RETURNING_TO_PATH
        }

    } else {
        x = lerp(period, targetPos.x, oldPos.x)
        y = lerp(period, targetPos.y, oldPos.y)
        period += 0.01;

        if (period > 1) { 
            period = 0;

            currentPathState = STATE_ON_PATH
        }
    }
        
    // Add to history, keep history length at bay
    history.unshift({x , y})

    if (history.length > snakeSegments.length * 5) { history.pop() }

    ctx.save()

    ctx.fillStyle = "hsl(0, 0%, 45%)"
    ctx.strokeStyle = "hsl(0, 0%, 85%)"
    ctx.lineWidth = 2
    
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
            ctx.arc(x - segment.radius2 / 2, y - segment.radius2 / 2, segment.radius2, 0, Math.PI * 2, false)
            ctx.stroke()
        }
        
    });
    
    ctx.restore()

}


requestAnimationFrame(animate);

let startTime = performance.now(),
    lastTimestamp;   // for calculation Delta time

function animate(currentTimestamp) {

    const delta = lastTimestamp ? currentTimestamp - lastTimestamp : 16

    lastTimestamp = currentTimestamp
    
    let elapsedTime = currentTimestamp - startTime; 
    
    ctx.clearRect(0, 0, width, height)
    
    drawSnake(ctx)
        
    requestAnimationFrame(animate)
}

// click Events
window.addEventListener("click", e => {

    snakeSegments.push(snakeSegmentTypes[randomSegment()]);

    currentPathState = STATE_MOVING_TO_CLICK
    startPos = {x: history[0].x, y: history[0].y}
    targetPos = {x: e.clientX - width * 0.5, y: e.clientY - height * 0.5}    
    period = 0
})

function lerp(norm, min, max) {
    return (max - min) * norm + min;
}

