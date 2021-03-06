// spoonacular.js
/**
 * Spoonacular class used to extract necessary data from given JSON file that was pulled from Spoonacular API.
 * Such as Recipe Image, Title, Cooking Instructions, Ingredients. 
 */
export class Spoonacular {
   /**
    * RECIPE IMAGE SOURCE
    * @return {img} Main Image of recipe, null if no data
    */
  getRecipeImageSource(data) {
    if (data) {
      return data.image;
    }
    return null;
  }

  /**
    * RECIPE TITLE
    * @return {string} Title of recipe, null if no data
    */
  getRecipeTitle(data) {
    if (data) {
      return data.title;
    }
    return null;
  }

  /**
    * RECIPE PRICE
    * @return {string} Total Price of recipe, null if no data
    */
  getRecipePrice(data) {
    if (data) {
      return (
        "Total Price: $" +
        Math.round(data.pricePerServing * data.servings) / 100
      );
    }
    return null;
  }

  /**
    * RECIPE COOKING TIME
    * @return {string} Cooking Time of recipe in Minutes, null if no data
    */
  getRecipeCookingTime(data) {
    if (data) {
      return "Minutes: " + data.readyInMinutes;
    }
    return null;
  }

   /**
    * RECIPE SCORE
    * @return {string} Score of recipe according to Spoonacular, null if no data
    */
  getRecipeScore(data) {
    if (data) {
      return "Score: " + data.spoonacularScore + "/100";
    }
    return null;
  }

  /**
    * RECIPE CALORIES
    * @return {string} Calories of recipe per serving, null if no data
    */
  getRecipeCalories(data) {
    if (data) {
      return (
        "Calories per Serving: " +
        Math.round(data.nutrition.nutrients[0].amount)
      );
    }
    return null;
  }

  /**
    * RECIPE Servings
    * @return {string} Serving Size of recipe in persons, null if no data
    */
  getRecipeServings(data) {
    if (data) {
      return "Servings: " + data.servings;
    }
    return null;
  }

  /**
    * RECIPE TOTAL CALORIES
    * @return {string} Total Calories of recipe, null if no data
    */
  getRecipeTotalCalories(data) {
    if (data) {
      return (
        "Total Calories: " +
        Math.round(data.nutrition.nutrients[0].amount * data.servings)
      );
    }
    return null;
  }

  /**
    * RECIPE TOTAL DIETARY
    * @return {string} Title of recipe, null if no data
    */
  getRecipeDietary(data) {
    if (data) {
      const dietary = {};
      dietary.vegan = data.vegan;
      dietary.vegetarian = data.vegetarian;
      dietary["dairy-free"] = data.dairyFree;
      dietary["gluten-free"] = data.glutenFree;
      return dietary;
    }
    return null;
  }

  /**
    * RECIPE INSTRUCTIONS 
    * @return {string} Instructions of recipe, null if no data
    */
  getRecipeInstructionsList(data) {
    if (data) {
      const instructions = data.analyzedInstructions[0].steps;
      const instructionsListElem = document.createElement("ol");
      for (let i = 0; i < instructions.length; i++) {
        const listEntry = document.createElement("li");
        listEntry.innerHTML = instructions[i].step;
        instructionsListElem.appendChild(listEntry);
      }
      return instructionsListElem;
    }
    return null;
  }

  /**
    * RECIPE INGREDIENTS
    * @return {string} Ingredients of recipe, null if no data
    */
  getRecipeIngredientsList(data) {
    if (data) {
      const ingredients = data.nutrition.ingredients;
      const ingredientsListElem = document.createElement("ul");
      ingredientsListElem.setAttribute("style", "list-style-type: none");
      for (let i = 0; i < ingredients.length; i++) {
        const listEntry = document.createElement("li");
        //Currently only found US units in Spoonacular!
        listEntry.innerHTML = `
         <input id="${ingredients[i].name + "-checkbox"}" class="form-check-input" type="checkbox">
         <label id="ingredient" for="${ingredients[i].name + "-checkbox"}" class="form-check-label">${ingredients[i].amount} ${ingredients[i].unit} of ${ingredients[i].name}</label>
        `
        ingredientsListElem.appendChild(listEntry);

        //To display ingredient data in console
        //console.log(JSON.stringify(ingredients[i]))
      }
      return ingredientsListElem;
    }
    return null;
  }
}
