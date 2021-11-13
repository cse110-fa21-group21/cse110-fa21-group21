//recipeViewer.js
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
      recipeTitle.innerHTML = getRecipeTitle(data);
      /** RECIPE INGREDIENTS */
      const recipeIngredients = document.createElement("div");
      recipeIngredients.id = "recipe-ingredients";
      recipeIngredients.appendChild(getRecipeIngredientsList(data));
      /** RECIPE INSTRUCTIONS */
      const recipeInstructions = document.createElement("div");
      recipeInstructions.id = "recipe-instructions";
      recipeInstructions.appendChild(getRecipeInstructionsList(data));

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
      recipeImage.src = getRecipeImageSource(data);

      /** RECIPE IMAGE CAPTION */
      const recipeDietary = document.createElement("figcaption");
      recipeDietary.id = "recipe-dietary";
      function setRecipeDietary(){
        const dietary = getRecipeDietary(data);
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
/** HELPER METHODS */
function getRecipeTitle(data) {
  return data.title;
}
function getRecipeImageSource(data) {
  return data.image;
}
function getRecipeInstructionsList(data) {
  if (data) {
    const instructions = data["analyzedInstructions"][0]["steps"];
    const instructionsListElem = document.createElement('ol');
    for(let i = 0; i< instructions.JSON; i++){
      const listEntry = document.createElement('li');
      listEntry.innerHTML = instructions[i]["step"];
      instructionsListElem.appendChild(listEntry);
    }
    return instructionsListElem;
  }
  return null;
}
function getRecipeIngredientsList(data) {
  if (data) {
    const ingredients = data["nutrition"]["ingredients"];
    const ingredientsListElem = document.createElement('ul')
    for (let i = 0; i < ingredients.length; i++) {
      const listEntry = document.createElement('li');
      listEntry.innerHTML = ingredients[i]["name"]
      ingredientsListElem.appendChild(listEntry);
    }
    return ingredientsListElem;
  }
  return null;
}
function getRecipeDietary(data){
  if(data){
    let dietary = {};
    dietary["vegan"] = data["vegan"];
    dietary["vegetarian"] = data["vegetarian"];
    dietary["dairy-free"] = data["dairyFree"]; 
    dietary["gluten-free"] = data["glutenFree"];
    return dietary;
  }
  return null;
}
customElements.define("recipe-viewer", recipeViewer);
