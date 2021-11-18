//recipeCard.js
import { Spoonacular } from "../scripts/spoonacular.js";

class recipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    //Change to article instead of section, because I wrote a shown
    //class in CSS that hide all section without class shown
    const card = document.createElement('article');
    const style = document.createElement("style");
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
     `;

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
            <figcaption id='recipe-dietary'> </figcaption>
          </fig>
      </aside>
     `;

     this.shadowRoot.append(style,card);
  }
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
            <figcaption id='recipe-dietary'> </figcaption>
          </fig>
        </aside>
      </section> 
    ***** END OF SHADOW DOM *****
    <recipe-card>
  ***************************************/
  
  /**
   * Change make to recipeCard instead keep create elements
   * Setting the structure of shadowRoot to what it need to be
   * then we can just call data to set up information for each 
   * part of the recipecard
   * I did not get what is recipe-dietary part doing so I didnt 
   * do that in the set data
   */
  set data(data) {
    this.json = data;
    
    const spoonacular = new Spoonacular();

    //this will reset the struction of the shadowRoot
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
          <figcaption id='recipe-dietary'> </figcaption>
        </fig>
      </aside>
    `;

    //set title
    const title = spoonacular.getRecipeTitle(data);
    this.shadowRoot.getElementById('recipe-title').innerHTML = title;
    
    //set price
    const price = spoonacular.getRecipePrice(data);
    this.shadowRoot.getElementById('recipe-price').innerHTML = price;

    //set time
    const time = spoonacular.getRecipeCookingTime(data);
    this.shadowRoot.getElementById('recipe-cooking-time').innerHTML = time;

    //set score
    const score = spoonacular.getRecipeScore(data);
    this.shadowRoot.getElementById('recipe-score').innerHTML = score;
    
    //set servings
    const servings = spoonacular.getRecipeServings(data);
    this.shadowRoot.getElementById('recipe-servings').innerHTML = servings;
    
    //set calories
    const calories = spoonacular.getRecipeCalories(data);
    this.shadowRoot.getElementById('recipe-calories').innerHTML = calories;

    //set totalCalories
    const totalCalories = spoonacular.getRecipeTotalCalories(data);
    this.shadowRoot.getElementById('recipe-total-calories').innerHTML = totalCalories;

    //set image.src
    const image = spoonacular.getRecipeImageSource(data);
    this.shadowRoot.getElementById('recipe-image').setAttribute('src',image);

  //   const cardVisuals = document.createElement("aside");
  //   cardVisuals.id = "card-visuals";

  //   const cardInformation = document.createElement("main");
  //   cardInformation.id = "card-information";

  //   function setCardVisuals() {
  //     const visual = document.createElement("figure");
  //     visual.id = "visual";
  //     /** RECIPE IMAGE */
  //     const recipeImage = document.createElement("img");
  //     recipeImage.id = "recipe-image";
  //     recipeImage.src = spoonacular.getRecipeImageSource(data);

  //     /** RECIPE IMAGE CAPTION */
  //     const recipeDietary = document.createElement("figcaption");
  //     recipeDietary.id = "recipe-dietary";
      
  //     function setRecipeDietary(){
  //       const dietary = spoonacular.getRecipeDietary(data);
  //       let dietaryIcon;
  //       if(dietary["vegan"]){
  //         dietaryIcon = document.createElement('img');
  //         dietaryIcon.src = '../icons/dietary/vegan.png'; //index.html path: assets/icons/dietary/vegan.png
  //         dietaryIcon.alt = "Vegan"
  //         recipeDietary.appendChild(dietaryIcon);
  //       }
  //       if(dietary["vegetarian"]){
  //         dietaryIcon = document.createElement('img');
  //         dietaryIcon.src = '../icons/dietary/vegetarian.png'; //index.html path: assets/icons/dietary/vegetarian.png
  //         dietaryIcon.alt = "Vegetarian"
  //         recipeDietary.appendChild(dietaryIcon);
  //       }
  //       if(dietary["gluten-free"]){
  //         dietaryIcon = document.createElement('img');
  //         dietaryIcon.src = '../icons/dietary/gluten-free.png'; //index.html path: assets/icons/dietary/gluten-free.png
  //         dietaryIcon.alt = "Gluten Free"
  //         recipeDietary.appendChild(dietaryIcon);
  //       }
  //       if(dietary["dairy-free"]){
  //         dietaryIcon = document.createElement('img');
  //         dietaryIcon.src = '../icons/dietary/dairy-free.png'; //index.html path: assets/icons/dietary/dairy-free.png
  //         dietaryIcon.alt = "Dairy Free"
  //         recipeDietary.appendChild(dietaryIcon);
  //       }
  //     }
  //     setRecipeDietary();

  //     visual.appendChild(recipeImage);
  //     visual.appendChild(recipeDietary);

  //     cardVisuals.appendChild(visual);
  //   }

  //   function setCardInformation() {
  //     /** RECIPE TITLE */
  //     const recipeTitle = document.createElement("div");
  //     recipeTitle.id = "recipe-title";
  //     recipeTitle.innerHTML = spoonacular.getRecipeTitle(data);

  //     /** RECIPE PRICE */
  //     const recipePrice = document.createElement("div");
  //     recipePrice.id = "recipe-price";
  //     recipePrice.innerHTML = spoonacular.getRecipePrice(data);

  //     /** RECIPE COOKING TIME */
  //     const recipeCookingTime = document.createElement("div");
  //     recipeCookingTime.id = "recipe-cooking-time";
  //     recipeCookingTime.innerHTML = spoonacular.getRecipeCookingTime(data);

  //     /** RECIPE SCORE */
  //     const recipeScore = document.createElement("div");
  //     recipeScore.id = "recipe-score";
  //     recipeScore.innerHTML = spoonacular.getRecipeScore(data);

  //     /** RECIPE SERVING */
  //     const recipeServings = document.createElement("div");
  //     recipeServings.id = "recipe-servings";
  //     recipeServings.innerHTML = spoonacular.getRecipeServings(data);

  //     /** RECIPE CALORIES */
  //     const recipeCalories = document.createElement("div");
  //     recipeCalories.id = "recipe-calories";
  //     recipeCalories.innerHTML = spoonacular.getRecipeCalories(data);

  //     /** RECIPE TOTAL CALORIES */
  //     const recipeTotalCalories = document.createElement("div");
  //     recipeTotalCalories.id = "recipe-total-calories";
  //     recipeTotalCalories.innerHTML = spoonacular.getRecipeTotalCalories(data);

  //     cardInformation.appendChild(recipeTitle);
  //     cardInformation.appendChild(recipePrice);
  //     cardInformation.appendChild(recipeCookingTime);
  //     cardInformation.appendChild(recipeScore);
  //     cardInformation.appendChild(recipeServings);
  //     cardInformation.appendChild(recipeCalories);
  //     cardInformation.appendChild(recipeTotalCalories);
  //   }

  //   setCardVisuals();
  //   setCardInformation();

  //   card.appendChild(cardVisuals);
  //   card.appendChild(cardInformation);

  //   this.shadowRoot.appendChild(style);
  //   this.shadowRoot.appendChild(card);
  // }
  }
}

customElements.define("recipe-card", recipeCard);
