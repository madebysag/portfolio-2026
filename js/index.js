import { Transistion } from "./utils/Transist.js"
import {Tween} from "./utils/Tween.js"

// Grab Elements
const canvasWrapper = document.querySelector(".transistion_wrapper")
const canvas = canvasWrapper.children[0]

const toggleButtons = [...document.querySelectorAll(".theme_toggle")]
const [moonUrl, sunUrl] = [ "./static/icons/moon.svg", "./static/icons/sun.svg"]

// About them switching
let isDarkMode = window.matchMedia("(prefers-colo-scheme: dark)").matches ?? false;

const changeTheme = () => {
    document.documentElement.classList.toggle("dark-theme")

    isDarkMode = document.documentElement.classList.contains("dark-theme") ? true : false

    toggleButtons.forEach(btn => {
        btn.children[0].src = isDarkMode ? sunUrl : moonUrl
    })
}

toggleButtons.forEach(btn => {
    btn.addEventListener("click", changeTheme)
})



// about transisiton
const context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;


class BoxWorker {
    static makeBoxes() {
        const boxes = []

        const width = window.innerWidth
        const height = window.innerHeight

        const size = width > 600 ? 50 : 25;
        
        const cols = Math.ceil(width / size);
        const rows = Math.ceil(height / size);
        const cells = rows * cols;

        for (let i = 0; i < cells; i++) {
            const x = (i % cols) * size,
                y = Math.floor(i / cols) * size,
                speed = Math.floor(Math.random() * 5 + 1);

            const box = { size, x, y, speed, alpha: 0}
            
            boxes.push(box)
        }

        return boxes;
    }

    static render(ctx, boxes) {
        ctx.clearRect(0, 0, width, height);
        boxes.forEach(box => {
            ctx.save()

            ctx.globalAlpha = box.alpha;
            ctx.fillRect(box.x, box.y, box.size, box.size)

            ctx.restore()
        })
    }
}

BoxWorker.boxes = BoxWorker.makeBoxes()

function render() {
    BoxWorker.render(context, BoxWorker.boxes)
}
function test (){
    context.save()
    context.globalAlpha = -4
    context.moveTo(0, 0)
    context.fillStyle = "blue"
    context.fillRect(50, 50, 100, 100)
    context.restore()
}

Transistion.showBoxes(
    BoxWorker.boxes,
    1, 
    render, 
    goBack // test //render
);

function goBack() {

    setTimeout(() => {
      Transistion.hideBoxes(
        BoxWorker.boxes,
        1, 
        render, 
        test //render
    );  
    }, 5000);
    
}