// recipeCard.js
import { Spoonacular } from '../../scripts/spoonacular.js'

class recipeCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
     
     <!-- Local StyleSheets -->
     <link rel="stylesheet" href="./assets/components/recipeCard/recipeCard.css">
     <link rel="stylesheet" href="./assets/components/recipeCard/iconRecipeCard.css">

     <!-- Fontawesome CSS -->
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

     <!-- The Card Itself -->
     <section id="shadow" class="card container p-3"></section>

     <!-- Bootstrap JS -->
     <script 
      src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
      integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin = "anonymous"></script>

     <!-- Fontawesome JS -->
     <script src = "https://kit.fontawesome.com/0e68289b8e.js" crossorigin = "anonymous"></script>
    `
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

    // this will reset the struction of the section element within our shadow root
    this.shadowRoot.querySelector("section").innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <div class="rounded">
            <aside id ="card-visuals">
              <fig id="visual">
                <img id="recipe-image" src="" alt="recipe-image"/>
                <figcaption class="justify-content-center" id="recipe-dietary">
                    <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                    <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                    <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                    <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                </figcaption>
              </fig>
            </aside>
          </div>
        </div>
        <div id="card-information" class="col my-auto">
          <div class="card">
            <div class="card-header" id="recipe-title"> Recipe Title </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" id="recipe-price"></li>
              <li class="list-group-item" id="recipe-servings"></li>
              <li class="list-group-item" id="recipe-cooking-time"></li>
              <li class="list-group-item" id="recipe-score"></li>
              <li class="list-group-item" id="recipe-calories"></li>
              <li class="list-group-item" id="recipe-total-calories"></li>
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
