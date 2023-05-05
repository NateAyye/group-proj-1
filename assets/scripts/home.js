const pouplarRecipesContainer = $('#popular-recipes');
const searchFormInput = $('#search-form-container input');
const searchFormButton = $('#search-form-container form button');
const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

const popularRecipeEndpoint =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?sort=popularity&sortDirection=asc&number=4';

function displayRecipe(recipe, element) {
  element.prepend(`
    <div class="group relative bg-gray-100 px-3 pt-3 pb-5 drop-shadow-lg rounded-md">
      <div
        class="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
      >
        <img
          src="${recipe.image}"
          alt="Front of men&#039;s Basic Tee in black."
          class="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-lg font-bold text-gray-700 ">
            <a href="./mealdetails.html?id=${'' + recipe.id}">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${recipe.title}
            </a>
          </h3>

        </div>

      </div>
    </div>
  `);
}

function refreshButtonEvents() {
  const muleButtons = $('.add-to-mule-btn');
  for (let i = 0; i < muleButtons.length; i++) {
    muleButtons[i].removeEventListener('click', handleModal);
  }
  for (let i = 0; i < muleButtons.length; i++) {
    muleButtons[i].addEventListener('click', handleModal);
  }
}

function fetchAndDisplayRecipes(endpoint, element) {
  fetch(endpoint, {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'b681d02421mshdf8c1da87759638p16c1fajsn5f6f4a0059e9',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      element.empty();
      const recipes = data.results ?? data;
      for (let i = 0; i < recipes.length; i++) {
        displayRecipe(recipes[i], element);
      }
      refreshButtonEvents();
    });
}

function handleSearchButton(e) {
  e.preventDefault();
  const searchField = searchFormInput.val().trim();
  if (!searchField) return;
  let query = searchField.includes(',') ? '' : 'complexSearch?';
  const intolerance = $('#intolerances').val();
  const diet = $('#diet').val();
  const calorieMax = slider.maxSliderValueNode.innerHTML;
  const calorieMin = slider.minSliderValueNode.innerHTML;

  if (diet !== 'default') {
    query += `diet=${diet}`;
  }
  if (intolerance !== 'default') {
    query += `${
      query.slice(query.length - 1, query.length) === '?' || query === ''
        ? ''
        : '&'
    }intolerances=${intolerance}`;
  }
  if (calorieMax !== '800') {
    query += `${
      query.slice(query.length - 1, query.length) === '?' || query === ''
        ? ''
        : '&'
    }maxCalories=${calorieMax}`;
  }
  if (calorieMin !== '50') {
    query += `${
      query.slice(query.length - 1, query.length) === '?' || query === ''
        ? ''
        : '&'
    }minCalories=${calorieMin}`;
  }

  if (searchField.includes(',')) {
    // Split the comma seperated list of ingredients into an array then map over each element in that array and trim its value to check for empty spaces then filter over that array to make sure someone didn't enter an empty value(comma at the end) then join the array back together into a string with the ',+' between them for the api to understand it.
    const apiIngredientParam = searchField
      .split(',')
      .map((val) => val.trim())
      .filter(Boolean)
      .join(',+');

    query += `${
      query.slice(query.length - 1, query.length) === '?' || query === ''
        ? ''
        : '&'
    }findByIngredients?ingredients=${apiIngredientParam}&number=15`;

    location.replace(location.origin + '/recipes.html?' + query);
  } else {
    query += `${
      query.slice(query.length - 1, query.length) === '?' || query === ''
        ? ''
        : '&'
    }query=${searchField}`;
    location.replace(location.origin + '/recipes.html?' + query);
  }
}

$(() => {
  // displayRecipe(testRecipe, pouplarRecipesContainer);
  fetchAndDisplayRecipes(popularRecipeEndpoint, pouplarRecipesContainer);
  searchFormButton.click(handleSearchButton);
});
