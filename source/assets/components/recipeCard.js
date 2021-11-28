// recipeCard.js
import { Spoonacular } from '../scripts/spoonacular.js'
class recipeCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    const card = document.createElement('section')
    card.setAttribute('id','shadow')
    card.classList.add('card')
    card.classList.add('container')
    card.classList.add('p-3')
    const style = document.createElement('style')
    style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";

      #shadow {
        border: solid black 2px;
        border-radius: 30px;
        background-color: wheat;
      }
      
      #card-information {
        margin-right: 20px;
      }
      
      #recipe-title {
        text-align: center;
        font-size: x-large;
        font-weight: bold;
      }
      
      #recipe-dietary {
        display: flex;
        max-width: 600px;
        max-height: 500px;
        width: auto;
        height: auto;
        border-radius: 10px;
        margin-top: 20px;
      }
      
      #recipe-image {
        display: block;
        width: 70%;
        border-radius: 20px;
        margin-left: auto;
        margin-right: auto;
      }
      
      #recipe-price {
        text-align: left;
      }
      
      #recipe-servings {
        text-align: left;
      }
      
      #recipe-cooking-time {
        text-align: left;
      }
      
      #recipe-calories {
        text-align: left;
      }
      
      #recipe-score {
        text-align: left;
      }
      
      #recipe-total-calories {
        text-align: left;
      }
     `

    card.innerHTML = `
    <div class="row">
      <div class="col-sm-6">
        <div class="rounded">
          <aside id ="card-visuals">
            <fig id="visual">
              <img id="recipe-image" src="https://spoonacular.com/recipeImages/579247-556x370.jpg" alt="recipe-image"/>
              <figcaption class="justify-content-center" id="recipe-dietary">
                  <img id="dairy-free" src="../../../source/assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" alt="Dairy Free"/>
                  <img id="gluten-free" src="../../../source/assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" alt="Gluten Free"/>
                  <img id="vegan" src="../../../source/assets/icons/dietary/vegan.png" width = "30px" height = "30px" alt="Vegan"/>
                  <img id="vegetarian" src="../../../source/assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" alt="Vegetarian"/>
              </figcaption>
            </fig>
          </aside>
        </div>
      </div>
      <div id="card-information" class="col my-auto">
        <div class="card">
          <div class="card-header" id="recipe-title"> Recipe Title </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" id="recipe-price"> Price </li>
            <li class="list-group-item" id="recipe-servings"> Recipe Servings </li>
            <li class="list-group-item" id="recipe-cooking-time"> Time </li>
            <li class="list-group-item" id="recipe-score"> Recipe Score </li>
            <li class="list-group-item" id="recipe-calories"> Calories Per Serving </li>
            <li class="list-group-item" id="recipe-total-calories"> Total Calories</li>
          </ul>
        </div>
      </div>
    </div>
     `
    const bootstrap = document.createElement('script')
    bootstrap.setAttribute('src',"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js")
    bootstrap.setAttribute('integrity',"sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM")
    bootstrap.setAttribute('crossorigin',"anonymous")

    const fontAwesome = document.createElement('script')
    fontAwesome.setAttribute('src',"https://kit.fontawesome.com/0e68289b8e.js")
    fontAwesome.setAttribute('crossorigin',"anonymous")

    this.shadowRoot.append(style, card, bootstrap, fontAwesome)
  }

  get data () {
    return this.json
  }

  /**
   * Change make to recipeCard instead keep create elements
   * Setting the structure of shadowRoot to what it need to be
   * then we can just call data to set up information for each
   * part of the recipecard
   * I did not get what is recipe-dietary part doing so I didnt
   * do that in the set data
   */
  set data (data) {
    this.json = data

    const spoonacular = new Spoonacular()

    // this will reset the struction of the shadowRoot
    this.shadowRoot.querySelector("section").innerHTML = `
    <div class="row">
      <div class="col-sm-6">
        <div class="rounded">
          <aside id ="card-visuals">
            <fig id="visual">
              <img id="recipe-image" src="" alt="recipe-image"/>
              <figcaption class="justify-content-center" id="recipe-dietary">
                  <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" alt="Dairy Free"/>
                  <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" alt="Gluten Free"/>
                  <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" alt="Vegan"/>
                  <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" alt="Vegetarian"/>
              </figcaption>
            </fig>
          </aside>
        </div>
      </div>
      <div id="card-information" class="col my-auto">
        <div class="card">
          <div class="card-header" id="recipe-title"> Recipe Title </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" id="recipe-price"> Price </li>
            <li class="list-group-item" id="recipe-servings"> Recipe Servings </li>
            <li class="list-group-item" id="recipe-cooking-time"> Time </li>
            <li class="list-group-item" id="recipe-score"> Recipe Score </li>
            <li class="list-group-item" id="recipe-calories"> Calories Per Serving </li>
            <li class="list-group-item" id="recipe-total-calories"> Total Calories</li>
          </ul>
        </div>
      </div>
    </div>
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
    this.shadowRoot.getElementById('recipe-total-calories').innerHTML =
      totalCalories

    // set image.src
    const image = spoonacular.getRecipeImageSource(data)
    this.shadowRoot.getElementById('recipe-image').setAttribute('src', image)

    // set dietary logos
    const dietary = spoonacular.getRecipeDietary(data)
    if (dietary) {
      if (dietary.vegan) { this.shadowRoot.getElementById('vegan').removeAttribute('hidden') }
      if (dietary.vegetarian) { this.shadowRoot.getElementById('vegetarian').removeAttribute('hidden') }
      if (dietary['gluten-free']) { this.shadowRoot.getElementById('gluten-free').removeAttribute('hidden') }
      if (dietary['dairy-free']) { this.shadowRoot.getElementById('dairy-free').removeAttribute('hidden') }
    }
  }
}

customElements.define('recipe-card', recipeCard)
