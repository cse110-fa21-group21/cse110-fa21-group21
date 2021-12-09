//shoppingCard.js
let myStorage = window.localStorage;
/**
 * Custom HTML element named shoppingCard
 * To display Shopping List for each recipe in the Shopping List Page. (Separate from personalShoppingCard)
 */
class shoppingCard extends HTMLElement {
    /**
    * Constructor sets up the default HTML for shoppingCard
    */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })

      this.shadowRoot.innerHTML = `
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
        <!-- Local StyleSheets -->
        <link rel="stylesheet" href="./assets/components/shoppingCard/shoppingCard.css">
    
        <!-- The Viewer Itself -->
        <section id="shadow" class="card container p-3"></section>
    
        <!-- Bootstrap JS -->
        <script 
        src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
        integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin = "anonymous"></script>
      `;
    }
    /**
    * Getter function for JSON file of shoppingCard
    * @returns {JSON} json of this shoppingCard
    */
    get data () {
        return this.json
    }
    
  /**
   * Setter function for shoppingCard 
   * Fills in items from the ingredients list in RecipeViewer!
   * @param {string} recipeTitle: Title of recipe that we are adding ingredients from
   */
    set data(recipeTitle){
      let recipeIngredients  = JSON.parse(myStorage.getItem("SHOPPING_LIST"))[recipeTitle]
      this.json = recipeIngredients;
      this.shadowRoot.querySelector("section").innerHTML = `
        <div class="card-header" id="recipe-title">${recipeTitle}</div>
        <div class="card-body" id="recipe-ingredients"></div>
        <div class="card-footer border-0 pt-0 mt-0">
          <img id = "trash-btn" src="assets/icons/shopping/trash-can.png" width = "50rem" height = "50rem" alt="trash-can-icon">
        </div>      
      `

      for ( const ingredient in recipeIngredients){
          const ingredientWrapper = document.createElement('div')
          ingredientWrapper.classList.add("input-group")
          ingredientWrapper.classList.add("mb-3")

          ingredientWrapper.innerHTML = `
            <div class="input-group-text">
              <input id="checkbox" class="form-check-input mt-0" type="checkbox">
            </div>
            <input id="text" class="form-control" type="text" value="${ingredient.toUpperCase()}" disabled>
          `
          ingredientWrapper
            .querySelector("#checkbox")
            .checked  = recipeIngredients[ingredient];
          this.shadowRoot
            .getElementById("recipe-ingredients").appendChild(ingredientWrapper);
      }

      this.shadowRoot.querySelectorAll("input[type=checkbox]").forEach(
        (checkbox,index) => {
          checkbox.addEventListener("click", ()=>{
            let localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
            const ingredient = Object.keys(localShoppingList[recipeTitle])[index]
            localShoppingList[recipeTitle][ingredient] = !localShoppingList[recipeTitle][ingredient]
            console.log(`Updating ${recipeTitle} to\n${JSON.stringify(localShoppingList[recipeTitle])}`)
            myStorage.setItem("SHOPPING_LIST", JSON.stringify(localShoppingList))
            console.log(`SHOPPING_LIST: ${JSON.stringify(JSON.parse(myStorage.getItem("SHOPPING_LIST")),null,4)}`);
          })
        }
      )
      this.shadowRoot
          .querySelector('img[alt="trash-can-icon"]')
          .addEventListener("click", ()=>{
              this.shadowRoot.querySelectorAll("input[type=checkbox]").forEach(
                (checkbox) => {checkbox.removeEventListener("click", null) }
              )
              let localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
              console.log(`Removing ${recipeTitle} from Shopping List...`)
              delete localShoppingList[recipeTitle]
              myStorage.setItem("SHOPPING_LIST",JSON.stringify(localShoppingList))
              this.remove()
              console.log(`SHOPPING_LIST: ${JSON.stringify(JSON.parse(myStorage.getItem("SHOPPING_LIST")),null,4)}`)
            }
          )
    }

}

customElements.define('shopping-card', shoppingCard)
