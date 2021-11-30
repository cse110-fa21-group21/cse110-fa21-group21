import { Spoonacular } from "../scripts/spoonacular.js";
export class Filter {
  constructor(
  ) {
    this.#createCuisineSelection();
  }
  #spoonacular = new Spoonacular();
  /**
   * Upon being called all recipe cards are filtered. From then on,
   * upon any checkbox being clicked, we refilter the collecting again.
   */
  filtering() {
    //needed for filtering before new searches
    this.#goThroughElements();

    const checkboxByDiet = document.querySelector("form[id=filter-by-diet]");
    checkboxByDiet.addEventListener("click", () => {
      // Could use this to add some more functionality to the all button.
      this.#goThroughElements();
    });

    const checkboxByPrice = document.querySelector("form[id=filter-by-price]");
    checkboxByPrice.addEventListener("click", () => {
      this.#goThroughElements();
    });

    const checkboxByTime = document.querySelector("form[id=filter-by-time]");
    checkboxByTime.addEventListener("click", () => {
      this.#goThroughElements();
    });

    const selectByCuisine = document.querySelector("select[id=select-cuisine]");
    selectByCuisine.addEventListener("change", () => {
      this.#goThroughElements();
    });

    const searchByIngredientsButton = document.querySelector(
      "button[id=search-ingredients-button]"
    );
    searchByIngredientsButton.addEventListener("click", () => {
      this.#goThroughElements();
    });
  }

