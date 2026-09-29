const accordionStyle = /* css */`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 500;
    font-family: "Noto Sans", sans-serif;
}

:root {
    --white: hsl(0, 0%, 97%);
    --black: hsl(0, 0%, 15%);
    --gray: hsl(0, 0%, 85%);
}

.accordion_wrapper {
    max-width: 600px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    transition: grid 0.2s ease-out;
}

.accordion_wrapper > .accordion_tab {
    background: var(--black);
    border: none;
    border-radius: 24px;
    position: relative;
}

.accordion_tab > .accordion_btn {
    padding: 0.5rem;
    border-radius: 50%;
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    box-sizing: content-box;
    transition: background-color, transform 0.2s ease-out;
}

.accordion_tab.active > .accordion_btn {
    transform: rotate(45deg);
}

.accordion_tab > .accordion_btn:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
}

.accordion_wrapper > .accordion_tab > .heading {
    padding: 1.5rem 3rem;
    color: var(--gray);
    width:  100%;
    cursor: pointer;
}

.accordion_wrapper > .accordion_tab > .body {
    padding: 1.5rem 3rem;
    background-color: var(--white);
    color: var(--black);
    width:  100%;
    border: 2px solid var(--black);
    border-radius: 24px;
    transition: opacity 0.2s ease-out;
    opacity: 0;
    display: none;
}
.accordion_wrapper > .accordion_tab.active > .body {
    opacity: 1;
    display: block;
}

`;

class Accordion extends HTMLElement {

    constructor() {
        super()

        // this.slottedContent = [...this.children].reduce((res, curr) => {
        //     res += `${curr.outerHTML}`
        // })

        // // console.log(this.slottedContent)

        // this.innerHTML = /* html */`
        // <style>${accordionStyle}</style>

        // <div class="accordion_wrapper">
        //     ${this.slottedContent}
        // </div>
        // `;

        // this.shadow = this.attachShadow({mode: "open"})
        // this.innerHTML = this.template
        // this.querySelector("accordion_wrapper").i

    }

    connectedCallback() {

        const fragment = new DocumentFragment()
        while (this.firstChild) {
            fragment.append(this.firstChild)
        }

        this.innerHTML = /* html */`
            <style>${accordionStyle}</style>
            <div class="accordion_wrapper"></div>
        `;   

        this.querySelector(".accordion_wrapper").append(fragment)

        this.addEventListener("click", e => {

        console.dir(e.currentTarget)
        console.dir(e.currentTarget)
        })

    }
}


class Tab extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = /* html */`
            <div class="accordion_tab">
                <svg class="accordion_btn" height="18px" width="18px"><use href="./icon.svg"></svg>
                <slot></slot>
            </div>
        `;
    }
}

class Heading extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = /* html */`
            <h4 class="heading"><slot></slot></h4>
        `;
    }

    connectedCallback() {
        this.addEventListener("click", e => {
            console.log(this.parentElement)
        })
    }
}

class Body extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = /* html */`
            <div class="body"><slot></slot></div>
        `;
    }
}

customElements.define("my-accordion", Accordion);
customElements.define("accordion-tab", Tab);
customElements.define("tab-heading", Heading);
customElements.define("tab-body", Body);

export {Accordion, Tab, Heading, Body}