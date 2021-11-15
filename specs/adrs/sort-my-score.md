# Sort Recipes by Score

* Status: In progress by JS group
* Deciders: Jonathan, Cade, James, Sherilyn, Cade
* Date: 11/15/2021

## Context and Problem Statement
We currently don't have an ordering for how the recipes are pulled up.  
With sort by score, we can rank the recipes by their score attribute that is already being pulled by the spoonacular API. 


## Considered Options
* Can do Alphabetical Order: not very relevant
* By Price: since finding the price is still a little troublesome as some recipes don't have an estimated price.

## Decision Outcome
We will be sorting by score because doing so would benefit the user with better recipe experience. 
It is also easier for us to implement and sort the recipes via score because it is an attribute we already have from the API.


### Benefits of this decisions: <!-- optional -->
* {e.g., improvement of quality attribute satisfaction, follow-up decisions required, …}
* …

### Consequences of this decision <!-- optional -->
* {e.g., compromising quality attribute, follow-up decisions required, …}
* …

## Pros and Cons of the other Options
