// recipeViewer.js

import { Spoonacular } from '../scripts/spoonacular.js'
const spoonacular = new Spoonacular()
let myStorage = window.localStorage

class recipeViewer extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    const style = document.createElement('style');
    style.innerHTML = `
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
    .flex-container {
      display: flex;
      justify-content: center;
    }
    
    #recipe-title {
      text-align: center;
      margin: 20px;
      font-size: xx-large;
      border: 2.5px solid;
      border-radius: 10px;
    }
    
    #recipe-image {
      display: block;
      max-width: 600px;
      max-height: 500px;
      width: auto;
      height: auto;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      border-radius: 10px;
    }
    
    #left-flex {
      width: 60%;
    }
    
    #info-container {
      display: block;
      text-align: justify;
      border: 2px solid;
      border-radius: 10px;
      padding: 25px;
      width: 300px;
      margin: 20px auto;
    }
    
    #recipe-ingredients {
      border: 2.5px solid;
      border-radius: 10px;
      padding: 30px;
      margin-left: auto;
      margin-right: auto;
      width: 350px;
      position: sticky;
      align-self: flex-start;
      top: 0;
    }
    
    #recipe-dietary {
      text-align: center;
    }
    
    #recipe-instructions {
      margin-left: 30px;
    }
    
    ol li,
    ul li {
      padding: 5px 0;
    }

    .favorite-button {
      justify-items: center;
      display: grid;
      position: absolute;
      left: 50px;
    }

    .favorite-button>button {
      background-color: white;
      border: 1px solid #000;
      border-radius: 20px;
      padding: 8px 20px 8px 50px;
      position: relative;
      z-index: 2;
    }

    .favorite-button>button:hover {
      cursor: pointer;
      filter: brightness(96%);
    }

    .favorite-button>img {
      position: absolute;
      margin-left: -150px;
      margin-top: 3px;
      z-index: 3;
    }
    `
    const viewer  = document.createElement('section')
    viewer.innerHTML = `
    <main id = "card-information">
    <button>Add Favorite</button>
        <div id = "recipe-title"></div> 
        <section class = "flex-container">
          <div id = "left-flex">
            <aside id = "card-visuals">
              <fig id = "visual">
                <img id = "recipe-image" src="" alt="recipe-image"/>
                <figcaption id = "recipe-dietary">
                  <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                  <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                  <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                  <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                </figcaption>
              </fig>
            </aside>
            
            <div id = "info-container">
              <div id = "recipe-price"> </div>
              <div id = "recipe-cooking-time"> </div>
              <div id = "recipe-servings"></div>
              <div id = "recipe-calories"> </div> 
              <div id = "recipe-total-calories"></div>
              <div id = "recipe-score"></div>
            </div>

            <div id = "recipe-instructions"> </div> 
          </div>

          <div id = "right-flex">
            <div id = "recipe-ingredients"> </div>
          </div>
        </section> 
      </main>
    `
    const bootstrap = document.createElement('script')
    bootstrap.setAttribute('src','https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')
    bootstrap.setAttribute('integrity','sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM')
    bootstrap.setAttribute('crossorigin','anonymous')

    this.shadowRoot.append(style, viewer, bootstrap)
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
        <div class = "favorite-button">
          <img id = "fav-btn" src="./assets/icons/favorite/favorite-blank.png" width = "30px" height = "30px" alt="favorite button">
          <button>Favorite the Recipe</button>
        </div>
        <section class = "flex-container">
          <div id = "left-flex">
            <aside id = "card-visuals">
              <fig id = "visual">
                <img id = "recipe-image" src="" alt="recipe-image"/>
                <figcaption id = "recipe-dietary">
                  <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                  <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                  <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                  <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                </figcaption>
              </fig>
            </aside>
            
            <div id = "info-container">
              <div id = "recipe-price"> </div>
              <div id = "recipe-cooking-time"> </div>
              <div id = "recipe-servings"></div>
              <div id = "recipe-calories"> </div> 
              <div id = "recipe-total-calories"></div>
              <div id = "recipe-score"></div>
            </div>

            <div id = "recipe-instructions"> </div> 
          </div>

          <div id = "right-flex">
            <div id = "recipe-ingredients"> </div>
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
      favImg.setAttribute('src', "./assets/icons/favorite/favorite-yellow.png")
    }
    
    //set favorite Button functionality
    favoriteButton.addEventListener('click', event =>{
      if(favoriteButton.textContent == "Favorite the Recipe"){
        myStorage.setItem(title,JSON.stringify(data))
        favoriteButton.textContent = "Remove the Favorite"
        favImg.setAttribute('src', "./assets/icons/favorite/favorite-yellow.png")
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
