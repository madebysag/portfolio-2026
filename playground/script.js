const landingPage = document.querySelector(".landing_page")
const displayPage = document.querySelector(".demos_display")
const demosLinks = document.querySelectorAll("main a.demos_link")

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

function toggleFullscreen() {
    
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
    toggleFullscreen()
})