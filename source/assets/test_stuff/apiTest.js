//apiTest.js

const API_key = "54a305b43853416198613d4aaaed7b01";
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


let funButton = document.getElementById("funButt");

function funButtonBind() {
  funButton.addEventListener("click", (event) => {
    for (const property in recipesID) {
      // RECIPE CARD TESTER
      const recipeCard = document.createElement("recipe-card");
      recipeCard.data = recipesID[property];
      console.log(recipesID[property]);
      document.querySelector(".recipe-cards--wrapper").appendChild(recipeCard);

      // RECIPE VIEWER TESTER
      const recipeViewer = document.createElement("recipe-viewer");
      recipeViewer.data = recipesID[property];
      console.log(recipesID[property]);
      document
        .querySelector(".recipe-cards--wrapper")
        .appendChild(recipeViewer);
    }
  });
}