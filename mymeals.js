var removeButton = document.getElementById('remove-btn');
var createButton = document.getElementById('create-btn');
//TO DO: listed items delete when the page is refreshed--prolly need sessionStorage

// creates mule based on user input, then keeps it in local storage.
function addMule() {
  var mule = document.getElementById('name').value;
  if (!mule) {
    window.alert('NAME YOUR MULE TO CONTINUE');

    return;
  } else {
    let mules = localStorage.getItem('mules');
    let parseMules = mules ? JSON.parse(mules) : [];
    parseMules.push({ name: mule, recipes: [] });
    localStorage.setItem('mules', JSON.stringify(parseMules));
    window.location.reload();
    //sessionStorage.setItem('mules', JSON.strongify(parseMules));
    //  displayMealContainer(parseMules);
  }
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

async function createMules(parsedMules) {
  $('#meal-box').empty();

  parsedMules.forEach(async (mule) => {
    let recipes = ``;

    for (let i = 0; i < mule.recipes.length; i++) {
      recipes += await fetchAndDisplayRecipesById(mule.recipes[i]);
    }

    $('#meal-box').prepend(`
          <li class="p-3 bg-slate-500 rounded flex flex-col ">
          <button data-name='${mule.name}' class='add-to-mule'>
          <p class="text-2xl pointer-events-none" >${mule.name}</p>
          <ul class=" pointer-events-none">
      
            ${mule.recipes.length ? await recipes : 'No Recipes Yet'}
          </ul>
          <button>
          </li>
        `);
  });
}

// removes mule meal from list and localStorage

function removeMule() {
  var userInput = window.prompt('name the mule you would like to remove');
  var muleName = querySelector('.meal-box');

  if (userInput === muleName) {
    window.alert('NO MULES WERE HARMED DURING REMOVAL...');
    document.getElementById('list-items').remove(muleName);
    localStorage.removeItem('mule');
  } else if (userInput !== muleName) {
    window.alert('NO MULES RESPONDED...TRY ANOTHER NAME');
  } else !userInput;
  window.alert("MULES WILL LAY AROUND EATING IF YOU DON'T HOLLER AT 'EM");
}
$(() => {
  createButton.addEventListener('click', addMule);

  // removeButton.addEventListener('click', removeMule);

  let mules = localStorage.getItem('mules');
  let parseMules = mules ? JSON.parse(mules) : [];
  createMules(parseMules);
});
