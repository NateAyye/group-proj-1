const recipeList = $('#recipe-list ul');
const searchFormInput = $('#search-form-container input');
const searchFormButton = $('#search-form-container button');
const modalBG = $('[role="dialog"]');

const DIET_TYPES = {
  vegetarian: {
    color: 'lime-400',
    text: 'gray-50',
  },
  vegan: {
    color: 'cyan-500',
    text: 'gray-50',
  },
  glutenFree: {
    color: 'amber-100',
    text: 'gray-700',
  },
  dairyFree: {
    color: 'stone-200',
    text: 'gray-700',
  },
  veryHealthy: {
    color: 'teal-500',
    text: 'gray-50',
  },
  cheap: {
    color: 'amber-400',
    text: 'gray-700',
  },
  veryPopular: {
    color: 'yellow-300',
    text: 'gray-700',
  },
  sustainable: {
    color: 'green-500',
    text: 'gray-50',
  },
  lowFodmap: {
    color: 'sky-500',
    text: 'gray-50',
  },
};

const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

function fetchRandomRecipies() {
  const endpoint = baseUrl + 'random?number=15';

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
      const recipes = data.recipes;
      for (let i = 0; i < recipes.length; i++) {
        displayRecipe(recipes[i]);
      }
      console.log(data);
    });
}

function createBadges(recipe) {
  const badges = Object.keys(recipe)
    .slice(0, Object.keys(DIET_TYPES).length - 1)
    .map((key) => {
      if (!recipe[key]) return '';
      return key;
    })
    .filter(Boolean);
  let innerHtml = ``;

  for (let i = 0; i < badges.length; i++) {
    innerHtml += `
    <span class="inline-flex items-center rounded-md bg-${
      DIET_TYPES[badges[i]]?.color || 'gray-600'
    } px-2 py-1 text-[13px] font-medium text-gray-50  ring-1 ring-inset ring-gray-500/10">${
      badges[i]
    }</span>
    `;
  }
  return innerHtml;
}

function displayRecipe(recipe, endpoint) {
  console.log(endpoint);
  recipeList.prepend(`
    <li class="flex py-6 p-5 bg-slate-200 rounded-lg">
      <div
        class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
      >
        <img 
          src="${recipe.image}"
          alt="${
            recipe.summary
              ? recipe.summary.slice(0, 30)
              : 'No Summary Data To Display Sorry'
          }"
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div class=" ml-4 flex flex-1 flex-col">
        <div>
            <div class="badges">
            ${
              endpoint.includes('findByIngredients') ? '' : createBadges(recipe)
            }
            </div>
          <div
            class="flex justify-between text-base font-medium text-gray-900"
          >
            <h3 class="text-2xl">
              <a href="./mealdetails.html?id=${'' + recipe.id}">${
    recipe.title
  }</a>
            </h3>
            <div class="flex items-center  w-max h-min">
            <img
              alt="Weight Watchers Icon"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/WW_%28rebrand%29_logo_2018.png"
              width="15"
              height="15"
             /> <p> ${recipe.weightWatcherSmartPoints}</p></div>
          </div>
          <div class="flex justify-between text-gray-700/80">
            <p class="text-md ">${
              recipe.summary
                ? recipe.summary.split(' ').slice(0, 20).join(' ') + '...'
                : 'No Summary Data To Display Sorry'
            }</p>
            <p class="ml-4 min-w-fit text-gray-800">Servs: ${
              recipe.servings
            }</p>
          </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500"></p>
          <div class="flex">
            <button
              data-recipe-id="${recipe.id}"
              type="button"
              class="add-to-mule-btn font-medium text-gray-50 bg-sky-500 px-3 py-1 rounded-md hover:bg-sky-700 hover:text-gray-200"
            >
              &plus; Add to Mule
            </button>
          </div>
        </div>
      </div>
    </li>
  `);
}

function fetchAndDisplayRecipes(endpoint) {
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
      recipeList.empty();
      const recipes = data;
      console.log(data);
      for (let i = 0; i < recipes.length; i++) {
        displayRecipe(recipes[i], endpoint);
      }
      refreshButtonEvents();
    });
}

