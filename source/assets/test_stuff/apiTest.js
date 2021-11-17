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
  const recipeCardsWrapper = document.querySelector(".recipe-cards--wrapper");
  for (const property in recipesID) {
    // RECIPE CARD TESTER
    const recipeCard = document.createElement("recipe-card");
    recipeCard.data = recipesID[property];
    recipeCard.classList.add('shown');
    console.log(recipesID[property]);
    recipeCardsWrapper.appendChild(recipeCard);
  }
  sortRecipeCardsInWrapper(recipeCardsWrapper);
}

function bindRecipeViewers(){
  const recipeViewersWrapper = document.querySelector(".recipe-viewers--wrapper")
  for (const property in recipesID) {
    // RECIPE VIEWER TESTER
    const recipeViewer = document.createElement("recipe-viewer");
    recipeViewer.data = recipesID[property];
    recipeViewer.classList.add('hidden');
    recipeViewersWrapper.appendChild(recipeViewer);
  }
  /**
   * Spoonacular Scores need to be added to recipeViewers,
   * in order for this feature to be implemented
   * sortRecipeViewersInWrapper(recipeViewersWrapper); 
   */

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

/** SORTERS */

function sortRecipeCardsInWrapper(recipeCardsWrapper){
  const recipeCards = [];
  const indices = [];
  const nodesList = recipeCardsWrapper.childNodes;
  nodesList.forEach( (node,index) =>{
    if(node.nodeName == 'RECIPE-CARD'){
      recipeCards.push(node);
      indices.push(index);
    }
  })
  recipeCardsWrapper.innerHTML = '';
  recipeCards.sort( (firstCard,secondCard) => compareRecipeCards(firstCard,secondCard))
  recipeCards.forEach( (card) => {recipeCardsWrapper.appendChild(card);});
}

function sortRecipeViewersInWrapper(recipeViewersWrapper){
  const recipeViewers = [];
  const indices = [];
  const nodesList = recipeViewersWrapper.childNodes;
  nodesList.forEach( (node,index) =>{
    if(node.nodeName == 'RECIPE-VIEWER'){
      recipeViewers.push(node);
      indices.push(index);
    }
  })
  recipeViewersWrapper.innerHTML = '';
  recipeViewers.sort( (firstViewer,secondViewer) => compareRecipeCards(firstViewer,secondViewer))
  recipeViewers.forEach( (viewer) => {recipeCardsWrapper.appendChild(viewer);});
}

/** COMPARISONS */

/**
 * Compares two recipe-card DOMs and chooses the one with 
 * the higher spoonacular score
 */
function compareRecipeCards(firstCard,secondCard){
  //Pull the Inner Text of the 'recipe-score' div
  let firstCardRecipeScoreText  = firstCard.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  let secondCardRecipeScoreText  = secondCard.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text){
    let slashIndex = text.indexOf('/');
    let value = text.substring(7,slashIndex) // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstCardScore = pullValue(firstCardRecipeScoreText);
  let secondCardScore = pullValue(secondCardRecipeScoreText);

  if(firstCardScore > secondCardScore){
    return -1;
  }else if(firstCardScore < secondCardScore){
    return 1;
  }else{
    return 0;
  }
}

/**
 * Compares two recipe-viewer DOMs and chooses the one with 
 * the higher spoonacular score
 */
 function compareRecipeViewers(firstViewer,secondViewer){
  //Pull the Inner Text of the 'recipe-score' div
  let firstViewerRecipeScoreText  = firstViewer.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  let secondViewerRecipeScoreText  = secondViewer.shadowRoot.querySelector('section').querySelector('#recipe-score').innerText;
  //Parse the Inner Text to obtain the value
  function pullValue(text){
    let slashIndex = text.indexOf('/');
    let value = text.substring(7,slashIndex) // length of 'Score: ' is 7;
    return Number(value);
  }

  let firstViewerScore = pullValue(firstViewerRecipeScoreText);
  let secondViewerScore = pullValue(secondViewerRecipeScoreText);

  if(firstViewerScore > secondViewerScore){
    return -1;
  }else if(firstViewerScore < secondViewerScore){
    return 1;
  }else{
    return 0;
  }
}
