//SomeTest.js

const API_key = "19e32de046cf427cb34e9617e388133d";
var recipeURL = ``;
const searchBar = document.querySelector("input");
const search = document.querySelector("button");
let searchQuery = "";
var baseURL = ``;
var recipesID = {};

let searchQueryHistory = [];
let stepsButton = document.getElementById("stepsButton");
let recipeTitle = "";

window.addEventListener("DOMContentLoaded", init);

async function init() {
  bindSearch();
  getSteps();
  funButtonBind();
}

async function bindSearch() {
  searchBar.addEventListener("input", (event) => {
    searchBar.textContent = event.target.value;
  });

  search.addEventListener("click", (event) => {
    searchQuery = searchBar.textContent;
    if (
      !searchQueryHistory.includes(searchQuery) &&
      !(searchQuery in recipesID)
    ) {
      //This is slightly flawed. We don't want to only store search history but rather by title?
      console.log("NOT IN THERE YET!");
      searchQueryHistory.push(searchQuery);
      baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${searchQuery}&instructions=true&addRecipeInformation=true&addRecipeNutrition=true&number=100&price=true`;
      fetchAPI();
    } else {
      console.log("ALREADY EXISTS NO NEED TO FETCH!");
      console.log(recipesID);
    }
  });
}

async function fetchAPI() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        recipesID[data.results[i].title] = data.results[i];
      }
      //   for (const [key, value] of Object.entries(recipesID)) {
      //     console.log(`${key}:${value}`);
      //     recipeURL = `https://api.spoonacular.com/recipes/${value}/information?apiKey=${API_key}`;
      //     fetch(recipeURL)
      //       .then((response) => response.json())
      //       .then((data) => {
      //         console.log(data);
      //       });
      //   }
    });
}

async function getSteps() {
  stepsButton.addEventListener("click", (event) => {
    recipeTitle = searchBar.textContent;
    let instructionSteps =
      recipesID[recipeTitle]["analyzedInstructions"][0]["steps"];
    for (let i = 0; i < instructionSteps.length; i++) {
      console.log(instructionSteps[i]["step"]);
    }
  });
}

function getInstructions(data) {
  if (data) {
    data["analyzedInstructions"][0]["steps"];
  }
  return null;
}

function getIngredients(data) {
  if (data) {
    data["nutrition"]["ingredients"];
  }
  return null;
}

let funButton = document.getElementById("funButt");

function funButtonBind() {
  funButton.addEventListener("click", (event) => {
    for (const property in recipesID) {
      console.log(getSpoonacularScore(recipesID[property]));
      console.log(getServings(recipesID[property]));
      console.log(getCaloriesAmountPerServing(recipesID[property]));
      console.log(getReadyTimeInMinutes(recipesID[property]));
      console.log(getVegan(recipesID[property]));
      console.log(getVegetarian(recipesID[property]));
      console.log(getTotalCaloriesAmount(recipesID[property]));

      const recipeCard = document.createElement("recipe-card");
      recipeCard.data = recipesID[property];
      console.log(recipesID[property]);
      document.querySelector(".recipe-cards--wrapper").appendChild(recipeCard);

      const recipeViewer = document.createElement("recipe-viewer");
      recipeViewer.data = recipesID[property];
      console.log(recipesID[property]);
      document
        .querySelector(".recipe-cards--wrapper")
        .appendChild(recipeViewer);
    }

    // console.log(getSpoonacularScore(recipesID["BLT Pizza"]));
    // console.log(getServings(recipesID["BLT Pizza"]));
    // console.log(getCaloriesAmountPerServing(recipesID["BLT Pizza"]));
    // console.log(getReadyTimeInMinutes(recipesID["BLT Pizza"]));
    // console.log(getVegan(recipesID["BLT Pizza"]));
    // console.log(getVegetarian(recipesID["BLT Pizza"]));
    // console.log(getTotalCaloriesAmount(recipesID["BLT Pizza"]));

    // const recipeCard = document.createElement("recipe-card");
    // recipeCard.data = recipesID["BLT Pizza"];
    // console.log(recipesID["BLT Pizza"]);
    // document.querySelector(".recipe-cards--wrapper").appendChild(recipeCard);
  });
}

// Necessary Getter Functions

function getSpoonacularScore(data) {
  if (data) {
    return data["spoonacularScore"];
  }
  return null;
}

function getServings(data) {
  if (data) {
    return data["servings"];
  }
  return null;
}

function getCaloriesAmountPerServing(data) {
  if (data) {
    return data["nutrition"]["nutrients"][0]["amount"];
  }
  return null;
}

function getReadyTimeInMinutes(data) {
  if (data) {
    return data["readyInMinutes"];
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

// Modified Data Getter Functions

function getTotalCaloriesAmount(data) {
  if (data) {
    return data["nutrition"]["nutrients"][0]["amount"] * data["servings"];
  }
  return null;
}
