import{
  router as router,
  searchFilter as searchFilter,
  myStorage as myStorage
} from "../main.js";

import{
  bindRecipeViewers
} from "./bindRecipeViewers.js";
/****************************************************************************
 *                      FAVORITE LIST
 ****************************************************************************/
/**
 * Connects FavoriteList button to display user's favorite recipes
 */
export function bindFavoriteList() {
  const favButton = document.querySelector('img[alt="nav-favorite-icon"]');
  favButton.addEventListener("click", () => {
    let page = "favoriteList";
    let numidx = 0;
    router.insertPage(page, function () {
      removeFavoriteList();
      let favoriteList = document.querySelector(".my-favorite-list");
      let recipeCards = document.querySelector(".section-recipe-cards-wrapper");
      let recipeViewer = document.querySelector(
        ".section-recipe-viewers-wrapper"
      );
      let homePageSearch = document.querySelector(".section-home-page");
      //Show Favorite List
      favoriteList.classList.add("shown");
      //Hide Recipe Cards
      recipeCards.classList.remove("shown");
      //Hide Recipe Viewer
      recipeViewer.classList.remove("shown");
      //Hide Search Filter
      searchFilter.classList.remove("shown");
      //Hide Home Page Search Bar
      homePageSearch.classList.remove("shown");

      for (let i = 0; i < myStorage.length; i++) {
        console.log(JSON.parse(myStorage.getItem(myStorage.key(i))));
        
        let favoriteCard = document.createElement("recipe-card");
        favoriteList.appendChild(favoriteCard);
        favoriteCard.data = JSON.parse(myStorage.getItem(myStorage.key(i)));
        let favoritePage = "favoriteList" + myStorage.key(i);
        router.insertPage(favoritePage, function () {
          const recipeViewersWrapper = document.querySelector(
            ".section-recipe-viewers-wrapper"
          );

          searchFilter.classList.remove("shown");
          favoriteList.classList.remove("shown");
          recipeViewersWrapper.classList.add("shown");

          document.querySelector("recipe-viewer").data = JSON.parse(
            myStorage.getItem(myStorage.key(i))
          );
        });
        bindRecipeViewers(favoriteCard, favoritePage, true);
        numidx++;
      }
    });
    router.goTo(page);
    console.log(document.querySelector(".my-favorite-list").classList);
  });
}

/**
 * Removes favorite list's recipe card when going back to the main page
 */
export function removeFavoriteList() {
  let favoriteList = document.querySelector(".my-favorite-list");
  while (favoriteList.firstChild) {
    favoriteList.removeChild(favoriteList.firstChild);
  }
}
