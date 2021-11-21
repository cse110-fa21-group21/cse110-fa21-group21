// recipeViewer.js

import { Spoonacular } from '../scripts/spoonacular.js'
const spoonacular = new Spoonacular()

class recipeViewer extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    const article = document.createElement('article')

    article.innerHTML = `
    <section>
        <main id='card-information'>
          <div id='recipe-title'> </div>
          <div id='recipe-ingredients'> 
          </div>
          <div id='recipe-instructions'> 
          </div>
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
      </section> 
    `
    this.shadowRoot.append(article)
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

    this.shadowRoot.querySelector('article').innerHTML = `
    <section class='section--viewer-info shown'>
      <main id='card-information'>
        <div id='recipe-title'> </div>
        <div id='recipe-ingredients'> </div>
        <div id='recipe-instructions'> </div>
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
    </section> 
    `
    // set title
    const title = spoonacular.getRecipeTitle(data)
    this.shadowRoot.getElementById('recipe-title').innerHTML = title

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
  }
}

customElements.define('recipe-viewer', recipeViewer)
