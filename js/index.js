const toggleButtons = [...document.querySelectorAll(".theme_toggle")]
const [moonUrl, sunUrl] = [ "./static/icons/moon.svg", "./static/icons/sun.svg"]

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