  /**
   * We iterate over the collection of recipe-cards and hide those that
   * do meet the various filters.
   * @private
   */
  #goThroughElements() {
    const recipeCards = 
      document.querySelector(".section-recipe-cards-wrapper")
              .querySelectorAll("recipe-card");
    recipeCards.forEach((card) => {
      card.classList.add("shown");
      card.classList.remove("hidden");
      // Should be a dietary check too?
      this.#priceAllChecked();
      this.#timeAllChecked();
      if (this.#checkPriceChecked()) {
        this.#filterByPrice(card);
      }
      if (this.#checkTimeChecked()) {
        this.#filterByTime(card);
      }
      if (this.#checkDietaryChecked()) {
        this.#filterByDietary(card);
      }
      if (!this.#defaultCuisineCheck()) {
        this.#filterByCuisine(card);
      }
      if (!this.#emptyIngredientsSearchCheck()) {
        this.#filterByIngredients(card);
      }
    });
  }

  /**
   * We check whether or not this recipe card falls into a range
   * that we have requested not to see. If so, we hide it.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByDietary(recipeCard) {
    //parse recipe score
    const recipeDietary = this.#extractDietary(recipeCard);

    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const dairy_free_diet = recipeDietary["dairy-free"];
    const gluten_free_diet = recipeDietary["gluten-free"];
    const vegetarian_diet = recipeDietary["vegetarian"];
    const vegan_diet = recipeDietary["vegan"];

    /**
     * determine which ranges are being filtered for
     *  - true: we want to see items in this range
     *  - false: we do not want to see item in this range
     */
    const dairy_free_checked = document.querySelector(
      "input[id=dairy-free-diet]"
    ).checked;
    const gluten_free_checked = document.querySelector(
      "input[id=gluten-free-diet]"
    ).checked;
    const vegetarian_checked = document.querySelector(
      "input[id=vegetarian-diet]"
    ).checked;
    const vegan_checked = document.querySelector(
      "input[id=vegan-diet]"
    ).checked;

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    if (dairy_free_checked && !dairy_free_diet) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }

    if (gluten_free_checked && !gluten_free_diet) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }

    if (vegetarian_checked && !vegetarian_diet) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }

    if (vegan_checked && !vegan_diet) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
  }

  /**
   * We check whether or not this recipe card falls into a range
   * that we have requested not to see. If so, we hide it.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByPrice(recipeCard) {
    // parse recipe price
    const recipePrice = this.#extractPrice(
      this.#spoonacular.getRecipePrice(recipeCard.json)
    );

    const ranges = [];
    const checks = [];
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_price = recipePrice >= 50.0;
    const second_price = recipePrice >= 20.0 && recipePrice < 50.0;
    const third_price = recipePrice >= 10.0 && recipePrice < 20.0;
    const fourth_price = recipePrice >= 5.0 && recipePrice < 10.0;
    const fifth_price = recipePrice >= 0.0 && recipePrice < 5.0;

    ranges.push(first_price);
    ranges.push(second_price);
    ranges.push(third_price);
    ranges.push(fourth_price);
    ranges.push(fifth_price);

    /**
     * determine which ranges are being filtered for
     *  - true: we want to see items in this range
     *  - false: we do not want to see item in this range
     */
    const first_checked = document.querySelector(
      "input[id=first-price]"
    ).checked;
    const second_checked = document.querySelector(
      "input[id=second-price]"
    ).checked;
    const third_checked = document.querySelector(
      "input[id=third-price]"
    ).checked;
    const fourth_checked = document.querySelector(
      "input[id=fourth-price]"
    ).checked;
    const fifth_checked = document.querySelector(
      "input[id=fifth-price]"
    ).checked;

    checks.push(first_checked);
    checks.push(second_checked);
    checks.push(third_checked);
    checks.push(fourth_checked);
    checks.push(fifth_checked);

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    this.#decider(recipeCard, ranges, checks);
  }

  /**
   * We check whether or not this recipe card falls into a range
   * that we have requested not to see. If so, we hide it.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByTime(recipeCard) {
    // parse recipe cooking time
    const recipeTime = this.#extractCookingTime(
      this.#spoonacular.getRecipeCookingTime(recipeCard.json)
    );

    const ranges = [];
    const checks = [];
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_time = recipeTime >= 60;
    const second_time = recipeTime >= 45 && recipeTime < 60;
    const third_time = recipeTime >= 30 && recipeTime < 45;
    const fourth_time = recipeTime >= 15 && recipeTime < 30;
    const fifth_time = recipeTime >= 0 && recipeTime < 15;

    ranges.push(first_time);
    ranges.push(second_time);
    ranges.push(third_time);
    ranges.push(fourth_time);
    ranges.push(fifth_time);

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    const first_checked = document.querySelector(
      "input[id=first-time]"
    ).checked;
    const second_checked = document.querySelector(
      "input[id=second-time]"
    ).checked;
    const third_checked = document.querySelector(
      "input[id=third-time]"
    ).checked;
    const fourth_checked = document.querySelector(
      "input[id=fourth-time]"
    ).checked;
    const fifth_checked = document.querySelector(
      "input[id=fifth-time]"
    ).checked;

    checks.push(first_checked);
    checks.push(second_checked);
    checks.push(third_checked);
    checks.push(fourth_checked);
    checks.push(fifth_checked);
    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    this.#decider(recipeCard, ranges, checks);
  }

  /**
   * Drop down menu which has the cuisines that a user can select.
   * This method will filter the user's choice and display the recipes that
   * have that cuisine that the user chooses.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByCuisine(recipeCard) {
    const cuisineValue = document.querySelector(
      "select[id=select-cuisine]"
    ).value;

    if (!this.#defaultCuisineCheck()) {
      let data = recipeCard.data;
      console.log(data);
      if (data) {
        let recipeCuisine = data["cuisines"];
        console.log(recipeCuisine);

        if (!recipeCuisine.includes(cuisineValue)) {
          recipeCard.classList.add("hidden");
          recipeCard.classList.remove("shown");
        }
      }
    }
  }

  /**
   * Search bar where the user types in the ingredient they want to filter by.
   * Searches the recipes to see if they include that specific ingredient, then
   * filters it to only show recipes with that ingredient.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByIngredients(recipeCard) {
    const searchByIngredientsText = document.querySelector(
      "input[id=search-ingredients]"
    ).value;

    if (!this.#emptyIngredientsSearchCheck()) {
      let data = recipeCard.data;
      if (data) {
        let recipeIngredientsData = data["nutrition"]["ingredients"];
        let recipeIngredients = [];

        recipeIngredientsData.forEach((recipe) => {
          recipeIngredients.push(recipe["name"]);
        });

        if (
          !recipeIngredients.includes(
            searchByIngredientsText.toLocaleLowerCase()
          )
        ) {
          recipeCard.classList.add("hidden");
          recipeCard.classList.remove("shown");
        }
      }
    }
  }

  /**
   * Ensures that no other filter within prices can be checked
   * when the 'all' filter is selected
   * @private
   */
  #priceAllChecked() {
    const all_checked = document.querySelector("input[id=all-price]").checked;
    // ensure no other checkbox within the same form can be checked if 'all' is checked
    if (all_checked) {
      document.querySelector("input[id=first-price]").checked = false;
      document.querySelector("input[id=second-price]").checked = false;
      document.querySelector("input[id=third-price]").checked = false;
      document.querySelector("input[id=fourth-price]").checked = false;
      document.querySelector("input[id=fifth-price]").checked = false;
    }
  }

  /**
   * Ensures that no other filter within times can be checked
   * when the 'all' filter is selected
   * @private
   */
  #timeAllChecked() {
    const all_checked = document.querySelector("input[id=all-time]").checked;
    if (all_checked) {
      document.querySelector("input[id=first-time").checked = false;
      document.querySelector("input[id=second-time]").checked = false;
      document.querySelector("input[id=third-time]").checked = false;
      document.querySelector("input[id=fourth-time]").checked = false;
      document.querySelector("input[id=fifth-time]").checked = false;
    }
  }

  /**
   * Checks if any filter is checked within dietary restrictions
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   */
  #checkDietaryChecked() {
    const first_checked = document.querySelector(
      "input[id=dairy-free-diet]"
    ).checked;
    const second_checked = document.querySelector(
      "input[id=gluten-free-diet]"
    ).checked;
    const third_checked = document.querySelector(
      "input[id=vegetarian-diet]"
    ).checked;
    const fourth_checked = document.querySelector(
      "input[id=vegan-diet]"
    ).checked;

    return first_checked || second_checked || third_checked || fourth_checked;
  }

  /**
   * Checks if any filter, excluding the 'all' filter, is checked within
   * prices
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   * @private
   */
  #checkPriceChecked() {
    const first_checked = document.querySelector(
      "input[id=first-price]"
    ).checked;
    const second_checked = document.querySelector(
      "input[id=second-price]"
    ).checked;
    const third_checked = document.querySelector(
      "input[id=third-price]"
    ).checked;
    const fourth_checked = document.querySelector(
      "input[id=fourth-price]"
    ).checked;
    const fifth_checked = document.querySelector(
      "input[id=fifth-price]"
    ).checked;

    return (
      first_checked ||
      second_checked ||
      third_checked ||
      fourth_checked ||
      fifth_checked
    );
  }

  /**
   * Checks if any filter, excluding the 'all' filter, is checked within
   * prices
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   * @private
   */
  #checkTimeChecked() {
    const first_checked = document.querySelector(
      "input[id=first-time]"
    ).checked;
    const second_checked = document.querySelector(
      "input[id=second-time]"
    ).checked;
    const third_checked = document.querySelector(
      "input[id=third-time]"
    ).checked;
    const fourth_checked = document.querySelector(
      "input[id=fourth-time]"
    ).checked;
    const fifth_checked = document.querySelector(
      "input[id=fifth-time]"
    ).checked;
    return (
      first_checked ||
      second_checked ||
      third_checked ||
      fourth_checked ||
      fifth_checked
    );
  }

  /***************************************************
           HELPER METHOD
    *************************************************/
  /**
   * Check to see which range the card falls into and if the coinciding check is false,
   * (a.k.a not requested) then we hide the card
   * @param {recipeCard} card  - the DOM in question
   * @param {boolean[]} ranges - only one element in the ranges is set to true by design,
   *                             (mutual exclusivity required)
   * @param {boolean[]} checks - reflective of the current selected checkboxes
   * @private
   */
  #decider(card, ranges, checks) {
    if (ranges.length != checks.length) {
      console.log(
        "error: length of ranges ${ranges} is not the same as ${checks}"
      );
      return;
    }

    ranges.forEach((range, index) => {
      /**
       * if an item falls into a range but we are not requesting to see
       * it then it should be hidden
       */
      if (range && !checks[index]) {
        card.classList.add("hidden");
        card.classList.remove("shown");
      }
    });
  }

  /***************************************************
           HELPER METHODS -- PARSERS 
    *************************************************/
  /**
   * Parse the numerical score from the spoonacular.js
   * representation of a recipe score
   * @param {string} scoreString
   * @returns {Number} recipe spoonacular score
   * @private
   */
  #extractDietary(recipeCard) {
    const dietary = {};
    dietary["dairy-free"] =
      !recipeCard.shadowRoot.getElementById("dairy-free").hidden;
    dietary["gluten-free"] =
      !recipeCard.shadowRoot.getElementById("gluten-free").hidden;
    dietary["vegetarian"] =
      !recipeCard.shadowRoot.getElementById("vegetarian").hidden;
    dietary["vegan"] = !recipeCard.shadowRoot.getElementById("vegan").hidden;
    return dietary;
  }

  /**
   * Parse the numerical price from the spoonacular.js
   * representation of a recipe price
   * @param {string} priceString
   * @returns {Number} recipe spoonacular price
   * @private
   */
  #extractPrice(priceString) {
    let dollarIndex = priceString.indexOf("$");
    let value = priceString.substring(dollarIndex + 1);
    return Number(value);
  }

  /**
   * Parse the numerical cooking time from the spoonacular.js
   * representation of a recipe cooking time
   * @param {string} cookingString
   * @returns {number} recipe cooking time
   * @private
   */
  #extractCookingTime(cookingString) {
    let spaceIndex = cookingString.indexOf(" ");
    let value = cookingString.substring(spaceIndex + 1);
    return Number(value);
  }

  /***************************************************
           HELPER METHODS -- CUISINE & INGREDIENTS 
    *************************************************/

  /**
   * Creates the cuisine selection list (HTML)
   */
  #createCuisineSelection() {
    const cuisines = [
      "African",
      "American",
      "Asian",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ];

    const cuisineSelector = document.querySelector("select[id=select-cuisine]");
    let defaultOption = document.createElement("option");
    defaultOption.value = "default";
    defaultOption.innerHTML = "---Pick a Cuisine to Filter By---";
    cuisineSelector.add(defaultOption, null);

    cuisines.forEach((cuisine) => {
      let cuisineOption = document.createElement("option");
      cuisineOption.value = cuisine;
      cuisineOption.innerHTML = cuisine;
      cuisineSelector.add(cuisineOption, null);
    });
  }

  /**
   * Checks to see if the selection is on the default value so no other actions
   * will be taken
   * @returns {Boolean} Comparison between the selected cuisine and the default string
   */
  #defaultCuisineCheck() {
    const cuisineValue = document.querySelector(
      "select[id=select-cuisine]"
    ).value;
    return cuisineValue === "default";
  }

  /**
   * Checks to see if the search bar for ingredients is empty, if it is
   * there's no point in performing any actions on it
   * @returns {Boolean} Comparison between the searched ingredient and the empty string
   */
  #emptyIngredientsSearchCheck() {
    const searchByIngredientsText = document.querySelector(
      "input[id=search-ingredients]"
    ).value;

    return searchByIngredientsText === "";
  }
}
