export class Filter{
  constructor(){}
  /**
   * Upon being called all recipe cards are filtered. From then on, 
   * upon any checkbox being clicked, we refilter the collecting again.
   */
   filtering() {
    //needed for filtering before new searches
    this.#goThroughElements();

    const checkboxByScore = document.querySelector("form[id=filter-by-score]");
    checkboxByScore.addEventListener("click", () => {
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
    
    const ranges = [];
    const checks = [];
    /**
     * determine in which range our element falls into, the ranges
     * by design must be mutually exclusive
     */
    const first_score = recipeScore >= 75;
    const second_score = recipeScore >= 50 && recipeScore < 75;
    const third_score = recipeScore >= 25 && recipeScore < 50;
    const fourth_score = recipeScore >= 0 && recipeScore < 25;
    
    ranges.push(first_score);
    ranges.push(second_score);
    ranges.push(third_score);
    ranges.push(fourth_score);

    /**
     * determine which ranges are being filtered for
     *  - true: we want to see items in this range
     *  - false: we do not want to see item in this range
     */
    const first_checked = document.querySelector("input[id=first-score]").checked;
    const second_checked = document.querySelector("input[id=second-score]").checked;
    const third_checked = document.querySelector("input[id=third-score]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-score]").checked;
    
    checks.push(first_checked);
    checks.push(second_checked);
    checks.push(third_checked);
    checks.push(fourth_checked);

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    this.#decider(recipeCard,ranges,checks);
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
    const first_checked = document.querySelector("input[id=first-price]").checked;
    const second_checked = document.querySelector("input[id=second-price]").checked;
    const third_checked = document.querySelector("input[id=third-price]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-price]").checked;
    const fifth_checked = document.querySelector("input[id=fifth-price]").checked;

    checks.push(first_checked);
    checks.push(second_checked);
    checks.push(third_checked);
    checks.push(fourth_checked);
    checks.push(fifth_checked);

    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    this.#decider(recipeCard,ranges,checks)
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
    const first_checked = document.querySelector("input[id=first-time]").checked;
    const second_checked = document.querySelector("input[id=second-time]").checked;
    const third_checked = document.querySelector("input[id=third-time]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-time]").checked;
    const fifth_checked = document.querySelector("input[id=fifth-time]").checked;

    checks.push(first_checked);
    checks.push(second_checked);
    checks.push(third_checked);
    checks.push(fourth_checked);
    checks.push(fifth_checked);
    /**
     * if an item falls into a range but we are not requesting to see
     * it then it should be hidden
     */
    this.#decider(recipeCard,ranges,checks)
  }


  /**
   * Ensures that no other filter within scores can be checked 
   * when the 'all' filter is selected
   * @private
   */
  #scoreAllChecked() {
    const all_checked = document.querySelector("input[id=all-score]").checked;
    // ensure no other checkbox within the same form can be checked if 'all' is checked
    if (all_checked) {
      document.querySelector("input[id=first-score]").checked = false;
      document.querySelector("input[id=second-score]").checked = false;
      document.querySelector("input[id=third-score]").checked = false;
      document.querySelector("input[id=fourth-score]").checked = false;
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
   * Checks if any filter, excluding the 'all' filter, is checked within 
   * scores
   * @returns {boolean} true -- if at least one of the checkboxes is checked
   * @returns {boolean} false -- otherwise
   */
  #checkScoreChecked() {
    const first_checked = document.querySelector("input[id=first-score]").checked;
    const second_checked = document.querySelector("input[id=second-score]").checked;
    const third_checked = document.querySelector("input[id=third-score]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-score]").checked;

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
    const first_checked = document.querySelector("input[id=first-price]").checked;
    const second_checked = document.querySelector("input[id=second-price]").checked;
    const third_checked = document.querySelector("input[id=third-price]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-price]").checked;
    const fifth_checked = document.querySelector("input[id=fifth-price]").checked;

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
    const first_checked = document.querySelector("input[id=first-time]").checked;
    const second_checked = document.querySelector("input[id=second-time]").checked;
    const third_checked = document.querySelector("input[id=third-time]").checked;
    const fourth_checked = document.querySelector("input[id=fourth-time]").checked;
    const fifth_checked = document.querySelector("input[id=fifth-time]").checked;
    return (first_checked || second_checked || third_checked || fourth_checked || fifth_checked);
  }
  /***************************************************
           HELPER METHOD
    *************************************************/
   /**
    * Check to see which range the card falls into and if the coinciding check is false,
    * (a.k.a not requested) then we hide the card
    * @param {recipeCard} card  - the DOM in question
    * @param {boolean[]} ranges - only one element in the ranges is set to true by design
    * @param {boolean[]} checks - reflective of the current selected checkboxes
    * @private
    */
   #decider(card, ranges, checks){
    if(ranges.length != checks.length){
       console.log("error: length of ranges ${ranges} is not the same as ${checks}");
       return;
    }

    ranges.forEach( (range, index) => {
      /**
       * if an item falls into a range but we are not requesting to see
       * it then it should be hidden
       */
      if(range && !checks[index]){
        card.classList.add("hidden");
        card.classList.remove("shown");
      }
    })
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
