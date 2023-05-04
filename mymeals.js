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

//TO DO: list items must appear within a div container, 
//and list ina column, rather than a row across the screen;
//also the listed items delete when the page is refreshed


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


//displays user input (mule names) as a list in browser
function displayMeal(parseMules){
        const index = parseMules.length -1;
        var mealName = parseMules[index].name;
        console.log(index);

        mealEl = document.createElement("li");
        mealEl.textContent = mealName;
        document.getElementById('list-items').append(mealName);
        };

    
// removes mule meal from list and localStorage
var removeButton = document.getElementById('remove-btn');

function removeMule() {
    var userInput = window.prompt("name the mule you would like to remove");
    var muleEl = document.getElementsById('list-items'); 
   
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

