const combinedStyle = /* css */`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.carousel {
   margin: 2rem 0;
   height: 100%;
   width: 100%;
   position: relative;
   overflow: hidden;
}

.carousel .slides-container {
   width: 80%;
   height: 80%;
   margin: 0 auto;
   overflow: visible;
   display: flex;
   transition: all 1s;
}

.slide {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* padding: 0 0.5rem; */
}

.slide-pic {
    width: 98%;
    height: fit-content;
}

.slide-desc {
    position: absolute;
    bottom: 10%;
    text-align: center;
    padding: 0 0.8rem;
    background-color: #00000044;
    backdrop-filter: blur(2px);
    color: white;
}

.carousel-nav {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forward-btn,
.backward-btn {
   border: grey solid 1px;
   background-color: white;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   /* position: absolute;
   top: 50%; */
   z-index: 10;
   cursor: pointer;
   transition: background-color, color 0.2s ease-out; 
}

.forward-btn:hover,
.backward-btn:hover {
    background-color: hsla(0, 0%, 0%, 0.05);
    color: white;
}

.forward-btn{
   /* right: 0; */
   /* transform: translateY(-50%) scaleX(-1); */
   transform: scaleX(-1);
   margin-left: 0.5rem;
}

.backward-btn {
    /* left: 0; */
    /* transform: translateY(-50%); */
    margin-right: 0.5rem;
}

.slide-links {
    padding: 0 1rem;
}

.slide-link {
    width: 10px;
    height: 10px;
    margin: 0.3rem 0.2rem;
    border: var(--black) 1px solid;
    border-radius: 50%;
    display: inline-block;
    /* background-color: var(--white); */
    background-color: white;
    cursor: pointer;
    border: grey solid 1px;
    transition: all .2s ease-in;
}

.slide-link.active {
    border-radius: 10px;
    width: 50px;
    background-color: var(--black);
}

`;



class Carousel extends HTMLElement {
    constructor() {
        super()

        this.template = /* html */`
        <style>${combinedStyle}</style>
        <div class="carousel">
            

            <div class="slides-container">
                <slot></slot>
            </div>

            <div class="carousel-nav">
                <button type="button" class="slides-btn backward-btn carousel-previous-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.1" height="8.4"><g id="back_arrow" fill="none" stroke="gray" data-name="Group 5"><path d="M.9 4H21" data-name="Line 28"/><path d="M5.3 0C5.3 3.8 0 4 0 4s5.3 0 5.3 4.4" data-name="Path 4"/></g></svg>
                </button>

                <ol  class="slide-links"></ol>
                
                <button type="button" class="slides-btn forward-btn carousel-next-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.1" height="8.4"><g id="back_arrow" fill="none" stroke="gray" data-name="Group 5"><path d="M.9 4H21" data-name="Line 28"/><path d="M5.3 0C5.3 3.8 0 4 0 4s5.3 0 5.3 4.4" data-name="Path 4"/></g></svg>
                </button>  
                
            </div>

        </div>
        `;

        this.shadow = this.attachShadow({mode: "open"})
        this.shadow.innerHTML = this.template
    }

    connectedCallback() {
        this.btns = this.shadow.querySelectorAll(".slides-btn")
        this.mainElement = this.shadow.querySelector(".carousel")
        this.container = this.shadow.querySelector(".slides-container")
        this.slideLinks = this.shadow.querySelector(".slide-links")
        this.slides = [...this.children];
        this.totalSlides = this.slides.length;

        // Set slide width in the next frame, when hopefully it has rendered
        requestAnimationFrame(() => {
            this.slideWidth = this.clientWidth * 0.8 

        })

        this.currentSlide = 1;

        this.hasSlideLinks = this.hasAttribute("slide-links") ? this.getAttribute("slide-links") : false;

        // Check if slide links are to be used then make them
        if (this.hasSlideLinks) {
            for (let i = 0; i < this.totalSlides; i++) {

                this.slideLinks.innerHTML += `<li class="slide-link"  data-slideNumber="${i + 1}" ></li>`
            }

            // Make the first one active
            this.slideLinks.children[0].classList.add("active")

            // Add event Listeners to slide link
            this.slideLinks.addEventListener("click", e => {
                if (e.target.tagName == "LI") {
                    this.goTo(e.target.attributes["data-slideNumber"].value)
                }
            })
        }

        // check if buttons are to be used
        if(this.hasAttribute("nav-buttons") && (this.getAttribute("nav-buttons") != false)) {

            this.btns[0].addEventListener("click", () => { this.previousSlide()})
            
            this.btns[1].addEventListener("click", () => { this.nextSlide()})
            
        } else {
            this.btns[0].hidden = true
            this.btns[1].hidden = true
        }
    
    }
        
    // Next slide logic
    nextSlide() {

        if (this.currentSlide < this.totalSlides) {
            
            // Move forward
            this.currentSlide++;

            this.showSlide(this.currentSlide)

        } else {

            // Return to first slide
            this.currentSlide = 1;

            this.showSlide(this.currentSlide)

        }

        // slide link logic
        if (this.hasSlideLinks) {

            this.activateSlideLink(this.currentSlide)
        }

    }


    // Previous slide logic
    previousSlide() {

        if (this.currentSlide > 1) {
            
            // Move Backward
            this.currentSlide--;

            this.showSlide(this.currentSlide)

        } else {

            // Return to last slide
            this.currentSlide = this.totalSlides;

            this.showSlide(this.currentSlide)
        }

        // slide link logic
        if (this.hasSlideLinks) {

            this.activateSlideLink(this.currentSlide)
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
        this.activateSlideLink(slideNumber)

        // Show Slide
        this.showSlide(slideNumber)

        // Update Current slide - for the next and previous btns
        this.currentSlide = slideNumber
    }

    // Make selected indicator active
    activateSlideLink(slideLinkNumber) {

        // Remove "active" from others
        [...this.slideLinks.children].forEach(indicator => {
            indicator.classList.remove("active")
        })

        // Add "active" to current slide
        this.slideLinks.children[slideLinkNumber - 1].classList.add("active")
    }

}

class Slide extends HTMLElement {
    constructor() {
        super()

        this.template = /* html */ `
        <style>${combinedStyle}</style>

        <div class="slide">
            <img src="" class="slide-pic" alt="">
            <p class="slide-desc">
                <slot></slot>
            </p>
        </div>
        `;

        this.shadow = this.attachShadow({mode: "open"})
        this.shadow.innerHTML = this.template
    }

    connectedCallback() {
        this.imageUrl = this.getAttribute("image-url") ?? ""
        this.imageAlt = this.getAttribute("alt") ?? ""

        const slidePic = this.shadow.querySelector(".slide-pic")
        slidePic.src = this.imageUrl
        slidePic.alt = this.imageAlt

        requestAnimationFrame(() => {

            this.style.minWidth = this.parentElement.slideWidth + "px"
        })

    }
}

customElements.define("my-carousel", Carousel)
customElements.define("my-slide", Slide)

export { Carousel, Slide};