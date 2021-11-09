//SomeTest.js



const API_key = 'ec4a0690be5a4155b40c1525f9b8226d';
var recipeURL = ``;
const searchBar = document.querySelector('input');
const search = document.querySelector('button');
let searchQuery = '';
var baseURL = ``;
var recipesID = {};

window.addEventListener('DOMContentLoaded', init);

async function init(){
    bindSearch();
}





async function bindSearch(){
    searchBar.addEventListener('input', event =>{
        searchBar.textContent = event.target.value;
    });
    
    search.addEventListener('click', event =>{
        searchQuery = searchBar.textContent;
        baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&query=${searchQuery}`;
        fetchAPI();
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
            recipeURL = `https://api.spoonacular.com/recipes/${value}/information?apiKey=${API_key}`;
            fetch(recipeURL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        }
    })
}
