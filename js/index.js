import { BoxWorker, Transistion } from "./utils/Transistion.js"
// import {Tween} from "./utils/Tween.js"

// About them switching
const toggleButtons = [...document.querySelectorAll(".theme_toggle")]
const [moonUrl, sunUrl] = [ "/static/icons/moon.svg", "/static/icons/sun.svg"]

let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches ?? false;

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
const fadeContent = document.querySelector(".transistion_wrapper > .fade_content")
const canvasWrapper = document.querySelector(".transistion_wrapper")
const canvas = canvasWrapper ? canvasWrapper.children[0] : null     

if (canvas) {

    const context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
 

    function render() {
        BoxWorker.render(context, BoxWorker.boxes, width, height)
    }

    function completeTransistion() {
        canvasWrapper.style.opacity = 0
        fadeContent.style.opacity = 0
    }

    function fadein() {

        fadeContent.animate(
            [
                { opacity: 1}
            ], 
            {
                duration: 300,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        Transistion.showBoxes(
            BoxWorker.boxes,
            0.3, 
            render, 
            fadeOut
        );
    }

    function fadeOut() {
    
        fadeContent.animate(
            [
                { opacity: 0}
            ], 
            {
                delay: 1000,
                duration: 300,
                easing: "ease-in",
                fill: "forwards"
            }
        );

        setTimeout(() => {

        Transistion.hideBoxes(
            BoxWorker.boxes,
            0.2, 
            render, 
            completeTransistion
        );  
        }, 2000);
        
    }

    BoxWorker.boxes = BoxWorker.makeBoxes()
    
    fadein()

}


// About projects tab
const tableLinks = document.querySelectorAll(".table_list .table_nav")
const tableSections = document.querySelectorAll(".table_list .section")

if (tableLinks) {
    tableLinks.forEach(link => {
        link.addEventListener("click", e => {

            tableLinks.forEach(link => {
                link.classList.remove("active")
            })

            e.target.classList.add("active")
            
            const target = e.target.dataset.targetId;

            if (target == "all") {

                tableSections.forEach(section => {
                    section.style.display = "grid"
                });

            } else {
                
                tableSections.forEach(section => {
                    if (section.dataset.target == target) section.style.display = "grid";
                    else section.style.display = "none";
                })
                
            }
        })
    })
}