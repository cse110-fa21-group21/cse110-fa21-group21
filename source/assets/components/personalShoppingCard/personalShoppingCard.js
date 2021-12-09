//shoppingCard.js
let myStorage = window.localStorage;
class personalShoppingCard extends HTMLElement {
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })

      this.shadowRoot.innerHTML = `
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
        <!-- Local StyleSheets -->
        <link rel="stylesheet" href="./assets/components/personalShoppingCard/personalShoppingCard.css">
    
        <!-- The Viewer Itself -->
        <section id="shadow" class="card container p-3"></section>
    
        <!-- Bootstrap JS -->
        <script 
        src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
        integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin = "anonymous"></script>
      `;
    }
    get data () {
        return this.json
    }
    
    set data(recipeTitle){
      const personalShoppingList  = JSON.parse(myStorage.getItem("SHOPPING_LIST"))[recipeTitle]
      this.json = personalShoppingList
      this.shadowRoot.getElementById("shadow").innerHTML = `
        <div class="card-header" id="shopping-list-title"> ${recipeTitle} </div>
        <div class="card-body" id="recipe-ingredients">         
          <div class="ingredients"></div>
          <div class="add-to-ingredients">
              <div class="input-group mb-3">
                <div class="input-group-text">
                  <img class="add-ingredient" src="assets/icons/shopping/add.png" alt="Add Button">            
                </div>
                <input class="form-control" type="text" value="" placeholder="Add to your shopping list..." >
            </div>
          </div>   
        </div>
      `
      for (const ingredient in personalShoppingList){
          const ingredientWrapper = document.createElement('div');
          ingredientWrapper.classList.add("input-group", "mb-3")
          ingredientWrapper.innerHTML = `
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="checkbox">
            </div>
            <input class="form-control" type="text" value="${ingredient}" disabled>
            <div class="input-group-text">
              <img class="trash-ingredient" src="assets/icons/shopping/trash-can.png" alt="Trash Can Button">            
            </div>
          `
          ingredientWrapper
          .querySelector('input[type="checkbox"]')
          .checked  = personalShoppingList[ingredient];
          this.shadowRoot
          .querySelector(".ingredients").appendChild(ingredientWrapper);
      }

      /******************************************************************************************************
       *                                  EVENT LISTENERS
       ******************************************************************************************************/
        this.shadowRoot
        .querySelector('.ingredients')
        .querySelectorAll('.input-group')
        .forEach (
          (ingredientWrapper) => {
            //Add Event Listener to Checkboxes
            this.#addCheckboxListener(ingredientWrapper)
            //Add Event Listener to Trashcans
            this.#addTrashCanListener(ingredientWrapper)
          }
        )

        this.shadowRoot
        .querySelector('.add-to-ingredients')
        .querySelector('.add-ingredient')
        .addEventListener('click', ()=>{
          // validation
           const textbox =   this.shadowRoot.querySelector('.add-to-ingredients')
                                            .querySelector('input[type="text"]')
           const ingredient = textbox.value
           if( !ingredient || ingredient === ""){
             //do nothing
           }else{
            const ingredientWrapper = document.createElement('div');
            ingredientWrapper.classList.add("input-group", "mb-3")
            ingredientWrapper.innerHTML = `
              <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox">
              </div>
              <input class="form-control" type="text" value="${ingredient}" disabled>
              <div class="input-group-text">
                <img class="trash-ingredient" src="assets/icons/shopping/trash-can.png" alt="Trash Can Button">            
              </div>
            `
            this.#addCheckboxListener(ingredientWrapper)
            this.#addTrashCanListener(ingredientWrapper)

            let localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
            localShoppingList[recipeTitle][ingredient] = false;
            console.log(`Adding ${ingredient} to Personal Shopping List...`)

            myStorage.setItem("SHOPPING_LIST", JSON.stringify(localShoppingList))
            console.log(`SHOPPING_LIST: ${JSON.parse( JSON.stringify(myStorage.getItem("SHOPPING_LIST"),null,4) )} `);
            this.shadowRoot
            .querySelector(".ingredients").appendChild(ingredientWrapper);

            //reset the textbox
            textbox.value = ""
           }
        })
    }

    #addTrashCanListener (ingredientWrapper){
      const trashCan =  ingredientWrapper.querySelector('.trash-ingredient')
      const checkbox =  ingredientWrapper.querySelector('input[type="checkbox"]')

      const ingredient = ingredientWrapper.querySelector('input[type="text"]').value

      trashCan.addEventListener("click", ()=>{
        checkbox.removeEventListener("click",null)
        let localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
        console.log(`Removing ${ingredient} from Personal Shopping List...`)
        delete localShoppingList["Personal Shopping List"][ingredient]
        myStorage.setItem("SHOPPING_LIST",JSON.stringify(localShoppingList))
        ingredientWrapper.remove()
        console.log(`SHOPPING_LIST: ${JSON.stringify(JSON.parse(myStorage.getItem("SHOPPING_LIST")),null,4)}`)
      })
    }
    #addCheckboxListener (ingredientWrapper){
      const trashCan =  ingredientWrapper.querySelector('.trash-ingredient')
      const checkbox =  ingredientWrapper.querySelector('input[type="checkbox"]')

      const ingredient = ingredientWrapper.querySelector('input[type="text"]').value

      checkbox.addEventListener("click", ()=>{
        let localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
        localShoppingList["Personal Shopping List"][ingredient] = !localShoppingList["Personal Shopping List"][ingredient]
        console.log(`Updating Personal Shopping List to\n${JSON.stringify(localShoppingList["Personal Shopping List"])}`)
        myStorage.setItem("SHOPPING_LIST", JSON.stringify(localShoppingList))
        console.log(`SHOPPING_LIST: ${JSON.stringify(JSON.parse(myStorage.getItem("SHOPPING_LIST")),null,4)}`);
      })
    }

}

customElements.define('personal-shopping-card', personalShoppingCard)
