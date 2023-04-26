# Basic Funcitonality

## Who are we building this for

- Mostly for people concerned about their health and planning weekly meals.

- People that don't have time to plan out meals everyday but want to cook at home.

## MVP (Minimum Viable Product)?

- Meal Planner that allows you to search for meals based off name and popularity and allow them to add or delete meals to a weekly meal plan. (Search by Ingredient if we have time).
- Ability to create custom weeks to add meals to.

## Meal Planner

- [ ] Plan Meals weekly based of calories and dietary needs
- [ ] Use API to get preffered calorie intake for the BMI
- [ ] Start out with one Dieteiry need To set up a meal plan

### Searching Criteria

```
WHEN a user enters a list of comma seperated ingredients and a droppdown of what dietary needs they have.

THEN a list of meals matching the criteria and containing the ingredients gets displayed

WHEN the user selects a meal from the list.

THEN the user gets brought to the Individual meal page with detailed ingredients, recipies, substitutions. With options to add to a meal plan.

WHEN the user clicks on the add meal to plan button they get a modal(popup) displaying all the current users meal plans that they have made. (add an optional + New Meal Plan button) if the user doesn't have any setup or want a new one.

WHEN the user selects a meal plan the current meal is added to localStorage tied to the meal plan name.
```
### User Story
```
WHEN a user opens the site 

THEN they are presented with a popup asking for their weight and diet.

THEN they are presented with the home page with search bar section to immediatly start searching meals then right bellow we have hero section with an example of out products use and 
```