function handleRecipeSearch(e) {
  e.preventDefault();
  const searchField = searchFormInput.val().trim();
  let endpoint = baseUrl + searchField.includes(',') ? '' : 'complexSearch?';
  const intolerance = $('#intolerances').val();
  const diet = $('#diet').val();
  const calorieMax = slider.maxSliderValueNode.innerHTML;
  const calorieMin = slider.minSliderValueNode.innerHTML;

  if (searchField.includes(',')) {
    // Split the comma seperated list of ingredients into an array then map over each element in that array and trim its value to check for empty spaces then filter over that array to make sure someone didn't enter an empty value(comma at the end) then join the array back together into a string with the ',+' between them for the api to understand it.
    console.log(endpoint.slice(endpoint.length - 1, endpoint.length));
    const apiIngredientParam = searchField
      .split(',')
      .map((val) => val.trim())
      .filter(Boolean)
      .join(',+');
    endpoint += `${
      endpoint.slice(endpoint.length - 1, endpoint.length) === '?' ||
      endpoint === ''
        ? ''
        : '&'
    }findByIngredients?ingredients=${apiIngredientParam}&number=15`;
  } else {
    endpoint += `${
      endpoint.slice(endpoint.length - 1, endpoint.length) === '?' ||
      endpoint === ''
        ? ''
        : '&'
    }query=${searchField}`;
  }

  if (diet !== 'default') {
    endpoint += `diet=${diet}`;
  }
  if (intolerance !== 'default') {
    endpoint += `${
      endpoint.slice(endpoint.length - 1, endpoint.length) === '?' ||
      endpoint === ''
        ? ''
        : '&'
    }intolerances=${intolerance}`;
  }
  if (calorieMax !== '800') {
    endpoint += `${
      endpoint.slice(endpoint.length - 1, endpoint.length) === '?' ||
      endpoint === ''
        ? ''
        : '&'
    }maxCalories=${calorieMax}`;
  }
  if (calorieMin !== '50') {
    endpoint += `${
      endpoint.slice(endpoint.length - 1, endpoint.length) === '?' ||
      endpoint === ''
        ? ''
        : '&'
    }minCalories=${calorieMin}`;
  }

  if (searchField.includes(',')) {
    fetchAndDisplayRecipes(endpoint);
    return;
  } else {
    fetchAndDisplayRecipes(endpoint);
    return;
  }
}

function handleModal(e) {
  const modalBackground = $('[role="dialog"]');
  const modalStateHidden = modalBackground.attr('aria-hidden') === 'true';
  console.log(e.target.dataset.recipeId);

  if (!modalStateHidden) {
    modalBackground.attr('aria-hidden', 'true');
  } else {
    modalBackground.attr('aria-hidden', 'false');
  }
}

function refreshButtonEvents() {
  const muleButtons = $('.add-to-mule-btn');
  // console.log(muleButtons);
  for (let i = 0; i < muleButtons.length; i++) {
    muleButtons[i].removeEventListener('click', handleModal);
  }
  for (let i = 0; i < muleButtons.length; i++) {
    muleButtons[i].addEventListener('click', handleModal);
  }
}

// On Page Load Grab All the Popular Recipies
$(() => {
  const params = location.search
    .replace('?diet=default&intolerances=default', '')
    .trim();
  if (params !== '') {
    console.log(params.slice(1, params.length));
    // fetchAndDisplayRecipes(baseUrl + params.slice(1, params.length));
  } else {console.log("anything")
    //fetchRandomRecipies();
  }

  displayRecipe(testRecipe, params); // Comment out When Done Testing

  refreshButtonEvents();

  searchFormButton.click(handleRecipeSearch);

  var slidersMultithumb = document.querySelectorAll('.slider-multithumb');

  for (let i = 0; i < slidersMultithumb.length; i++) {
    slider = new SliderMultithumb(slidersMultithumb[i]);
  }

  $('#close-modal-btn').click(() => {
    modalBG.attr('aria-hidden', 'true');
  });
});
