//apiTest.js

const API_key = "54a305b43853416198613d4aaaed7b01";
var recipeURL = ``;
const searchBar = document.querySelector("input");
const search = document.querySelector("button");
let searchQuery = "";
var baseURL = ``;
var recipesID = {};

let searchQueryHistory = [];

window.addEventListener("DOMContentLoaded", init);

async function init() {
  bindSearch();
  showRecipeCards();
  showRecipeViewers();
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
  await fetch(baseURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      for (let i = 0; i < data.results.length; i++) {
        recipesID[data.results[i].title] = data.results[i];
      }
    });
  bindRecipeCards();
  bindRecipeViewers();

}

function bindRecipeCards(){
  for (const property in recipesID) {
    // RECIPE CARD TESTER
    const recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipesID[property];
    recipeCard.classList.add('shown');
    console.log(recipesID[property]);
    document.querySelector(".recipe-cards--wrapper").appendChild(recipeCard);
  }
}

function bindRecipeViewers(){
  for (const property in recipesID) {
    // RECIPE VIEWER TESTER
    const recipeViewer = document.createElement("recipe-viewer");
    recipeViewer.data = recipesID[property];
    recipeViewer.classList.add('hidden');
    console.log(recipesID[property]);
    document
      .querySelector(".recipe-viewers--wrapper")
      .appendChild(recipeViewer);
  }
}

function showRecipeCards(){
  const recipeCardsBtn = document.querySelector("#recipe-cards-btn");
  recipeCardsBtn.addEventListener("click",()=>{
    /** Show the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.remove("shown");
    })
    /** Hide the Recipe Viewers */
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.add("shown");
    })
  })
}

function showRecipeViewers(){
   const recipeViewersBtn = document.querySelector("#recipe-viewers-btn");
   /** Show the Recipe Viewers */
   recipeViewersBtn.addEventListener("click",()=>{
    const recipeViewers = document.querySelectorAll("recipe-viewer");
    recipeViewers.forEach( (element) =>{
      element.classList.remove("hidden");
      element.classList.add("shown");
    })
    /** Hide the Recipe Cards */
    const recipeCards = document.querySelectorAll("recipe-card");
    recipeCards.forEach( (element) =>{
      element.classList.remove("shown");
      element.classList.add("hidden");
    })
  })
}
