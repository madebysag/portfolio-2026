class Carousel {
    constructor (container, indicators = null) {
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

        // Drag Logic

        this.bindedDragLogic = this.dragLogic.bind(this)

        this.container.addEventListener("pointerdown", e => {
            this.initialPos = e.clientX
            this.initialX = this.container.getBoundingClientRect().x

            this.container.addEventListener("pointermove", this.bindedDragLogic)

            e.preventDefault()
        })



        this.container.addEventListener("pointerup", e => {

            this.container.removeEventListener("pointermove", this.bindedDragLogic)

            //the three scenerio
            if(Math.abs(this.distance) > (this.slideWidth * 0.5)) {

                this.distance < 1 ? this.nextSlide() : this.previousSlide()
            
            } else {

                this.goTo(this.currentSlide)
            }


        })
    }


    // Drag Logic
    dragLogic(e){
        this.distance = e.clientX - this.initialPos

        this.container.style.transform = `translateX(${this.initialX + this.distance}px)`

    }



    // Next slide logic
    nextSlide() {

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
    previousSlide() {

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
    showSlide(slideNumber) {

        // Translate div to the left
        this.container.style.transform = `translateX(${(this.slideWidth * - slideNumber) + this.slideWidth}px)`
    }

    // Handle indicator
    goTo(slideNumber) {

        // Handle indicator
        this.activateIndicator(slideNumber)

        // Show Slide
        this.showSlide(slideNumber)

        // Update Current slide - for the next and previous btns
        this.currentSlide = slideNumber
    }

    // Make selected indicator active
    activateIndicator(indicatorNumber) {

        // Remove "active" from others
        this.indicators.forEach(indicator => {
            indicator.classList.remove("active")
        })

        // Add "active" to current slide
        this.indicators[indicatorNumber - 1].classList.add("active")
    }

}

export default Carousel;