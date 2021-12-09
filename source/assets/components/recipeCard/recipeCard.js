// recipeCard.js
import { Spoonacular } from '../../scripts/api/spoonacular.js'
let myStorage = window.localStorage

/**
 * Custom HTML element named RecipeCard. <recipe-card>
 * Used to display Recipes in Search Page, Favorite Lists Page
 */
class recipeCard extends HTMLElement {
  /**
    * Constructor sets up the default HTML for Recipe Card
    */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
     
     <!-- Local StyleSheets -->
     <link rel="stylesheet" href="./assets/components/recipeCard/recipeCard.css">

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
  /**
    * Getter function for JSON file of recipeCard
    * @returns {JSON} json of this recipeCard
    */
  get data () {
    return this.json
  }

  /**
   * Setter function for JSON file of recipeCard.
   * Creates Recipe Card accordingly with data from Spoonacular API
   * Note: Change make to recipeCard instead keep create elements
   * Setting the structure of shadowRoot to what it need to be
   * then we can just call data to set up information for each
   * part of the recipecard
   * I did not get what is recipe-dietary part doing so I didnt
   * do that in the set data
   * @param {JSON} data: Data holding details about Recipe from spoonacular API
   */
  set data (data) {
    this.json = data

    const spoonacular = new Spoonacular()

    // this will reset the struction of the section element within our shadow root
    this.shadowRoot.querySelector("section").innerHTML = `
      <div class="row">
        <div class="col-xs-1">
          <div class="favorite-button hover-tip">
            <button id="fav-btn">
              <img src="./assets/icons/favorite/favorite-blank.png" width="30px" height="30px" alt="favorite">
              <span class="hover-tip-text" >Favorite Recipe </span>
            </button>
          </div>
        </div>
        <div class="col-sm-6">  
          <div class="rounded">
            <aside id ="card-visuals">
              <fig id="visual">
                <img id="recipe-image" src="" alt="recipe-image"/>
                <figcaption class="justify-content-center" id="recipe-dietary">
                  <div class="hover-tip">
                    <img id="dairy-free" src="./assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                    <span class="hover-tip-text" >Dairy Free</span>
                  </div>
                  <div class="hover-tip">
                    <img id="gluten-free" src="./assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                    <span class="hover-tip-text">Gluten Free</span>
                  </div>
                  <div class="hover-tip">
                    <img id="vegan" src="./assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                    <span class="hover-tip-text">Vegan</span>
                  </div>
                  <div class="hover-tip">
                    <img id="vegetarian" src="./assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                    <span class="hover-tip-text">Vegetarian</span>
                  </div>
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

    // set price and price icon
    const price = spoonacular.getRecipePrice(data)
    const numericalPrice = this.#extractPrice(price)
    if(numericalPrice < 10){
      this.shadowRoot.getElementById('recipe-price').innerHTML 
        = '<img src="./assets/icons/font-awesome/price/1-dollar.png" width = "30px" height = "30px">';
    }else if(numericalPrice <30){
      this.shadowRoot.getElementById('recipe-price').innerHTML 
        ='<img src="./assets/icons/font-awesome/price/2-dollar.png" width = "30px" height = "30px">';
    }else{
      this.shadowRoot.getElementById('recipe-price').innerHTML
        ='<img src="./assets/icons/font-awesome/price/3-dollar.png" width = "30px" height = "30px">'  
    }
    this.shadowRoot.getElementById('recipe-price').innerHTML += price

    // set time and time icon
    const time = spoonacular.getRecipeCookingTime(data)
    const numericalTime = this.#extractCookingTime(time);
    if(numericalTime < 15){
      this.shadowRoot.getElementById('recipe-cooking-time').innerHTML 
        = '<img src="./assets/icons/font-awesome/cooking-time/less-than-15-min.png" width = "30px" height = "30px">';
    }else if(numericalTime < 45){
      this.shadowRoot.getElementById('recipe-cooking-time').innerHTML 
        ='<img src="./assets/icons/font-awesome/cooking-time/between-15-and-45.png" width = "30px" height = "30px">';
    }else{
      this.shadowRoot.getElementById('recipe-cooking-time').innerHTML
       ='<img src="./assets/icons/font-awesome/cooking-time/over-45-min.png" width = "30px" height = "30px">'  
    }
    this.shadowRoot.getElementById('recipe-cooking-time').innerHTML += time

    // set score and score icon
    const score = spoonacular.getRecipeScore(data)
    const numericalScore = this.#extractScore(score);
    if(numericalScore < 30){
      this.shadowRoot.getElementById('recipe-score').innerHTML 
        = '<img src="./assets/icons/font-awesome/score/sad-face.png" width = "30px" height = "30px">';
    }else if(numericalScore < 70){
      this.shadowRoot.getElementById('recipe-score').innerHTML 
        ='<img src="./assets/icons/font-awesome/score/neutral-face.png" width = "30px" height = "30px">';
    }else{
      this.shadowRoot.getElementById('recipe-score').innerHTML
        ='<img src="./assets/icons/font-awesome/score/smiley-face.png" width = "30px" height = "30px">'  
    }
    this.shadowRoot.getElementById('recipe-score').innerHTML += score

    // set servings and servings icon
    const servings = spoonacular.getRecipeServings(data)
    const numericalServings = this.#extractServings(servings);
    if(numericalServings == 1){
      this.shadowRoot.getElementById('recipe-servings').innerHTML 
        = '<img src="./assets/icons/font-awesome/servings/one-serving.png" width = "30px" height = "30px">';
    }else if(numericalTime == 2){
      this.shadowRoot.getElementById('recipe-servings').innerHTML 
        ='<img src="./assets/icons/font-awesome/servings/two-servings.png" width = "30px" height = "30px">';
    }else{
      this.shadowRoot.getElementById('recipe-servings').innerHTML
        ='<img src="./assets/icons/font-awesome/servings/three-plus-servings.png" width = "30px" height = "30px">'  
    }
    this.shadowRoot.getElementById('recipe-servings').innerHTML += servings

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

    //Determine whether or not the recipe is favorite before
    //If it is then it should change the icon to red heart
    const favoriteButton = this.shadowRoot.querySelector('button');
    const favImg = this.shadowRoot.querySelector('button img');
    if(  JSON.parse( myStorage.getItem("FAVORITE_LIST") )[title] ){
      favImg.setAttribute('src', "./assets/icons/favorite/favorite-red.png")
      favImg.setAttribute('alt', 'unfavorite')
    }
    
    //set favorite Button functionality
    //when button is click it is either favorite the recipe 
    //or it will unfavorite the recipe
    favoriteButton.addEventListener('click', (event) => {
      let localFavoriteList = JSON.parse(myStorage.getItem("FAVORITE_LIST"))
      if(favImg.alt == "favorite"){
        event.stopPropagation();//use to stop recipecard's event listener to execute
        localFavoriteList[title] = data
        console.log(`Adding ${title} to Favorite List...`)
        myStorage.setItem("FAVORITE_LIST",JSON.stringify(localFavoriteList))
        favImg.setAttribute('src', "./assets/icons/favorite/favorite-red.png")
        favImg.setAttribute('alt', 'unfavorite')
      }
      else if(favImg.alt == "unfavorite"){
        event.stopPropagation();//use to stop recipecard's event listener to execute
        delete localFavoriteList[title]
        console.log(`Removing ${title} from Favorite List...`)
        myStorage.setItem("FAVORITE_LIST",JSON.stringify(localFavoriteList))
        favImg.setAttribute('src', "./assets/icons/favorite/favorite-blank.png")
        favImg.setAttribute('alt', 'favorite')
      }
    })
  }
  /**
   * Parse the numerical price from the spoonacular.js
   * representation of a recipe price
   * @param {string} priceString
   * @returns {Number} recipe spoonacular price
   * @private
   */
   #extractPrice(priceString) {
    let dollarIndex = priceString.indexOf("$");
    let value = priceString.substring(dollarIndex + 1);
    return Number(value);
  }

  /**
   * Parse the spoonacular score from the spoonacular.js
   * representation of a recipe price
   * @param {string} scoreString
   * @returns {Number} recipe spoonacular score
   * @private
   */
  #extractScore(scoreString) {
    let slashIndex = scoreString.indexOf("/");
    let value = scoreString.substring(7, slashIndex);
    return Number(value);
  }
    
  /**
   * Parse the recipe servings from the spoonacular.js
   * representation of a recipe price
   * @param {string} priceString
   * @returns {Number} recipe servings
   * @private
   */
   #extractServings(scoreString) {
      let colonIndex = scoreString.indexOf(":")+1; //include space
      let value = scoreString.substring(colonIndex);
      return Number(value);
    }
    
  /**
   * Parse the numerical cooking time from the spoonacular.js
   * representation of a recipe cooking time
   * @param {string} cookingString
   * @returns {number} recipe cooking time
   * @private
   */
  #extractCookingTime(cookingString) {
    let spaceIndex = cookingString.indexOf(" ");
    let value = cookingString.substring(spaceIndex + 1);
    return Number(value);
  }
}


customElements.define('recipe-card', recipeCard)
