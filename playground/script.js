const landingPage = document.querySelector(".landing_page")
const displayPage = document.querySelector(".demos_display")
const demosLinks = document.querySelectorAll("main a.demos_link")

const backToMenuBtn = displayPage.querySelector(".page_nav button")
const loadingSpinner = displayPage.querySelector(".loading")
const iFrame = displayPage.querySelector("iframe")

function showDemo(url) {
    landingPage.hidden = true;
    displayPage.hidden = false;
    loadingSpinner.hidden = false;
    
    iFrame.src = url;
    iFrame.onload = () => {
        loadingSpinner.hidden = true;
    };
}

function hideDemo() {
    landingPage.hidden = false;
    displayPage.hidden = true;
}

demosLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()

        showDemo(e.target.href)
    })
})

backToMenuBtn.addEventListener("click", e => {
    hideDemo()
})