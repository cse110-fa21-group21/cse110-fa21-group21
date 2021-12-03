// ingredientCard.js
let myStorage = window.localStorage;
let key;

class ingredientCard extends HTMLElement {

  constructor (storage_key) {
    super()
    key = storage_key;
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
     
     <!-- Local StyleSheets -->
     <link rel="stylesheet" href="./assets/components/recipeCard/recipeCard.css">

     <!-- The Card Itself -->
     <section id="shadow" class="card container p-3"></section>

     <!-- Bootstrap JS -->
     <script 
      src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
      integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin = "anonymous"></script>

     <!-- Fontawesome JS -->
     <script src = "https://kit.fontawesome.com/0e68289b8e.js" crossorigin = "anonymous"></script>
    `
  
  }
  

  get data () {
    return this.json
  }

  /**
   * Change make to ingredientCard instead keep create elements
   * Setting the structure of shadowRoot to what it need to be
   * then we can just call data to set up information for each
   * part of the ingredientcard
   */
  set data (data) {
    this.json = data

    // this will reset the struction of the section element within our shadow root
    this.shadowRoot.querySelector("section").innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <div class="rounded">
          </div>
        </div>
        <div id="card-information" class="col my-auto">
          <div class="card">
            <div class="card-header" id="recipe-title"> Recipe Title </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item" id="recipe-price"></li>
              <li class="list-group-item" id="recipe-servings"></li>
              <li class="list-group-item" id="recipe-cooking-time"></li>
              <li class="list-group-item" id="recipe-score"></li>
              <li class="list-group-item" id="recipe-calories"></li>
              <li class="list-group-item" id="recipe-total-calories"></li>
            </ul>
          </div>
        </div>
      </div>
    `
  

    // set title
    const title = myStorage.getItem(key);
    console.log(title);
    this.shadowRoot.getElementById('recipe-title').innerHTML = title
  }
}

customElements.define('recipe-card', recipeCard);
