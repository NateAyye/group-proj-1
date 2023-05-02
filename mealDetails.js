

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

        document.querySelector("#dish-name").innerHTML = data.recipes[0].title
      });
  }


    fetchRandomRecipies();

   $(() => {
    // fetchRandomRecipies();
    displayMealdetails(testRecipe);
    
  });
  