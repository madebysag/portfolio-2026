// import Carousel from "./Carousel.js"
import Carousel from "./DraggableCarousel.js"

// About Carousel...
const gallery = document.querySelector(".gallery")
const slidesContainer = document.querySelector(".slides-container");

const indicators = document.querySelector(".indicators");

// New carousel
const carousel = new Carousel(slidesContainer, indicators)


gallery.addEventListener("click", e => {

    // Stop Event propagation/bubbling
    e.preventDefault()

    // Next pic
    if (e.target.classList.contains("gallery-next-btn")) {

        // Move forward to next pic
        carousel.nextSlide()
    }

    // Previous pic
    if (e.target.classList.contains("gallery-previous-btn")) {

        // Move backward to previous pic
        carousel.previousSlide()
    }
})
