export class Filter{
  constructor(){}
  /**
   * Upon being called all recipe cards are filtered. From then on, 
   * upon any checkbox being clicked, we refilter the collecting again.
   */
   filtering() {
    //needed for filtering before new searches
    this.#goThroughElements();

    const checkboxByScore = document.querySelector("form[id=filterByScore]");
    checkboxByScore.addEventListener("click", () => {
      // Could use this to add some more functionality to the all button.
      this.#goThroughElements();
    });

    const checkboxByPrice = document.querySelector("form[id=filterByPrice]");
    checkboxByPrice.addEventListener("click", () => {
      this.#goThroughElements();
    });

    const checkboxByTime = document.querySelector("form[id=filterByTime]");
    checkboxByTime.addEventListener("click", () => {
      this.#goThroughElements();
    });
  }

  /**
   * We iterate over the collection of recipe-cards and hide those that
   * do meet the various filters.
   * @private
   */
   #goThroughElements() {
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach((card) => {
        card.classList.add("shown");
        card.classList.remove("hidden");
        this.#scoreAllChecked();
        this.#priceAllChecked();
        this.#timeAllChecked();
        if (this.#checkScoreChecked()) {
          this.#filterByScore(card);
        }
        if (this.#checkPriceChecked()) {
          this.#filterByPrice(card);
        }
        if (this.#checkTimeChecked()) {
          this.#filterByTime(card);
        }
    });
  }
  /**
   * We check whether or not this recipe card falls into a range
   * that we have requested not to see. If so, we hide it.
   * @param {recipeCard} recipeCard
   * @private
   */
  #filterByScore(recipeCard) {
    //parse recipe score
    const recipeScore = this.#extractScore(
      recipeCard.shadowRoot.getElementById("recipe-score").innerHTML
    );
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_range = recipeScore >= 75;
    const second_range = recipeScore >= 50 && recipeScore < 75;
    const third_range = recipeScore >= 25 && recipeScore < 50;
    const fourth_range = recipeScore >= 0 && recipeScore < 25;

    /**
     * determine which ranges are being filtered for
     *  - true: we want to see items in this range
     *  - false: we do not want to see item in this range
     */
    const first_checked = document.querySelector("input[id=first_score]").checked;
    const second_checked = document.querySelector("input[id=second_score]").checked;
    const third_checked = document.querySelector("input[id=third_score]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_score]").checked;
    
    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    if (first_range && !first_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (second_range && !second_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (third_range && !third_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (fourth_range && !fourth_checked) {
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
      recipeCard.shadowRoot.getElementById("recipe-price").innerHTML
    );
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_range = recipePrice >= 50.0;
    const second_range = recipePrice >= 20.0 && recipePrice < 50.0;
    const third_range = recipePrice >= 10.0 && recipePrice < 20.0;
    const fourth_range = recipePrice >= 5.0 && recipePrice < 10.0;
    const fifth_range = recipePrice >= 0.0 && recipePrice < 5.0;

    /**
     * determine which ranges are being filtered for
     *  - true: we want to see items in this range
     *  - false: we do not want to see item in this range
     */
    const first_checked = document.querySelector("input[id=first_price]").checked;
    const second_checked = document.querySelector("input[id=second_price]").checked;
    const third_checked = document.querySelector("input[id=third_price]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_price]").checked;
    const fifth_checked = document.querySelector("input[id=fifth_price]").checked;

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    if (first_range && !first_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (second_range && !second_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (third_range && !third_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (fourth_range && !fourth_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (fifth_range && !fifth_checked) {
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
   #filterByTime(recipeCard) {
    // parse recipe cooking time
    const recipeTime = this.#extractCookingTime(
      recipeCard.shadowRoot.getElementById("recipe-cooking-time").innerHTML
    );
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_time = recipeTime >= 60;
    const second_time = recipeTime >= 45 && recipeTime < 60;
    const third_time = recipeTime >= 30 && recipeTime < 45;
    const fourth_time = recipeTime >= 15 && recipeTime < 30;
    const fifth_time = recipeTime >= 0 && recipeTime < 15;
    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    const first_checked = document.querySelector("input[id=first_time]").checked;
    const second_checked = document.querySelector("input[id=second_time]").checked;
    const third_checked = document.querySelector("input[id=third_time]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_time]").checked;
    const fifth_checked = document.querySelector("input[id=fifth_time]").checked;
    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    if (first_time && !first_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (second_time && !second_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (third_time && !third_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (fourth_time && !fourth_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
    if (fifth_time && !fifth_checked) {
      recipeCard.classList.add("hidden");
      recipeCard.classList.remove("shown");
    }
  }


  /**
   * Ensures that no other filter within scores can be checked 
   * when the 'all' filter is selected
   * @private
   */
  #scoreAllChecked() {
    const all_checked = document.querySelector("input[id=all_score]").checked;
    // ensure no other checkbox within the same form can be checked if 'all' is checked
    if (all_checked) {
      document.querySelector("input[id=first_score]").checked = false;
      document.querySelector("input[id=second_score]").checked = false;
      document.querySelector("input[id=third_score]").checked = false;
      document.querySelector("input[id=fourth_score]").checked = false;
    }
  }
  /**
   * Ensures that no other filter within prices can be checked 
   * when the 'all' filter is selected
   * @private
   */
  #priceAllChecked() {
    const all_checked = document.querySelector("input[id=all_price]").checked;
    // ensure no other checkbox within the same form can be checked if 'all' is checked
    if (all_checked) {
      document.querySelector("input[id=first_price]").checked = false;
      document.querySelector("input[id=second_price]").checked = false;
      document.querySelector("input[id=third_price]").checked = false;
      document.querySelector("input[id=fourth_price]").checked = false;
      document.querySelector("input[id=fifth_price]").checked = false;
    }
  }
  /**
   * Ensures that no other filter within times can be checked 
   * when the 'all' filter is selected
   * @private
   */
  #timeAllChecked() {
    const all_checked = document.querySelector("input[id=all_time]").checked;
    if (all_checked) {
      document.querySelector("input[id=first_time").checked = false;
      document.querySelector("input[id=second_time]").checked = false;
      document.querySelector("input[id=third_time]").checked = false;
      document.querySelector("input[id=fourth_time]").checked = false;
      document.querySelector("input[id=fifth_time]").checked = false;
    }
  }

  /**
   * Checks if any filter, excluding the 'all' filter, is checked within 
   * scores
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   */
  #checkScoreChecked() {
    const first_checked = document.querySelector("input[id=first_score]").checked;
    const second_checked = document.querySelector("input[id=second_score]").checked;
    const third_checked = document.querySelector("input[id=third_score]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_score]").checked;

    return (first_checked || second_checked || third_checked || fourth_checked);
  }
  /**
   * Checks if any filter, excluding the 'all' filter, is checked within 
   * prices
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   * @private
   */
  #checkPriceChecked() {
    const first_checked = document.querySelector("input[id=first_price]").checked;
    const second_checked = document.querySelector("input[id=second_price]").checked;
    const third_checked = document.querySelector("input[id=third_price]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_price]").checked;
    const fifth_checked = document.querySelector("input[id=fifth_price]").checked;

    return (first_checked ||second_checked ||third_checked ||fourth_checked || fifth_checked);
  }
  /**
   * Checks if any filter, excluding the 'all' filter, is checked within 
   * prices
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   * @private
   */
  #checkTimeChecked() {
    const first_checked = document.querySelector("input[id=first_time]").checked;
    const second_checked = document.querySelector("input[id=second_time]").checked;
    const third_checked = document.querySelector("input[id=third_time]").checked;
    const fourth_checked = document.querySelector("input[id=fourth_time]").checked;
    const fifth_checked = document.querySelector("input[id=fifth_time]").checked;
    return (first_checked || second_checked || third_checked || fourth_checked || fifth_checked);
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
  #extractScore(scoreString) {
    let slashIndex = scoreString.indexOf("/");
    let value = scoreString.substring(7, slashIndex);
    return Number(value);
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
}
