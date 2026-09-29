const accordionStyle = /* css */`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 500;
    font-family: "Noto Sans", sans-serif;
}

my-accordion, accordion-tab, tab-heading, tab-body { 
    display: block; 
    word-break: break-word;
}

my-accordion {
    --white: hsl(0, 0%, 97%);
    --black: hsl(0, 0%, 15%);
    --gray: hsl(0, 0%, 85%);

    max-width: 600px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
}

accordion-tab {
    background: var(--black);
    border: none;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    transition: height 0.2s ease-out;
}

accordion-tab > .accordion_btn {
    padding: 0.5rem;
    border-radius: 50%;
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    box-sizing: content-box;
    s: background-color, transform 0.2s ease-out;
    pointer-events: none;
}

accordion-tab.active > .accordion_btn {
    transform: rotate(135deg);
}

accordion-tab > .accordion_btn:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
}

my-accordion > accordion-tab > tab-heading {
    padding: 1.5rem 3rem;
    color: var(--gray);
    width:  100%;
    cursor: pointer;
}

my-accordion > accordion-tab > tab-body {
    padding: 1.5rem 3rem;
    background-color: var(--white);
    color: var(--black);
    width:  100%;
    border: 2px solid var(--black);
    border-radius: 24px;
}

`;

class Accordion extends HTMLElement {

    connectedCallback() {

        const fragment = new DocumentFragment()

        // Moves the firstChild physically from the dom tree
        while (this.firstChild) {
            fragment.append(this.firstChild)
        }

        this.innerHTML = /* html */`
            <style>${accordionStyle}</style>`;   

        this.append(fragment)
    }
}


class Tab extends HTMLElement {

    connectedCallback() {

        const fragment = new DocumentFragment()

        // Moves the firstChild physically from the dom tree
        while (this.firstChild) {
            fragment.append(this.firstChild)
        }

        this.innerHTML = /* html */`
            <svg class="accordion_btn" height="18px" width="18px"><use href="./icon.svg"></svg>
        `;   

        this.append(fragment)

        this.style.height = `${this.querySelector("tab-heading").clientHeight}px`

    }

}

class Heading extends HTMLElement {

    connectedCallback() {
        const fragment = new DocumentFragment()

        // Moves the firstChild physically from the dom tree
        while (this.firstChild) {
            fragment.append(this.firstChild)
        }

        this.innerHTML = ""
        this.append(fragment)

        this.addEventListener("click", e => {
            openTab(this.parentElement)
        })
    }
}

class Body extends HTMLElement {

    connectedCallback() {
        const fragment = new DocumentFragment()

        // Moves the firstChild physically from the dom tree
        while (this.firstChild) {
            fragment.append(this.firstChild)
        }

        this.innerHTML = ""
        this.append(fragment)

    }
}

customElements.define("my-accordion", Accordion);
customElements.define("accordion-tab", Tab);
customElements.define("tab-heading", Heading);
customElements.define("tab-body", Body);


function openTab(tab, closeOthers = true) {

    const currentTabIsOpen = tab.classList.contains("active")

    if (closeOthers) {
        [...document.querySelectorAll("accordion-tab")].forEach(currentTab => {
            currentTab.style.height = `${currentTab.querySelector("tab-heading").clientHeight}px` || "0px"
            currentTab.classList.remove("active")
        });
    }

    if(!currentTabIsOpen) {

        tab.style.height = `${tab.querySelector("tab-heading").clientHeight + tab.querySelector("tab-body").clientHeight + 4}px` || "0px"
        tab.classList.add("active")
    } else {

        tab.style.height = `${tab.querySelector("tab-heading").clientHeight}px` || "0px"
        tab.classList.remove("active")
    }
}

openTab(document.querySelector("accordion-tab"))    // Open first tab

// export {Accordion, Tab, Heading, Body}