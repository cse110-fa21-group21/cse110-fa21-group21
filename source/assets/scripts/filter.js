function filtering() {
  const checkbox = document.querySelector("form[id=filterByScore]");
  checkbox.addEventListener("click", (event) => {
    let test = event.target;
    console.log(test.name);
    filterByScore(test);
  });
}

function filterByScore(filter) {
  const recipeCardsWrapper = document.querySelector(".recipe-cards--wrapper");

  if (filter.name == "all_score_filter" && filter.checked) {
    for (let i = 0; i < recipeCardsWrapper.childElementCount; i++) {
      const recipeCard = recipeCardsWrapper.children[i];
      const recipeCardText = recipeCardsWrapper.children[i].shadowRoot
        .querySelector("section")
        .querySelector("#recipe-score").innerText;

      function pullValue(text) {
        let slashIndex = text.indexOf("/");
        let value = text.substring(7, slashIndex); // length of 'Score: ' is 7;
        return Number(value);
      }

      const recipeCardScore = pullValue(recipeCardText);

      const firstCheckbox = document.getElementById("first_score_filter");
      const secondCheckbox = document.getElementById("second_score_filter");

      console.log(filter.name);

      recipeCard.classList.add("shown");
      recipeCard.classList.remove("hidden");
      document.querySelector("input[notall=notall]").checked = false;

      console.log(recipeCard);
    }
  } else if (filter.name == "first_score_filter") {
    for (let i = 0; i < recipeCardsWrapper.childElementCount; i++) {
      const recipeCard = recipeCardsWrapper.children[i];
      const recipeCardText = recipeCardsWrapper.children[i].shadowRoot
        .querySelector("section")
        .querySelector("#recipe-score").innerText;

      function pullValue(text) {
        let slashIndex = text.indexOf("/");
        let value = text.substring(7, slashIndex); // length of 'Score: ' is 7;
        return Number(value);
      }

      const recipeCardScore = pullValue(recipeCardText);

      const firstCheckbox = document.getElementById("first_score_filter");
      const secondCheckbox = document.getElementById("second_score_filter");

      console.log(filter.name);

      if (filter.checked) {
        if (recipeCardScore >= 75) {
          recipeCard.classList.add("shown");
        } else {
          recipeCard.classList.add("hidden");
        }
      } else {
      }

      console.log(recipeCard);
    }
  }
}

// if (filter.name == "all_score_filter" && filter.checked) {
//   recipeCard.classList.add("shown");
//   document.querySelector("input[notall=notall]").checked = false;
// } else if (filter.name == "first_score_filter") {
//   if (filter.checked) {
//     if (recipeCardScore >= 75) {
//       recipeCard.classList.add("shown");
//     } else {
//       recipeCard.classList.add("hidden");
//     }
//   } else {
//   }
// }

// if (recipeCardScore >= 75 && firstCheckbox.checked == true) {
//   recipeCard.classList.remove("hidden");
//   recipeCard.classList.add("shown");
// } else {
//   recipeCard.classList.add("hidden");
//   recipeCard.classList.remove("shown");
// }

// if (
//   recipeCardScore < 75 &&
//   recipeCardScore >= 50 &&
//   secondCheckbox.checked == true
// ) {
//   recipeCard.classList.remove("hidden");
//   recipeCard.classList.add("shown");
// } else {
//   recipeCard.classList.add("hidden");
//   recipeCard.classList.remove("shown");
// }
