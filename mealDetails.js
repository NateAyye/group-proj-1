

const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

  

  function fetchRandomRecipies(id) {
    
    const endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`
  
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

        document.querySelector("#dish-name").innerHTML = data.title
        document.querySelector("#dish-summary").innerHTML = data.summary
        document.querySelector("#prep-time").innerHTML = data.readyInMinutes
        document.querySelector("#health-score").innerHTML = data.healthScore
        document.querySelector("#directions").innerHTML = data.instructions
        document.querySelector("#food-image").src = data.image
        let extendedIngredients = data.extendedIngredients.name
    console.log(extendedIngredients)
    for (let i = 0; i < extendedIngredients.length; i++){
      document.querySelector("#ingredients") = extendedIngredients
    }

        
      });
  }


  $(() => {
    // fetchRandomRecipies(location.search.split("=")[1]);
    // displayMealdetails(testRecipe);
   location.search.split("=") 
   
  
    console.log(location.search.split("="))

  });
  