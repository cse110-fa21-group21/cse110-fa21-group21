//recipeCard.js

/*********  CARD STRUCTURE ***********
  <recipe-card>
  ***** Shadow DOM *****
    <section>
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
        </fig>
      </aside>
    </section> 
  ***** END OF SHADOW DOM *****
  <recipe-card>
***************************************/

class recipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(data) {
    const card = document.createElement("section");
    const style = document.createElement("style");
    style.innerHTML = `
      main > div {
        background: white;
        padding: 1em;
        border: 1px dashed grey;
        border-radius: 1px;
        margin: 10px;
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
        float: left
      }
     `;
    const cardVisuals = document.createElement("aside");
    cardVisuals.id = "card-visuals";

    const cardInformation = document.createElement("main");
    cardInformation.id = "card-information";

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

      visual.appendChild(recipeImage);
      visual.appendChild(recipeDietary);

      cardVisuals.appendChild(visual);
    }

    function setCardInformation() {
      /** RECIPE TITLE */
      const recipeTitle = document.createElement("div");
      recipeTitle.id = "recipe-title";
      recipeTitle.innerHTML = getRecipeTitle(data);

      /** RECIPE PRICE */
      const recipePrice = document.createElement("div");
      recipePrice.id = "recipe-price";
      recipePrice.innerHTML = getRecipePrice(data);

      /** RECIPE COOKING TIME */
      const recipeCookingTime = document.createElement("div");
      recipeCookingTime.id = "recipe-cooking-time";
      recipeCookingTime.innerHTML = getRecipeCookingTime(data);

      /** RECIPE SCORE */
      const recipeScore = document.createElement("div");
      recipeScore.id = "recipe-score";
      recipeScore.innerHTML = getRecipeScore(data);

      /** RECIPE SERVING */
      const recipeServings = document.createElement("div");
      recipeServings.id = "recipe-servings";
      recipeServings.innerHTML = getRecipeServings(data);

      /** RECIPE CALORIES */
      const recipeCalories = document.createElement("div");
      recipeCalories.id = "recipe-calories";
      recipeCalories.innerHTML = getRecipeCalories(data);

      /** RECIPE TOTAL CALORIES */
      const recipeTotalCalories = document.createElement("div");
      recipeTotalCalories.id = "recipe-total-calories";
      recipeTotalCalories.innerHTML = getRecipeTotalCalories(data);

      cardInformation.appendChild(recipeTitle);
      cardInformation.appendChild(recipePrice);
      cardInformation.appendChild(recipeCookingTime);
      cardInformation.appendChild(recipeScore);
      cardInformation.appendChild(recipeServings);
      cardInformation.appendChild(recipeCalories);
      cardInformation.appendChild(recipeTotalCalories);
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
function getRecipeImageSource(data) {
  return data.image;
}

function getRecipeTitle(data) {
  return data.title;
}
/**
 * function return the toal cost of the recipe
 * Servings * pricePerServings
 **/
function getRecipePrice(data) {
  return Math.round(data.pricePerServing * data.servings);
}

function getRecipeCookingTime(data) {
  if (data) {
    return "Minutes: " + data["readyInMinutes"];
  }
  return null;
}

function getRecipeScore(data) {
  if (data) {
    return "Score: " + data["spoonacularScore"] + "/100";
  }
  return null;
}

function getRecipeCalories(data) {
  if (data) {
    return (
      "Calories per Serving: " +
      Math.round(data["nutrition"]["nutrients"][0]["amount"])
    );
  }
  return null;
}

function getRecipeServings(data) {
  if (data) {
    return "Servings: " + data["servings"];
  }
  return null;
}

function getRecipeTotalCalories(data) {
  if (data) {
    return (
      "Total Calories: " +
      Math.round(data["nutrition"]["nutrients"][0]["amount"] * data["servings"])
    );
  }
  return null;
}

// Potentially Useful Getter Functions

function getVegan(data) {
  if (data) {
    return data["vegan"];
  }
  return null;
}

function getVegetarian(data) {
  if (data) {
    return data["vegetarian"];
  }
  return null;
}

customElements.define("recipe-card", recipeCard);
