//main.js
const API_KEY = ''; //retrive a key
const form = document.querySelector('.search-bar');
const searchBar = document.querySelector("input[type='text']");
const searchBtn = document.querySelector("input[type='submit']");

let searchQuery = '';
let baseURL = ``;
let recipesID = {};
let recipeURL = ``;

window.addEventListener('DOMContentLoaded', init);

async function init(){
    bindSearch();
}

async function bindSearch(){
    searchBar.addEventListener('input', event =>{
        searchBar.textContent = event.target.value;
    });

    searchBtn.addEventListener('click',() => {
        searchQuery = searchBar.textContent;
        //To minimize unnecessary API fetches, we prevent empty string queries
        if(searchQuery){
            console.log('Search Query: ', searchQuery);
            baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`;
            fetchAPI();
        }
    });
}

async function fetchAPI(){
    fetch(baseURL)
    .then(response => response.json())
    .then(data =>{
        console.log(data.results);
        for(let i =0; i < data.results.length; i++){
            recipesID[data.results[i].title] = data.results[i].id;
        }
        for(const[key, value] of Object.entries(recipesID)){
            console.log(`${key}:${value}`);
            recipeURL = `https://api.spoonacular.com/recipes/${value}/information?apiKey=${API_KEY}`;
            fetch(recipeURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        }       
    })
}

