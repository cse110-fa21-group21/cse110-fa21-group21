function filtering() {
  const checkboxByScore = document.querySelector("form[id=filterByScore]");
  checkboxByScore.addEventListener("click", (event) => {
    let byScoreCheck = event.target;
    filterByScore(byScoreCheck);
  });

  //   const checkboxByScore = document.querySelector("form[id=filterByScore]");
  //   checkboxByScore.addEventListener("click", (event) => {
  //     let byScoreCheck = event.target;
  //     filterByScore(byScoreCheck);
  //   });

  //   const checkboxByScore = document.querySelector("form[id=filterByScore]");
  //   checkboxByScore.addEventListener("click", (event) => {
  //     let byScoreCheck = event.target;
  //     filterByScore(byScoreCheck);
  //   });
}

function filterByScore(filter) {
  const recipeCards = document.querySelectorAll("recipe-card");
  recipeCards.forEach((element) => {
    const recipeScore = extractScore(
      element.shadowRoot.getElementById("recipe-score").innerHTML
    );

    const first_range = recipeScore >= 75;
    const second_range = recipeScore >= 50 && recipeScore < 75;
    const third_range = recipeScore >= 25 && recipeScore < 50;
    const fourth_range = recipeScore >= 0 && recipeScore < 25;

    console.log("TEST " + filter.id);

    if (filter.id == "all_score" && filter.checked) {
      element.classList.add("shown");
      element.classList.remove("hidden");
      document.querySelector("input[id=first_score]").checked = false;
      document.querySelector("input[id=second_score]").checked = false;
      document.querySelector("input[id=third_score]").checked = false;
      document.querySelector("input[id=fourth_score]").checked = false;
    } else {
      document.querySelector("input[id=all_score]").checked = false;
      if (filter.id == "first_score" && filter.checked) {
      }
      if (filter.id == "second_score" && filter.checked) {
      }
      if (filter.id == "third_score" && filter.checked) {
      }
      if (filter.id == "fourth_score" && filter.checked) {
      }
    }

    console.log(
      extractScore(element.shadowRoot.getElementById("recipe-score").innerHTML)
    );
  });
}

function extractScore(scoreString) {
  let slashIndex = scoreString.indexOf("/");
  let value = scoreString.substring(7, slashIndex); // length of 'Score: ' is 7;
  return Number(value);
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
