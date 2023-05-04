const recipeList = $('#recipe-list ul');
const searchFormInput = $('#search-form-container input');
const searchFormButton = $('#search-form-container button');
const modalBG = $('[role="dialog"]');
let currentRecipeId = '';

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

function fetchRandomRecipes() {
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
        displayRecipe(recipes[i], '');
      }
      refreshButtonEvents();
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
    } px-2 py-1 text-[13px] shadow-inner  font-medium text-gray-50  ring-1 ring-inset ring-gray-500/10">${
      badges[i]
    }</span>
    `;
  }
  return innerHtml;
}

function displayRecipe(recipe, endpoint) {
  recipeList.prepend(`
    <li class="flex flex-col items-center py-6 p-0 bg-slate-200 rounded-lg sm:w-full md:p-5 sm:flex-row">
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
      <div class=" ml-4 flex flex-1 flex-col ">
        <div>
            <div class="badges">
            ${
              endpoint.includes('findByIngredients') ? '' : createBadges(recipe)
            }
            </div>
          <div
            class="flex justify-between  font-medium text-gray-900"
          >
            <h3 class="text-md lg:text-2xl">
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

function fetchAndDisplayRecipes1(endpoint) {
  fetch(baseUrl + endpoint, {
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
      for (let i = 0; i < recipes.length; i++) {
        displayRecipe(recipes[i], endpoint);
      }
      refreshButtonEvents();
    });
}

async function fetchAndDisplayRecipesById(id) {
  const endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
  const recipe = fetch(endpoint, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b681d02421mshdf8c1da87759638p16c1fajsn5f6f4a0059e9',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const recipe = data;
      return `
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
            <p></p>
        </div>
      </div>
    </li>
      `;
    });

  return await recipe;
}

function handleRecipeSearch(e) {
  e.preventDefault();
  const searchField = searchFormInput.val().trim();
  if (!searchField) return;

  let endpoint = baseUrl + searchField.includes(',') ? '' : 'complexSearch?';
  const intolerance = $('#intolerances').val();
  const diet = $('#diet').val();
  const calorieMax = slider.maxSliderValueNode.innerHTML;
  const calorieMin = slider.minSliderValueNode.innerHTML;

  if (searchField.includes(',')) {
    // Split the comma seperated list of ingredients into an array then map over each element in that array and trim its value to check for empty spaces then filter over that array to make sure someone didn't enter an empty value(comma at the end) then join the array back together into a string with the ',+' between them for the api to understand it.
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
    fetchAndDisplayRecipes1(endpoint);
    return;
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

  fetchAndDisplayRecipes1(endpoint);
}

function handleModal(e) {
  console.log(e.target.dataset.recipeId);
  currentRecipeId = e.target.dataset.recipeId;
  const modalBackground = $('[role="dialog"]');
  const modalStateHidden = modalBackground.attr('aria-hidden') === 'true';

  if (!modalStateHidden) {
    modalBackground.attr('aria-hidden', 'true');
  } else {
    modalBackground.attr('aria-hidden', 'false');
  }
}

function refreshButtonEvents() {
  $('.add-to-mule-btn').each((i, btn) => {
    btn.removeEventListener('click', handleModal);
  });
  $('.add-to-mule-btn').each((i, btn) => {
    btn.addEventListener('click', handleModal);
  });
}

async function createMules(parsedMules) {
  $('#mules-list').empty();

  parsedMules.forEach(async (mule) => {
    let recipes = ``;

    mule.recipes?.forEach(async (recipe) => {
      recipes += await fetchAndDisplayRecipesById(recipe);
    });

    $('#mules-list').prepend(`
    <li class="p-3 bg-slate-500 rounded flex flex-col ">
    <button data-name='${mule.name}' class='add-to-mule'>
    <p class="text-2xl pointer-events-none" >${mule.name}</p>
    <div class=" pointer-events-none">

      ${mule.recipes[0] ? await fetchAndDisplayRecipesById(mule.recipe) : 'No Recipes Yet'}
    </div>
    <button>
    </li>
  `);
  });
}

// On Page Load Grab All the Popular Recipes
$(() => {
  const muleMeals = localStorage.getItem('mules');
  const parsedMules = muleMeals ? JSON.parse(muleMeals) : [];

  const params = location.search
    .replace('?diet=default&intolerances=default', '')
    .trim();
  if (params !== '') {
    fetchAndDisplayRecipes1(baseUrl + params.slice(1, params.length));
  } else {
    fetchRandomRecipes(); // Comment out When Done Testing
  }

  refreshButtonEvents();

  searchFormButton.click(handleRecipeSearch);

  var slidersMultithumb = document.querySelectorAll('.slider-multithumb');

  for (let i = 0; i < slidersMultithumb.length; i++) {
    slider = new SliderMultithumb(slidersMultithumb[i]);
  }

  $('#close-modal-btn').click(() => {
    modalBG.attr('aria-hidden', 'true');
  });

  createMules(parsedMules);

  $('.add-to-mule').each((i, muleBtn) => {
    muleBtn.addEventListener('click', (e) => {
      console.log(muleBtn);

      parsedMules.forEach((mule) => {
        console.log(mule.name, e.target);
        if (mule.name === e.target.dataset.name) {
          mule.recipes.push('' + currentRecipeId);
        }
      });
      localStorage.setItem('mules', JSON.stringify(parsedMules));
      createMules(parsedMules);
    });
  });
});
