const recipeList = $('#recipe-list ul');

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
      console.log(data);
    });
}

function displayRecipe(recipe) {
  recipeList.prepend(`
    <li class="flex py-6 p-5 bg-slate-200 rounded-lg">
      <div
        class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
      >
        <img 
          src="${recipe.image}"
          alt="${recipe.summary.slice(0, 30)}"
          class="h-full w-full object-cover object-center"
        />
      </div>
      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div
            class="flex justify-between text-base font-medium text-gray-900"
          >
            <h3 class="text-2xl">
              <a href="./mealDetails?id=${'' + recipe.id}">${recipe.title}</a>
            </h3>
            <p class="ml-4 flex items-center">
            <img
              alt="Weight Watchers Icon"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4c/WW_%28rebrand%29_logo_2018.png"
              width="20"
              height="20"
             />: ${recipe.weightWatcherSmartPoints}</p>
          </div>
          <div class="flex justify-between text-gray-700/80">
            <p class="text-md">{description}</p>
            <p class="ml-4">Servings: {}</p>
          </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <p class="text-gray-500"></p>
          <div class="flex">
            <button
              type="button"
              class="font-medium text-gray-50 bg-sky-500 px-3 py-1 rounded-md hover:bg-sky-700 hover:text-gray-200"
            >
              &plus; Add to Mule
            </button>
          </div>
        </div>
      </div>
    </li>
  `);
}

// On Page Load Grab All the Popular Recipies
$(() => {
  // fetchRandomRecipies();
  displayRecipe(testRecipe);
});
