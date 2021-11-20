function filtering() {
  goThroughElements();
  //   filterByTime();

  const checkboxByScore = document.querySelector("form[id=filterByScore]");
  checkboxByScore.addEventListener("click", (event) => {
    // Could use this to add some more functionality to the all button.
    // let byScoreCheck = event.target;
    goThroughElements();
  });

  const checkboxByPrice = document.querySelector("form[id=filterByPrice]");
  checkboxByPrice.addEventListener("click", (event) => {
    // let byPriceCheck = event.target;
    goThroughElements();
  });

  const checkboxByTime = document.querySelector("form[id=filterByTime]");
  checkboxByTime.addEventListener("click", (event) => {
      console.log("reached");
      // let byTimeCheck = event.target;
      goThroughElements();
  });
}

function goThroughElements() {
  const recipeCards = document.querySelectorAll("recipe-card");
  recipeCards.forEach((element) => {
    element.classList.add("shown");
    element.classList.remove("hidden");
    if (checkScoreChecked()) {
      filterByScore(element);
    }
    if (checkPriceChecked()) {
      filterByPrice(element);
    }
    if(checkTimeChecked()){
      filterByTime(element);
    }
  });
}

function filterByScore(element) {
  const recipeScore = extractScore(
    element.shadowRoot.getElementById("recipe-score").innerHTML
  );

  const first_range = recipeScore >= 75;
  const second_range = recipeScore >= 50 && recipeScore < 75;
  const third_range = recipeScore >= 25 && recipeScore < 50;
  const fourth_range = recipeScore >= 0 && recipeScore < 25;

  const all_checked = document.querySelector("input[id=all_score]").checked;
  const first_checked = document.querySelector("input[id=first_score]").checked;
  const second_checked = document.querySelector(
    "input[id=second_score]"
  ).checked;
  const third_checked = document.querySelector("input[id=third_score]").checked;
  const fourth_checked = document.querySelector(
    "input[id=fourth_score]"
  ).checked;

  if (first_range && !first_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (second_range && !second_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (third_range && !third_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (fourth_range && !fourth_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
}
function filterByPrice(element) {
  // if (element.getAttribute("class") == "hidden") {
  //   return;
  // }

  const recipePrice = extractPrice(
    element.shadowRoot.getElementById("recipe-price").innerHTML
  );

  const first_range = recipePrice >= 50.0;
  const second_range = recipePrice >= 20.0 && recipePrice < 50.0;
  const third_range = recipePrice >= 10.0 && recipePrice < 20.0;
  const fourth_range = recipePrice >= 5.0 && recipePrice < 10.0;
  const fifth_range = recipePrice >= 0.0 && recipePrice < 5.0;

  const all_checked = document.querySelector("input[id=all_price]").checked;
  const first_checked = document.querySelector("input[id=first_price]").checked;
  const second_checked = document.querySelector(
    "input[id=second_price]"
  ).checked;
  const third_checked = document.querySelector("input[id=third_price]").checked;
  const fourth_checked = document.querySelector(
    "input[id=fourth_price]"
  ).checked;
  const fifth_checked = document.querySelector("input[id=fifth_price]").checked;

  if (first_range && !first_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (second_range && !second_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (third_range && !third_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (fourth_range && !fourth_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
  if (fifth_range && !fifth_checked) {
    element.classList.add("hidden");
    element.classList.remove("shown");
  }
}
function filterByTime(element){
  const recipeTime = extractCookingTime(element.shadowRoot.getElementById("recipe-cooking-time").innerHTML);

  const first_time = recipeTime >= 60;
  const second_time = recipeTime >=45 && recipeTime < 60;
  const third_time  = recipeTime >=30 && recipeTime < 45;
  const fourth_time = recipeTime >=15 && recipeTime <30;
  const fifth_time = recipeTime >=0 && recipeTime < 15;

  const all_checked = document.querySelector("input[id=all_time]").checked;
  const first_checked = document.querySelector("input[id=first_time]").checked;
  const second_checked = document.querySelector("input[id=second_time]").checked;
  const third_checked = document.querySelector("input[id=third_time]").checked;
  const fourth_checked = document.querySelector("input[id=fourth_time]").checked;
  const fifth_checked = document.querySelector("input[id=fifth_time]").checked;
  
  if(first_time && first_checked){
    element.classList.add('shown');
    element.classList.remove('hidden');
  }
  if(second_time && second_checked){
    element.classList.add('shown');
    element.classList.remove('hidden');
  }
  if(third_time && third_checked){
    element.classList.add('shown');
    element.classList.remove('hidden');
  }
  if(fourth_time && fourth_checked){
    element.classList.add('shown');
    element.classList.remove('hidden');
  }
  if(fifth_time && fifth_checked){
    element.classList.add('shown');
    element.classList.remove('hidden');
  }
}


function checkScoreChecked() {
  const first_checked = document.querySelector("input[id=first_score]").checked;
  const second_checked = document.querySelector(
    "input[id=second_score]"
  ).checked;
  const third_checked = document.querySelector("input[id=third_score]").checked;
  const fourth_checked = document.querySelector(
    "input[id=fourth_score]"
  ).checked;

  return first_checked || second_checked || third_checked || fourth_checked;
}

function checkPriceChecked() {
  const first_checked = document.querySelector("input[id=first_price]").checked;
  const second_checked = document.querySelector(
    "input[id=second_price]"
  ).checked;
  const third_checked = document.querySelector("input[id=third_price]").checked;
  const fourth_checked = document.querySelector(
    "input[id=fourth_price]"
  ).checked;
  const fifth_checked = document.querySelector("input[id=fifth_price]").checked;

  return (
    first_checked ||
    second_checked ||
    third_checked ||
    fourth_checked ||
    fifth_checked
  );
}

function checkTimeChecked(){
  const first_checked = document.querySelector("input[id=first_time]").checked;
  const second_checked = document.querySelector("input[id=second_time]").checked;
  const third_checked = document.querySelector("input[id=third_time]").checked;
  const fourth_checked = document.querySelector("input[id=fourth_time]").checked;
  const fifth_checked = document.querySelector("input[id=fifth_time]").checked;

  return (first_checked || second_checked || third_checked || fourth_checked || fifth_checked);
}


function extractScore(scoreString) {
  let slashIndex = scoreString.indexOf("/");
  let value = scoreString.substring(7, slashIndex); // length of 'Score: ' is 7;
  return Number(value);
}
function extractPrice(priceString) {
  let dollarIndex = priceString.indexOf("$");
  let value = priceString.substring(dollarIndex + 1); // length of 'Score: ' is 7;
  return Number(value);
}
function extractCookingTime(cookingString) {
  let spaceIndex = cookingString.indexOf(" ");
  let value = cookingString.substring(spaceIndex + 1); // length of 'Score: ' is 7;
  console.log(value);
  return Number(value);
}

// function filtering() {
//   filterByScore();
//   filterByPrice();
//   //   filterByTime();

//   const checkboxByScore = document.querySelector("form[id=filterByScore]");
//   checkboxByScore.addEventListener("click", (event) => {
//     // Could use this to add some more functionality to the all button.
//     // let byScoreCheck = event.target;
//     filterByScore();
//   });

//   const checkboxByPrice = document.querySelector("form[id=filterByPrice]");
//   checkboxByPrice.addEventListener("click", (event) => {
//     // let byPriceCheck = event.target;
//     filterByPrice();
//   });

//   //   const checkboxByTime = document.querySelector("form[id=]");
//   //   checkboxByScore.addEventListener("click", (event) => {
//   //     // let byTimeCheck = event.target;
//   //     filterByTime();
//   //   });
// }

// function filterByScore() {
//   const recipeCards = document.querySelectorAll("recipe-card");
//   recipeCards.forEach((element) => {
//     const recipeScore = extractScore(
//       element.shadowRoot.getElementById("recipe-score").innerHTML
//     );

//     // if (element.getAttribute("class") == "hidden") {
//     //   return;
//     // }

//     const first_range = recipeScore >= 75;
//     const second_range = recipeScore >= 50 && recipeScore < 75;
//     const third_range = recipeScore >= 25 && recipeScore < 50;
//     const fourth_range = recipeScore >= 0 && recipeScore < 25;

//     const all_checked = document.querySelector("input[id=all_score]").checked;
//     const first_checked = document.querySelector(
//       "input[id=first_score]"
//     ).checked;
//     const second_checked = document.querySelector(
//       "input[id=second_score]"
//     ).checked;
//     const third_checked = document.querySelector(
//       "input[id=third_score]"
//     ).checked;
//     const fourth_checked = document.querySelector(
//       "input[id=fourth_score]"
//     ).checked;

//     if (checkPriceChecked()) {
//       if (first_range && !first_checked) {
//         element.classList.add("hidden");
//         element.classList.remove("shown");
//       }
//       if (second_range && !second_checked) {
//         element.classList.add("hidden");
//         element.classList.remove("shown");
//       }
//       if (third_range && !third_checked) {
//         element.classList.add("hidden");
//         element.classList.remove("shown");
//       }
//       if (fourth_range && !fourth_checked) {
//         element.classList.add("hidden");
//         element.classList.remove("shown");
//       }
//     } else {
//       if (
//         all_checked ||
//         (!first_checked && !second_checked && !third_checked && !fourth_checked)
//       ) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//         document.querySelector("input[id=first_score]").checked = false;
//         document.querySelector("input[id=second_score]").checked = false;
//         document.querySelector("input[id=third_score]").checked = false;
//         document.querySelector("input[id=fourth_score]").checked = false;
//       } else {
//         document.querySelector("input[id=all_score]").checked = false;
//         element.classList.add("hidden");
//         element.classList.remove("shown");
//         if (first_range && first_checked) {
//           element.classList.add("shown");
//           element.classList.remove("hidden");
//         }
//         if (second_range && second_checked) {
//           element.classList.add("shown");
//           element.classList.remove("hidden");
//         }
//         if (third_range && third_checked) {
//           element.classList.add("shown");
//           element.classList.remove("hidden");
//         }
//         if (fourth_range && fourth_checked) {
//           element.classList.add("shown");
//           element.classList.remove("hidden");
//         }
//       }
//     }
//   });
// }
// function filterByPrice() {
//   const recipeCards = document.querySelectorAll("recipe-card");
//   recipeCards.forEach((element) => {
//     const recipePrice = extractPrice(
//       element.shadowRoot.getElementById("recipe-price").innerHTML
//     );

//     // if (element.getAttribute("class") == "hidden") {
//     //   return;
//     // }

//     const first_range = recipePrice >= 50.0;
//     const second_range = recipePrice >= 20.0 && recipePrice < 50.0;
//     const third_range = recipePrice >= 10.0 && recipePrice < 20.0;
//     const fourth_range = recipePrice >= 5.0 && recipePrice < 10.0;
//     const fifth_range = recipePrice >= 0.0 && recipePrice < 5.0;

//     const all_checked = document.querySelector("input[id=all_price]").checked;
//     const first_checked = document.querySelector(
//       "input[id=first_price]"
//     ).checked;
//     const second_checked = document.querySelector(
//       "input[id=second_price]"
//     ).checked;
//     const third_checked = document.querySelector(
//       "input[id=third_price]"
//     ).checked;
//     const fourth_checked = document.querySelector(
//       "input[id=fourth_price]"
//     ).checked;
//     const fifth_checked = document.querySelector(
//       "input[id=fifth_price]"
//     ).checked;

//     if (
//       all_checked ||
//       (!first_checked &&
//         !second_checked &&
//         !third_checked &&
//         !fourth_checked &&
//         !fifth_checked)
//     ) {
//       element.classList.add("shown");
//       element.classList.remove("hidden");
//       document.querySelector("input[id=first_price]").checked = false;
//       document.querySelector("input[id=second_price]").checked = false;
//       document.querySelector("input[id=third_price]").checked = false;
//       document.querySelector("input[id=fourth_price]").checked = false;
//       document.querySelector("input[id=fifth_price]").checked = false;
//     } else {
//       document.querySelector("input[id=all_price]").checked = false;
//       element.classList.add("hidden");
//       element.classList.remove("shown");
//       if (first_range && first_checked) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//       }
//       if (second_range && second_checked) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//       }
//       if (third_range && third_checked) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//       }
//       if (fourth_range && fourth_checked) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//       }
//       if (fifth_range && fifth_checked) {
//         element.classList.add("shown");
//         element.classList.remove("hidden");
//       }
//     }
//   });
// }

// function checkScoreChecked() {
//   const first_checked = document.querySelector("input[id=first_score]").checked;
//   const second_checked = document.querySelector(
//     "input[id=second_score]"
//   ).checked;
//   const third_checked = document.querySelector("input[id=third_score]").checked;
//   const fourth_checked = document.querySelector(
//     "input[id=fourth_score]"
//   ).checked;

//   return first_checked || second_checked || third_checked || fourth_checked;
// }

// function checkPriceChecked() {
//   const first_checked = document.querySelector("input[id=first_price]").checked;
//   const second_checked = document.querySelector(
//     "input[id=second_price]"
//   ).checked;
//   const third_checked = document.querySelector("input[id=third_price]").checked;
//   const fourth_checked = document.querySelector(
//     "input[id=fourth_price]"
//   ).checked;
//   const fifth_checked = document.querySelector("input[id=fifth_price]").checked;

//   return (
//     first_checked ||
//     second_checked ||
//     third_checked ||
//     fourth_checked ||
//     fifth_checked
//   );
// }

// // function filterByTime();

// function extractScore(scoreString) {
//   let slashIndex = scoreString.indexOf("/");
//   let value = scoreString.substring(7, slashIndex); // length of 'Score: ' is 7;
//   return Number(value);
// }
// function extractPrice(priceString) {
//   let dollarIndex = priceString.indexOf("$");
//   let value = priceString.substring(dollarIndex + 1); // length of 'Score: ' is 7;
//   return Number(value);
// }
// function extractCookingTime(cookingString) {
//   let spaceIndex = cookingString.indexOf(" ");
//   let value = cookingString.substring(spaceIndex + 1); // length of 'Score: ' is 7;
//   return Number(value);
// }
