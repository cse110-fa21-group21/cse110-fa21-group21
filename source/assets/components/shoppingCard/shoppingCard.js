//shoppingCard.js

let myStorage = window.localStorage;

let ingredientArray;


class shoppingCard extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
  
      this.shadowRoot.innerHTML = `
      `
    }
    get data () {
        return this.json
    }

}

customElements.define('shopping-card', shoppingCard)
