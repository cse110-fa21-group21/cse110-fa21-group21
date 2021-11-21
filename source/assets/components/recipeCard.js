// recipeCard.js
import { Spoonacular } from '../scripts/spoonacular.js'

class recipeCard extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    const card = document.createElement('article')
    const style = document.createElement('style')
    style.innerHTML = `
      main > div {
        background: white;
        padding: 1em;
        border: 1px dashed grey;
        border-radius: 1px;
        margin: 15px;
      }

      #recipe-title{
        grid-area: title;
        text-align: center;
      }
      #recipe-price{
        grid-area: price;
      }
      #recipe-servings{
        grid-area: servings;
      }
      #recipe-cooking-time{
        grid-area: cooking-time;
      }
      #recipe-calories{
        grid-area: calories;
      }
      #recipe-score{
        grid-area: score;
      }
      #recipe-total-calories{
        grid-area: total-calories;
      }

      #card-information{
        grid-area: information;
        display: grid;
        align-content: start;
        grid-template-areas:
        "title title"
        ". ."
        "price servings"
        "cooking-time calories"
        "score total-calories";
      }

      #card-visuals{
        float: left;
        grid-template-columns: 1fr 1fr 1fr;
      }
     `

    card.innerHTML = `
      <main id='card-information'>
        <div id='recipe-title'> </div>
        <div id='recipe-price'> </div>
        <div id='recipe-cooking-time'> </div>
        <div id='recipe-score'> </div>
        <div id='recipe-servings'> </div>
        <div id='recipe-calories'> </div>
        <div id='recipe-total-calories'> </div>
      </main>
      <aside id ='card-visuals'>
      <fig id='visual'>
        <img id='recipe-image'/>
        <figcaption id='recipe-dietary'>
          <img hidden id='vegan' src='../icons/dietary/vegan.png' alt='Vegan'/>
          <img hidden id='vegetarian' src='../icons/dietary/vegetarian.png' alt='Vegetarian'/>
          <img hidden id='gluten-free' src='../icons/dietary/gluten-free.png' alt='Gluten Free'/>
          <img hidden id='dairy-free' src='../icons/dietary/dairy-free.png' alt='Dairy Free'/>            
        </figcaption>
      </fig>
      </aside>
     `

    this.shadowRoot.append(style, card)
  }

  get data(){
    return this.json;
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
    this.shadowRoot.querySelector('article').innerHTML = `
      <main id='card-information'>
        <div id='recipe-title'> </div>
        <div id='recipe-price'> </div>
        <div id='recipe-cooking-time'> </div>
        <div id='recipe-score'> </div>
        <div id='recipe-servings'> </div>
        <div id='recipe-calories'> </div>
        <div id='recipe-total-calories'> </div>
      </main>
      <aside id ='card-visuals'>
        <fig id='visual'>
          <img id='recipe-image'/>
          <figcaption id='recipe-dietary'> 
            <img hidden id='vegan' src='../icons/dietary/vegan.png' alt='Vegan'/>
            <img hidden id='vegetarian' src='../icons/dietary/vegetarian.png' alt='Vegetarian'/>
            <img hidden id='gluten-free' src='../icons/dietary/gluten-free.png' alt='Gluten Free'/>
            <img hidden id='dairy-free' src='../icons/dietary/dairy-free.png' alt='Dairy Free'/>
          </figcaption>
        </fig>
      </aside>
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
