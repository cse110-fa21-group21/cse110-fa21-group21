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
