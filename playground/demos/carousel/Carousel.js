function Carousel (container, indicators = null) {
    this.container = container;
    this.slides = Array.from(container.children);
    this.totalSlides = this.slides.length;
    this.slideWidth = this.container.scrollWidth / this.totalSlides

    this.currentSlide = 1;

    // Check if indicators are defined
    if (indicators) {
        for (let i = 0; i < this.totalSlides; i++) {

            indicators.innerHTML += `<li class="pic-selector"  data-slideNumber="${i + 1}" ></li>`
        }

        // Get indicators and convert to array
        this.indicators = Array.from(indicators.children)

        // Make the first one active
        this.indicators[0].classList.add("active")

        // Add event Listeners to indicators
        indicators.addEventListener("click", e => {
            if (e.target.tagName == "LI") {
                this.goTo(e.target.attributes["data-slideNumber"].value)
            }
        })
    }
}

// Next slide logic
Carousel.prototype.nextSlide = function() {

    if (this.currentSlide < this.totalSlides) {
        
        // Move forward
        this.currentSlide++;

        this.showSlide(this.currentSlide)

        // indicators logic
        if (this.indicators) {

            this.activateIndicator(this.currentSlide)
        }

    } else {

        // Return to first slide
        this.currentSlide = 1;

        this.showSlide(this.currentSlide)

        // indicators logic
        if (this.indicators) {

            this.activateIndicator(this.currentSlide)
        }
    }
}


// Previous slide logic
Carousel.prototype.previousSlide = function() {

    if (this.currentSlide > 1) {
        
        // Move Backward
        this.currentSlide--;

        this.showSlide(this.currentSlide)
        
        // indicators logic
        if (this.indicators) {

            this.activateIndicator(this.currentSlide)
        }

    } else {

        // Return to last slide
        this.currentSlide = this.totalSlides;

        this.showSlide(this.currentSlide)

        // indicators logic
        if (this.indicators) {

            this.activateIndicator(this.currentSlide)
        }
    }
}

// Show slide
Carousel.prototype.showSlide = function (slideNumber) {

    // Translate div to the left
    this.container.style.transform = `translateX(${(this.slideWidth * - slideNumber) + this.slideWidth}px)`
}

// Handle indicator
Carousel.prototype.goTo = function (slideNumber) {

    // Handle indicator
    this.activateIndicator(slideNumber)

    // Show Slide
    this.showSlide(slideNumber)

    // Update Current slide - for the next and previous btns
    this.currentSlide = slideNumber
}

// Make selected indicator active
Carousel.prototype.activateIndicator = function(indicatorNumber) {

    // Remove "active" from others
    this.indicators.forEach(indicator => {
        indicator.classList.remove("active")
    })

    // Add "active" to current slide
    this.indicators[indicatorNumber - 1].classList.add("active")
}

export default Carousel;