/*
function searchMeals() {
var requestUrl = `https://api.spoonacular.com/food/menuItems`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
        };
        */
// creates mule based on user input, then keeps it in local storage.


var createButton = document.getElementById('create-btn');
function addMule() {
    var mule = document.getElementById('name').value;
   // console.log(mule)
    let mules = localStorage.getItem('mules');
    let parseMules = mules ? JSON.parse(mules):[];
    parseMules.push({name: mule,
                    recipes: [],
                    });
    localStorage.setItem('mules', JSON.stringify(parseMules));
    console.log(parseMules); //expected array response
    displayMeal(parseMules);
   
};
    createButton.addEventListener('click', addMule);


function displayMeal(parseMules){
   for (let i = 0; i < parseMules.length; i++) {
        const MEAL = parseMules[0].length -1;
        var mealName = MEAL.name;
        
        mealEl = document.createElement("li");

         mealEl.textContent = mealName;

        document.getElementById('list-item').append(mealName);
    // document.getElementById().append(recipe);
        }

       // document.getElementById('box1').textContent = mealName;
       // document.getElementById('box2').textContent = recipe;


       // document.createElement()
        
    };

    /*
// removes mule meal from list and localStorage
var removeButton = document.getElementById('remove-btn');

function removeMule() {
    var userInput = window.prompt("name the mule you would like to remove");
    var muleEl = document.getElementsById('box2'); 
   
    if (userInput === muleEl) {
    alert("NO MULES WERE HARMED DURING REMOVAL...");
    document.remove(muleEl);
    localStorage.removeItem('mule');
    } 
    else if (userInput !== muleEl) {
    alert("NO MULES RESPONDED...TRY ANOTHER NAME");
  }
    else (!userInput) 
        alert("MULES WILL LAY AROUND EATING IF YOU DON'T HOLLER AT 'EM")
    };

    removeButton.addEventListener('click', removeMule)


//fetches meal information from localStorage and appends item to list
function getMeal(){
    for (let i = 0; i < localStorage.length; i++) {
        var mealsArray = localStorage[i];
       // var meal = data.testRecipe.id;
    
        document.createElement('li');
        document.getElementById('meal1').textContent = mealsArray;
    }
    //const meal = localStorage.getItem()
   
    console.log(mealsArray);
}
*/

