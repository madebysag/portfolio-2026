class Accordion {
    constructor(element) {
        this.element = element;
        this.sections = [...element.querySelectorAll(".accordion")]
        this.headings = [...element.querySelectorAll(".accordion_header")]

        this.headings.forEach(heading => {

            // the heading serves as buttons
            const section = heading.parentElement
            const content = heading.nextElementSibling
            heading.state = "closed"

            // Sections height
            section.style.height = heading.clientHeight + "px";

            heading.addEventListener("click", e => {
                
                if (heading.state == "closed") {
                    // Close other Accordion tabs - note the section in this block refers to all sections including the one been clicked
                    this.sections.forEach(section => {
    
                        // Get other headings then close them
                        const otherHeading = section.children[0]
                        this._close(section, otherHeading)
                    })

                    // Open the clicked section
                    this._open(section, heading, content)
                    
                } else {
                    // Close the clicked section
                    this._close(section, heading)
                }
            })
        })

    }
    _open(section, heading, content){
        section.style.height = heading.clientHeight + content.clientHeight + "px";
        heading.children[0].innerHTML = "&darr;"

        heading.state = "opened"
    }

    _close(section, heading) {
        section.style.height = heading.clientHeight + "px";
        heading.children[0].innerHTML = "&uarr;"

        heading.state = "closed"
    }
}


const accordion  = new Accordion(document.getElementById("accordion_container"));
