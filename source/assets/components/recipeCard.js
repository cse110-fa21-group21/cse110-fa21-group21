// recipeCard.js
import { Spoonacular } from '../scripts/spoonacular.js'

class recipeCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    const card = document.createElement('section');
    card.classList.add('card');
    card.classList.add('container');
    const style = document.createElement('style');
    style.innerHTML = `
      #recipe-title {
        text-align: center;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-dietary {
        display: flex;
        max-width: 600px;
        max-height: 500px;
        width: auto;
        height: auto;
        border-radius: 10px;
        margin: 20px;
      }
      
      #recipe-image {
        display: block;
        max-width: 600px;
        max-height: 500px;
        width: auto;
        height: auto;
        border-radius: 10px;
        margin: 20px;
      }
      
      #recipe-price {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-servings {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-cooking-time {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-calories {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-score {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
      
      #recipe-total-calories {
        text-align: left;
        margin: 20px;
        font-size: x-large;
        border: 2.5px solid;
        border-radius: 10px;
      }
     `

    card.innerHTML = `
      <div class="row">
        <div class="col">
          <div class="img-square-wrapper">
            <aside id ='card-visuals'>
              <fig id='visual'>
                <img id='recipe-image' src='' alt='recipe-image'/>
                <figcaption class="justify-content-center" id='recipe-dietary'>
                    <img id='dairy-free' src='/assets/icons/dietary/dairy-free.png' width = 30px height = 30px hidden alt='Dairy Free'/>
                    <img id='gluten-free' src='/assets/icons/dietary/gluten-free.png' width = 30px height = 30px hidden alt='Gluten Free'/>
                    <img id='vegan' src='/assets/icons/dietary/vegan.png' width = 30px height = 30px hidden alt='Vegan'/>
                    <img id='vegetarian' src='/assets/icons/dietary/vegetarian.png' width = 30px height = 30px hidden alt='Vegetarian'/>
                </figcaption>
              </fig>
            </aside>
          </div>
        </div>
        <div class="col">
            <div class="row"> 
              <div class="col" id="recipe-title"> Title </div>
            </div> 
            <div class="row">
              <div class="col" id="recipe-price"> Price </div>
              <div class="col" id="recipe-servings"> Recipe Servings </div>
            </div>
            <div class="row"> 
              <div class="col" id="recipe-cooking-time"> Cooking Time </div>
              <div class="col" id="recipe-calories"> Calories Per Serving </div>   
            </div>
            <div class="row">
              <div class="col" id="recipe-score"> Recipe Score </div>
              <div class="col" id="recipe-total-calories"> Total Calories </div>               
            </div>
        </div>
      </div>
     `
    this.shadowRoot.append(style, card)
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
    this.shadowRoot.querySelector('section').innerHTML = `
      <div class="row">
        <div class="col">
          <div class="img-square-wrapper">
            <aside id ='card-visuals'>
              <fig id='visual'>
                <img id='recipe-image' src='' alt='recipe-image'/>
                <figcaption class="justify-content-center" id='recipe-dietary'>
                    <img id='dairy-free' src='../../../source/assets/icons/dietary/dairy-free.png' width = 30px height = 30px hidden alt='Dairy Free'/>
                    <img id='gluten-free' src='../../../source/assets/icons/dietary/gluten-free.png' width = 30px height = 30px hidden alt='Gluten Free'/>
                    <img id='vegan' src='../../../source/assets/icons/dietary/vegan.png' width = 30px height = 30px hidden alt='Vegan'/>
                    <img id='vegetarian' src='../../../source/assets/icons/dietary/vegetarian.png' width = 30px height = 30px hidden alt='Vegetarian'/>
                </figcaption>
              </fig>
            </aside>
          </div>
        </div>
        <div class="col">
            <div class="row"> 
              <div class="col" id="recipe-title"> Title </div>
            </div> 
            <div class="row">
              <div class="col" id="recipe-price"> Price </div>
              <div class="col" id="recipe-servings"> Recipe Servings </div>
            </div>
            <div class="row"> 
              <div class="col" id="recipe-cooking-time"> Cooking Time </div>
              <div class="col" id="recipe-calories"> Calories Per Serving </div>   
            </div>
            <div class="row">
              <div class="col" id="recipe-score"> Recipe Score </div>
              <div class="col" id="recipe-total-calories"> Total Calories </div>               
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
