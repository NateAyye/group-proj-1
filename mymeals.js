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
    console.log(mule)
    let mules = localStorage.getItem('mules');
    let parseMules = mules ? JSON.parse(mules):[];
    parseMules.push({name: mule,
                    recipes: [],
                    });
    localStorage.setItem('mules', JSON.stringify(parseMules));
}
    createButton.addEventListener('click', addMule);

// removes mule meal from list and localStorage
var removeButton = document.getElementById('remove-btn');

function removeMule() {
    var userInput = window.prompt("name the mule you would like to remove");
    var muleEl = document.getElementById('meal1') // this is removing the name input field all together
   
    if (userInput === muleEl) {
    muleEl.remove();
    localStorage.removeItem(muleEl);
    }
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


