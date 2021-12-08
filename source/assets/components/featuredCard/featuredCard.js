// recipeCard.js

import { 
  Spoonacular
} from "../../scripts/api/api.module.js"

class featuredCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
     
     <!-- The Card Itself -->
     <section id="shadow"></section>

     <!-- Local StyleSheets -->
     <link rel="stylesheet" href="./assets/components/featuredCard/featuredCard.css">

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
      <div class="card" id="featured-card" style="width: 18rem">
        <img id="recipe-image" class="card-img-top" src="" alt="recipe-image"/>
        <figcaption class="justify-content-center" id="recipe-dietary">
          <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
          <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
          <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
          <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
          <img id="blank" src="./assets/icons/dietary/blank.png" width = "30px" height = "30px" hidden alt="Blank"/>
        </figcaption>
        <div class="card-body d-flex flex-column" style = "height: 7rem">
          <h4 id="card-title">Recipe Title</h4>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" id="featured-button">Check Out This Recipe!</a>
        </div>
      </div>
    `

    // set title
    const title = spoonacular.getRecipeTitle(data)
    this.shadowRoot.getElementById('card-title').innerHTML = title

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
      else { this.shadowRoot.getElementById('blank').removeAttribute('hidden') }
    }
  }
}

customElements.define('featured-recipe-card', featuredCard)
