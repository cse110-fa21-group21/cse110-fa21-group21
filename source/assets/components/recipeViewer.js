//recipeViewer.js

import { Spoonacular } from "../scripts/spoonacular.js";
const spoonacular = new Spoonacular();

class recipeViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  /*********  CARD STRUCTURE ***********
    <recipe-viewer>
    ***** Shadow DOM *****
      <section>
        <main id='card-information'>
          <div id='recipe-title'> </div>
          <div id='recipe-ingredients'> </div>
          <div id='recipe-instructions'> </div>
        </main>
        <aside id ='card-visuals'>
          <fig id='visual'>
            <img id='recipe-image'/>
            <figcaption id='recipe-dietary'>
          </fig>
        </aside>
      </section> 
    ***** END OF SHADOW DOM *****
    <recipe-viewer>
  ***************************************/
  set data(data) {
    const card = document.createElement("section");
    const style = document.createElement("style");
    style.innerHTML = ``;

    const cardInformation = document.createElement("main");
    const cardVisuals = document.createElement("aside");

    function setCardInformation() {
      /** RECIPE TITLE */
      const recipeTitle = document.createElement("div");
      recipeTitle.id = "recipe-title";
      recipeTitle.innerHTML = spoonacular.getRecipeTitle(data);
      /** RECIPE INGREDIENTS */
      const recipeIngredients = document.createElement("div");
      recipeIngredients.id = "recipe-ingredients";
      recipeIngredients.appendChild(spoonacular.getRecipeIngredientsList(data));
      /** RECIPE INSTRUCTIONS */
      const recipeInstructions = document.createElement("div");
      recipeInstructions.id = "recipe-instructions";
      recipeInstructions.appendChild(spoonacular.getRecipeInstructionsList(data));

      cardInformation.appendChild(recipeTitle);
      cardInformation.appendChild(recipeIngredients);
      cardInformation.appendChild(recipeInstructions);
    }
    function setCardVisuals() {
      const visual = document.createElement("figure");
      visual.id = "visual";
      /** RECIPE IMAGE */
      const recipeImage = document.createElement("img");
      recipeImage.id = "recipe-image";
      recipeImage.src = spoonacular.getRecipeImageSource(data);

      /** RECIPE IMAGE CAPTION */
      const recipeDietary = document.createElement("figcaption");
      recipeDietary.id = "recipe-dietary";
      function setRecipeDietary(){
        const dietary = spoonacular.getRecipeDietary(data);
        let dietaryIcon;
        if(dietary["vegan"]){
          dietaryIcon = document.createElement('img');
          dietaryIcon.src = '../icons/dietary/vegan.png';
          dietaryIcon.alt = "Vegan"
          recipeDietary.appendChild(dietaryIcon);
        }
        if(dietary["vegetarian"]){
          dietaryIcon = document.createElement('img');
          dietaryIcon.src = '../icons/dietary/vegetarian.png';
          dietaryIcon.alt = "Vegetarian"
          recipeDietary.appendChild(dietaryIcon);
        }
        if(dietary["gluten-free"]){
          dietaryIcon = document.createElement('img');
          dietaryIcon.src = '../icons/dietary/gluten-free.png';
          dietaryIcon.alt = "Gluten Free"
          recipeDietary.appendChild(dietaryIcon);
        }
        if(dietary["dairy-free"]){
          dietaryIcon = document.createElement('img');
          dietaryIcon.src = '../icons/dietary/dairy-free.png';
          dietaryIcon.alt = "Dairy Free"
          recipeDietary.appendChild(dietaryIcon);
        }
      }
      setRecipeDietary();

      visual.appendChild(recipeImage);
      visual.appendChild(recipeDietary);

      cardVisuals.appendChild(visual);
    }
    setCardVisuals();
    setCardInformation();

    card.appendChild(cardVisuals);
    card.appendChild(cardInformation);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(card);
  }
}

customElements.define("recipe-viewer", recipeViewer);
