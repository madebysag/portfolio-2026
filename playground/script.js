const landingPage = document.querySelector(".landing_page")
const displayPage = document.querySelector(".demos_display")
const demosLinks = document.querySelectorAll("main a.demos_link")

const displayContainer = displayPage.querySelector(".display_wrapper")
const backToMenuBtn = displayPage.querySelector(".page_nav button")
const displayTitle = displayPage.querySelector("header h4.text-black")
const displayArticle = displayPage.querySelector("section.article")

const fullscreenBtn = displayPage.querySelector(".fullscreen_toggle")
const loadingSpinner = displayPage.querySelector(".loading")
const iFrame = displayPage.querySelector("iframe")

function showDemo(link) {
    landingPage.hidden = true;
    displayPage.hidden = false;
    loadingSpinner.hidden = false;

    displayTitle.innerHTML = link ? link.innerText : "";
    displayArticle.innerHTML = (link && link.children[0]) ? link.children[0].innerHTML : "";
    
    iFrame.src = link.href;
    iFrame.onload = () => {
        loadingSpinner.hidden = true;
    };
}

function hideDemo() {
    landingPage.hidden = false;
    displayPage.hidden = true;
}

function toggleFullscreen(element) {

    if (!displayContainer.hasAttribute("data-pos")) {

        const domRect = displayContainer.getBoundingClientRect()        

        document.querySelector("body").style.overflow = "hidden" // prevent scrolling

        element.children[0].innerHTML = `<use href="/static/icons/fullscreen.svg#mini"> </use>`
    
    
        displayContainer.animate(
            [
                {
                    top: "0px", 
                    left: "0px", 
                    width: "100vw", 
                    maxWidth: "stretch", 
                    height: "100vh", 
                    backdropFilter: "blur(10px)", 
                    offset: 0.99
                },
                {
                    top: "0px", 
                    left: "0px", 
                    width: "100vw", 
                    maxWidth: "stretch", 
                    height: "100vh", 
                    backdropFilter: "blur(10px)", 
                    position: "fixed",
                    margin: "0px",
                    offset: 1
                }
            ],
            {
                duration: 300,
                easing: "ease-in",
                fill: "forwards"
            }
        )

        // Save last position
        displayContainer.setAttribute("data-pos", JSON.stringify(domRect))
        
    } else {
        
        // Retrieve last position
        const domRect = JSON.parse(displayContainer.getAttribute("data-pos"))

        document.querySelector("body").style.overflow = "auto" 

        element.children[0].innerHTML = `<use href="/static/icons/fullscreen.svg#full"> </use>`;
    
        displayContainer.animate(
            [
                {
                    top: domRect.top + "px", 
                    left: domRect.left + "px", 
                    width: domRect.width + "px", 
                    height: domRect.height + "px", 
                    backdropFilter: "none",
                    offset: 0.99
                },
                {
                    top: "0px", 
                    left: "0px", 
                    width: "80vw", 
                    height: "80vh", 
                    backdropFilter: "none",
                    margin: "3rem 10vw 0rem",
                    maxWidth: "80vw",
                    position: "relative",
                    offset: 1
                }
            ],
            {
                duration: 300,
                easing: "ease-in",
                fill: "forwards"
            }
        )

        // Remove saved position
        displayContainer.removeAttribute("data-pos")        
    }
    
    // displayContainer.classList.add("active")
    
    // console.log(domRect)
    // console.log({x : e.clientX, y: e.clientY})
    
}

demosLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()

        showDemo(e.currentTarget)
    })
})

backToMenuBtn.addEventListener("click", e => {
    hideDemo()
})

fullscreenBtn.addEventListener("click", e => {
    toggleFullscreen(e.currentTarget)
})