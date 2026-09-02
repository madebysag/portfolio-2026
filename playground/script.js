const landingPage = document.querySelector(".landing_page")
const displayPage = document.querySelector(".demos_display")
const demosLinks = document.querySelectorAll("main a.demos_link")
const backToMenuBtn = document.querySelector(".demos_display .page_nav button")

function showDemo(url) {
    landingPage.hidden = true;
    displayPage.hidden = false;
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