// unit.test.js

const { test } = require("@jest/globals");
const Spoonacular = require("../scripts/spoonacular.js");
const riceJsonData = require("../_tests_/recipeJsonData/rice.json");

/*TO DO 1:
Add functions from other js files! (e.g. ../assets/components/RecipeCard.js)
*Note: Add module.exports = { functionName, e.g.isStrongPassword, isDate, isHexColor }; to top main.js or other js files?
*/
/*Example of getting functions form main.js: 
    const functions = require('../components/recipeCard.js');
Example test:  
    test('000-000-0000 is valid', () => {
        expect(functions.isPhoneNumber('000-000-0000')).toBe(true);
    });
*/

// Examples
const spoonacular = new Spoonacular();

test("Image", () => {
  console.log("Checking image link...");
  expect(spoonacular.getRecipeImageSource(riceJsonData)).toBe(
    "https://spoonacular.com/recipeImages/716364-312x231.jpg"
  );
});

test("Title", () => {
  console.log("Checking recipe title...");
  expect(spoonacular.getRecipeTitle(riceJsonData)).toBe(
    "Rice and Peas with Coconut Curry Mackerel"
  );
});

test("Price", () => {
  console.log("Checking recipe price...");
  expect(spoonacular.getRecipePrice(riceJsonData)).toBe("Total Price: $9.67");
});

test("Minutes", () => {
  console.log("Checking recipe time in minutes...");
  expect(spoonacular.getRecipeCookingTime(riceJsonData)).toBe("Minutes: 45");
});

test("Score", () => {
  console.log("Checking recipe score...");
  expect(spoonacular.getRecipeScore(riceJsonData)).toBe("Score: 94/100");
});

test("Calories", () => {
  console.log("Checking recipe calories...");
  expect(spoonacular.getRecipeCalories(riceJsonData)).toBe(
    "Calories per Serving: 624"
  );
});

test("Servings", () => {
  console.log("Checking recipe servings...");
  expect(spoonacular.getRecipeServings(riceJsonData)).toBe("Servings: 4");
});

test("Total Calories", () => {
  console.log("Checking recipe total calories...");
  expect(spoonacular.getRecipeTotalCalories(riceJsonData)).toBe(
    "Total Calories: 2497"
  );
});

test("Dietary", () => {
  console.log("Checking recipe dietary...");
  expect(spoonacular.getRecipeDietary(riceJsonData)).toStrictEqual({
    vegetarian: false,
    vegan: false,
    "gluten-free": true,
    "dairy-free": true,
  });
});
