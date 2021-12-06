import { 
  router as router, 
  filter as filter
} from "../main.js";
/****************************************************************************
 *                        ROUTING
 ****************************************************************************/

/**
 * function that bind the back button
 * and the forward button
 */
export function bindState() {
  window.addEventListener("popstate", (event) => {
    if (event.state == null) {
      router.goTo("home", true);
    } else {
      console.log("Routing to page:", event.state);
      router.goTo(event.state, true);
    }
    filter.filtering();
  });
}
/**
 * Bind Home button to navigate to home
 *
 */
export function bindHomeButton() {
  const homeButton = document.querySelector("button#home");
  homeButton.addEventListener("click", () => {
    router.goTo("home", false);
  });
}
