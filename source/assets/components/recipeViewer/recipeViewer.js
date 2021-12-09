// recipeViewer.js

import { 
  Spoonacular 
} from "../../scripts/api/api.module.js";

const spoonacular = new Spoonacular();
let myStorage = window.localStorage;
/**
 * Custom HTML element named recipeViewer.
 * Display more info about recipe: [e.g. Cooking Time, Instructions, Ingredients] after clicking on RecipeCard
 */
class recipeViewer extends HTMLElement {
  /**
    * Constructor sets up the default HTML for RecipeViewer
    */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <!-- Local StyleSheets -->
    <link rel="stylesheet" href="./assets/components/recipeViewer/recipeViewer.css">

    <!-- The Viewer Itself -->
    <section id="shadow"></section>

    <!-- Bootstrap JS -->
    <script 
     src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
     integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
     crossorigin = "anonymous"></script>
    `;
  }
  /**
    * Getter function for JSON file of recipeViewer
    * @returns {JSON} json of this recipeViewer
    */
  get data() {
    return this.json;
  }

  /**
   * Setter function for JSON file of recipeViewer
   * Fills in data for recipeViewer with data from Spoonacular API
   * Update: similiar to recipeCard change to reset information
   * for a recipe-viewer element instead creating
   * @param {JSON} data: Recipe Data from spoonacular API
   */
  set data(data) {
    this.json = data;

    this.shadowRoot.querySelector("section").innerHTML = `
    <main id = "card-information">
        <div id = "recipe-title"></div>
        <div class = "favorite-button">
          <img id = "fav-btn" src="assets/icons/favorite/favorite-blank.png" width = "30px" height = "30px" alt="favorite button">
          <button>Favorite the Recipe</button>
        </div>
        <section class = "flex-container">
          <div id = "left-flex">
            <aside id = "card-visuals">
              <fig id = "visual">
                <img id = "recipe-image" src="" alt="recipe-image"/>
                <figcaption id = "recipe-dietary">
                  <img id="dairy-free" src="assets/icons/dietary/dairy-free.png" width = "30px" height = "30px" hidden alt="Dairy Free"/>
                  <img id="gluten-free" src="assets/icons/dietary/gluten-free.png" width = "30px" height = "30px" hidden alt="Gluten Free"/>
                  <img id="vegan" src="assets/icons/dietary/vegan.png" width = "30px" height = "30px" hidden alt="Vegan"/>
                  <img id="vegetarian" src="assets/icons/dietary/vegetarian.png" width = "30px" height = "30px" hidden alt="Vegetarian"/>
                </figcaption>
              </fig>
            </aside>

            <div id = "info-container">
              <h4><span> Recipe Info </span></h4>
              <div id = "recipe-price"> </div>
              <div id = "recipe-cooking-time"> </div>
              <div id = "recipe-servings"></div>
              <div id = "recipe-calories"> </div> 
              <div id = "recipe-total-calories"></div>
              <div id = "recipe-score"></div>
            </div>

            <div id = "instruction-header"> <h2> Cooking Instructions </h2> </div>

            <div id = "recipe-instructions"> </div> 
          </div>

