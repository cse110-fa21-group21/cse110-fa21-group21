//spoonacular.js
export class Spoonacular {
  constructor() {}

  /** RECIPE IMAGE SOURCE */
  getRecipeImageSource(data) {
    if (data) {
      return data["image"];
    }
    return null;
  }
  /** RECIPE TITLE */
  getRecipeTitle(data) {
    if (data) {
      return data["title"];
    }
    return null;
  }
  /** RECIPE PRICE */
  getRecipePrice(data) {
    if (data) {
      return (
        "Total Price: $" +
        Math.round(data["pricePerServing"] * data["servings"]) / 100
      );
    }
    return null;
  }
  /** RECIPE COOKING TIME */
  getRecipeCookingTime(data) {
    if (data) {
      return "Minutes: " + data["readyInMinutes"];
    }
    return null;
  }
  /** RECIPE SCORE */
  getRecipeScore(data) {
    if (data) {
      return "Score: " + data["spoonacularScore"] + "/100";
    }
    return null;
  }
  /** RECIPE CALORIES */
  getRecipeCalories(data) {
    if (data) {
      return (
        "Calories per Serving: " +
        Math.round(data["nutrition"]["nutrients"][0]["amount"])
      );
    }
    return null;
  }
  /** RECIPE SERVINGS */
  getRecipeServings(data) {
    if (data) {
      return "Servings: " + data["servings"];
    }
    return null;
  }
  /** RECIPE TOTAL CALORIES */
  getRecipeTotalCalories(data) {
    if (data) {
      return (
        "Total Calories: " +
        Math.round(
          data["nutrition"]["nutrients"][0]["amount"] * data["servings"]
        )
      );
    }
    return null;
  }
  /** RECIPE TOTAL DIETARY */
  getRecipeDietary(data) {
    if (data) {
      let dietary = {};
      dietary["vegan"] = data["vegan"];
      dietary["vegetarian"] = data["vegetarian"];
      dietary["dairy-free"] = data["dairyFree"];
      dietary["gluten-free"] = data["glutenFree"];
      return dietary;
    }
    return null;
  }
  /** RECIPE INSTRUCTIONS */
  getRecipeInstructionsList(data) {
    if (data) {
      const instructions = data["analyzedInstructions"][0]["steps"];
      const instructionsListElem = document.createElement("ol");
      for (let i = 0; i < instructions.length; i++) {
        const listEntry = document.createElement("li");
        listEntry.innerHTML = instructions[i]["step"];
        instructionsListElem.appendChild(listEntry);
      }
      return instructionsListElem;
    }
    return null;
  }
  /** RECIPE INGREDIENTS */
  getRecipeIngredientsList(data) {
    if (data) {
      const ingredients = data["nutrition"]["ingredients"];
      const ingredientsListElem = document.createElement("ul");
      for (let i = 0; i < ingredients.length; i++) {
        const listEntry = document.createElement("li");
        listEntry.innerHTML = ingredients[i]["name"];
        ingredientsListElem.appendChild(listEntry);
      }
      return ingredientsListElem;
    }
    return null;
  }
}
