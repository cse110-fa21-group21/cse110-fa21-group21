// recipeViewer.js

import { Spoonacular } from '../../scripts/spoonacular.js'
const spoonacular = new Spoonacular()
let myStorage = window.localStorage

class recipeViewer extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <!-- Local StyleSheets -->
    <link rel="stylesheet" href="./assets/components/recipeViewer/recipeViewer.css">

    <!-- The Viewer Itself -->
    <section id="shadow"></section>

    <!-- Bootstrap JS -->
    <script 
     src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
     integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
     crossorigin = "anonymous"></script>
    `
  }

  get data () {
    return this.json
  }

  /**
   * similiar to recipeCard change to reset information
   * for a recipe-viewer element instead creating
   */
  set data (data) {
    this.json = data

    this.shadowRoot.querySelector('section').innerHTML = `
    <main id = "card-information">
        <div id = "recipe-title"></div>
        <div class = "favorite-button hovertip">
          <img id = "fav-btn" src="./assets/icons/favorite/favorite-blank.png" width = "30px" height = "30px" alt="favorite button">
          <button>Favorite the Recipe</button>
        </div>
        <section class = "flex-container">
          <div id = "left-flex">
            <aside id = "card-visuals">
              <fig id = "visual">
                <img id = "recipe-image" src="" alt="recipe-image"/>
                <figcaption id = "recipe-dietary">
                  <div class="hovertip">
                    <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                    <span class="hovertip-text" >Dairy Free</span>
                  </div>
                  <div class="hovertip">
                    <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                    <span class="hovertip-text">Gluten Free</span>
                  </div>
                  <div class="hovertip">
                    <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                    <span class="hovertip-text">Vegan</span>
                  </div>
                  <div class="hovertip">
                    <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                    <span class="hovertip-text">Vegetarian</span>
                  </div>
                </figcaption>
              </fig>
            </aside>

            <div id = "info-container">
              <h4><span> Recipe Info </span></h4>
              <div id = "recipe-price"> </div>
              <div id = "recipe-cooking-time"> </div>
              <div id = "recipe-servings"></div>
              <div id = "recipe-calories"> </div> 
              <div id = "recipe-total-calories"></div>
              <div id = "recipe-score"></div>
            </div>

            <div id = "instruction-header"> <h2> Cooking Instructions </h2> </div>

            <div id = "recipe-instructions"> </div> 
          </div>

          <div id = "right-flex">
            <div id = "recipe-ingredients"> 
              <h4><span> Ingredients </span></h4>
            </div>
          </div>
        </section> 
      </main>
    `
    // set title
    const title = spoonacular.getRecipeTitle(data)
    this.shadowRoot.getElementById('recipe-title').innerHTML = title

    // set price
    const price = spoonacular.getRecipePrice(data)
    this.shadowRoot.getElementById('recipe-price').innerHTML = price

    // set time
    const time = spoonacular.getRecipeCookingTime(data)
    this.shadowRoot.getElementById('recipe-cooking-time').innerHTML = time

    // set score
    const score = spoonacular.getRecipeScore(data)
    this.shadowRoot.getElementById('recipe-score').innerHTML = score

    // set servings
    const servings = spoonacular.getRecipeServings(data)
    this.shadowRoot.getElementById('recipe-servings').innerHTML = servings

    // set calories
    const calories = spoonacular.getRecipeCalories(data)
    this.shadowRoot.getElementById('recipe-calories').innerHTML = calories

    // set totalCalories
    const totalCalories = spoonacular.getRecipeTotalCalories(data)
    this.shadowRoot.getElementById('recipe-total-calories').innerHTML = totalCalories
    
    // set ingredients
    const ingredients = spoonacular.getRecipeIngredientsList(data)
    this.shadowRoot.getElementById('recipe-ingredients').appendChild(ingredients)

    // set instructions
    const instructions = spoonacular.getRecipeInstructionsList(data)
    this.shadowRoot.getElementById('recipe-instructions').appendChild(instructions)

    // set image
    const image = spoonacular.getRecipeImageSource(data)
    this.shadowRoot.getElementById('recipe-image').setAttribute('src', image)

    // set dietary logos
    const dietary = spoonacular.getRecipeDietary(data)
    if (dietary.vegan) { this.shadowRoot.getElementById('vegan').removeAttribute('hidden') }
    if (dietary.vegetarian) { this.shadowRoot.getElementById('vegetarian').removeAttribute('hidden') }
    if (dietary['gluten-free']) { this.shadowRoot.getElementById('gluten-free').removeAttribute('hidden') }
    if (dietary['dairy-free']) { this.shadowRoot.getElementById('dairy-free').removeAttribute('hidden') }
    
    //determine the text on button
    const favoriteButton = this.shadowRoot.querySelector('button');
    const favImg = this.shadowRoot.querySelector('#fav-btn');
    if(myStorage.getItem(title) != undefined){
      favoriteButton.textContent = "Remove the Favorite"
      favImg.setAttribute('src', "./assets/icons/favorite/favorite-red.png")
    }
    
    //set favorite Button functionality
    favoriteButton.addEventListener('click', () => {
      if(favoriteButton.textContent == "Favorite the Recipe"){
        myStorage.setItem(title,JSON.stringify(data))
        favoriteButton.textContent = "Remove the Favorite"
        favImg.setAttribute('src', "./assets/icons/favorite/favorite-red.png")
      }
      else if(favoriteButton.textContent == "Remove the Favorite"){
        myStorage.removeItem(title)
        favoriteButton.textContent = "Favorite the Recipe"
        favImg.setAttribute('src', "./assets/icons/favorite/favorite-blank.png")
      }
   })
  }
}
customElements.define('recipe-viewer', recipeViewer)