          <div id = "right-flex">
            <h4><span> Ingredients </span></h4>  
            <div id = "recipe-ingredients"> 
              <button id="select-all-ing">
                <img id="select-all-icon" src="assets/icons/select-all-icon.png" width = "40px" height = "40px" alt="Check All"/>
                Check All
              </button>
            </div>
            <button id="add-shopping">Add to the Shopping List</button>
          </div>
        </section> 
      </main>
    `;
    // set title
    const title = spoonacular.getRecipeTitle(data);
    this.shadowRoot.getElementById("recipe-title").innerHTML = title;

    // set price
    const price = spoonacular.getRecipePrice(data);
    this.shadowRoot.getElementById("recipe-price").innerHTML = price;

    // set time
    const time = spoonacular.getRecipeCookingTime(data);
    this.shadowRoot.getElementById("recipe-cooking-time").innerHTML = time;

    // set score
    const score = spoonacular.getRecipeScore(data);
    this.shadowRoot.getElementById("recipe-score").innerHTML = score;

    // set servings
    const servings = spoonacular.getRecipeServings(data);
    this.shadowRoot.getElementById("recipe-servings").innerHTML = servings;

    // set calories
    const calories = spoonacular.getRecipeCalories(data);
    this.shadowRoot.getElementById("recipe-calories").innerHTML = calories;

    // set totalCalories
    const totalCalories = spoonacular.getRecipeTotalCalories(data);
    this.shadowRoot.getElementById("recipe-total-calories").innerHTML =
      totalCalories;

    // set ingredients
    const ingredients = spoonacular.getRecipeIngredientsList(data);
    ingredients.querySelectorAll('li').forEach(
      (entry) => {
        const checkbox = entry.querySelector('input[type="checkbox"]');
        const label = entry.querySelector('label');
        const ingredient = label.innerText;
        const localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
        if(
          localShoppingList[title] 
          && 
          Object.keys(localShoppingList[title]).includes(ingredient)
        ){
          checkbox.checked = true
          checkbox.disabled = true
        }
      }
    )
    this.shadowRoot
      .getElementById("recipe-ingredients")
      .appendChild(ingredients);

    // set instructions
    const instructions = spoonacular.getRecipeInstructionsList(data);
    this.shadowRoot
      .getElementById("recipe-instructions")
      .appendChild(instructions);

    // set image
    const image = spoonacular.getRecipeImageSource(data);
    this.shadowRoot.getElementById("recipe-image").setAttribute("src", image);

    // set dietary logos
    const dietary = spoonacular.getRecipeDietary(data);
    if (dietary.vegan) {
      this.shadowRoot.getElementById("vegan").removeAttribute("hidden");
    }
    if (dietary.vegetarian) {
      this.shadowRoot.getElementById("vegetarian").removeAttribute("hidden");
    }
    if (dietary["gluten-free"]) {
      this.shadowRoot.getElementById("gluten-free").removeAttribute("hidden");
    }
    if (dietary["dairy-free"]) {
      this.shadowRoot.getElementById("dairy-free").removeAttribute("hidden");
    }

    //determine the text on button
    const favoriteButton = this.shadowRoot.querySelector('button');
    const favImg = this.shadowRoot.querySelector('#fav-btn');
    if(  JSON.parse( myStorage.getItem("FAVORITE_LIST") )[title] ){
      favoriteButton.textContent = "Remove the Favorite"
      favImg.setAttribute('src', "assets/icons/favorite/favorite-red.png")
      favImg.setAttribute('alt', 'unfavorite')
    }

    //set favorite Button functionality
    favoriteButton.addEventListener("click", () => {
      let localFavoriteList = JSON.parse(myStorage.getItem("FAVORITE_LIST"))
      if (favoriteButton.textContent == "Favorite the Recipe") {
        localFavoriteList[title] = data
        console.log(`Adding ${title} to Favorite List...`)
        favoriteButton.textContent = "Remove the Favorite";
        favImg.setAttribute("src", "assets/icons/favorite/favorite-red.png");
      } else if (favoriteButton.textContent == "Remove the Favorite") {
        delete localFavoriteList[title]
        console.log(`Removing ${title} from favorite list...`)
        favoriteButton.textContent = "Favorite the Recipe";
        favImg.setAttribute(
          "src",
          "./assets/icons/favorite/favorite-blank.png"
        );
      }
      myStorage.setItem("FAVORITE_LIST",JSON.stringify(localFavoriteList))
    });

    //Check All button for ingredients (Useful for adding to shopping list)
    this.shadowRoot.querySelector("#select-all-ing").addEventListener("click", () => {
      //Select descendant of recipe-ingredient
      let ingboxes = this.shadowRoot.querySelectorAll('input[class="form-check-input"]');
      
      for (let ingbox of ingboxes) {
        
        if(!ingbox.checked){
          console.log("Clicked: " + ingbox.id)
          ingbox.checked = true;
        }
      }
    }); 
    // ADDING TO THE SHOPPING LIST
    const addToShoppingListButton = this.shadowRoot.querySelector("#add-shopping");

    addToShoppingListButton.addEventListener("click", () => {
      // myStorage.removeItem(shoppingListTitle);
      // let ingredientListValue = [];
      let ingredientList = this.shadowRoot.querySelector("#recipe-ingredients");
      let ingredientUL = ingredientList.lastElementChild.children;

      // After getting UL loop through all the list elements
      const localShoppingList = JSON.parse(myStorage.getItem("SHOPPING_LIST"))
      let shoppingListObj;
      if(localShoppingList[title]) {
         shoppingListObj = localShoppingList[title];
      }else{
        shoppingListObj = {};
      }


      for (let i = 0; i < ingredientUL.length; i++) {
        let ingredientCheck = ingredientUL[i].querySelector("input");
        let ingredient = ingredientUL[i].querySelector("#ingredient");
        // Might have to use some sort of empty list?
        if (ingredientCheck.checked) {
            shoppingListObj[ingredient.innerHTML] = false;
            console.log(`Adding ${ingredient.innerHTML} to Shopping List`);
        }
      }

      //Retrieve and Parse the Local Storage Shopping List
      console.log(`Adding\n${title}: ${JSON.stringify(shoppingListObj,null,4)}\nto local storage...`);
      //Add the Recipe to the Shopping List
      localShoppingList[title] = shoppingListObj;
      myStorage.setItem("SHOPPING_LIST", JSON.stringify(localShoppingList));
      console.log(`SHOPPING_LIST: ${JSON.parse( JSON.stringify(myStorage.getItem("SHOPPING_LIST"),null,4) )} `);
    });
  }
}
customElements.define("recipe-viewer", recipeViewer);
