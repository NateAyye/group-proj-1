


const baseUrl =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';

  

  function fetchRandomRecipies(id) {
    
    const endpoint = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`
    const point = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/nutritionWidget.json`
  
    fetch(point, {
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

      document.querySelector("#calories").innerHTML += data.calories
      document.querySelector("#carbs").innerHTML += data.carbs
      document.querySelector("#fat").innerHTML += data.fat 
      document.querySelector("#protein").innerHTML += data.protein
      
      let listHTML = ''
      const ingredients = data.ingredients
      for (let i = 0; i < ingredients.length; i++){
        const ingredient = ingredients[i];
        console.log(ingredient.name);
        console.log(ingredient.amount)
        listHTML += '<ul><li>'  + ingredient.amount + ingredient.unit + " " + ingredient.name +'</li></ul>'
      }

      document.querySelector("#ingredients").innerHTML = listHTML
    })
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
        document.querySelector("#prep-time").innerHTML += data.readyInMinutes
        document.querySelector("#health-score").innerHTML = data.healthScore
        document.querySelector("#directions").innerHTML = data.instructions
        document.querySelector("#food-image").src = data.image
        
        
      });
  }


  $(() => {
    //  fetchRandomRecipies(location.search.split("=")[1]);
    // displayMealdetails(testRecipe);
   location.search.split("=") 
   
  
    console.log(location.search.split("="))

  });
  