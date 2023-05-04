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

//TO DO: listed items delete when the page is refreshed--prolly need sessionStorage 

// creates mule based on user input, then keeps it in local storage.
var createButton = document.getElementById('create-btn');
function addMule() {
    var mule = document.getElementById('name').value;
    if(!mule){
        window.alert("NAME YOUR MULE TO CONTINUE");
        return
        
    }
    else {
   // console.log(mule)
        let mules = localStorage.getItem('mules');
        let parseMules = mules ? JSON.parse(mules):[];
            parseMules.push({name: mule,
                    recipes: [],
                    });
        localStorage.setItem('mules', JSON.stringify(parseMules));
        //sessionStorage.setItem('mules', JSON.strongify(parseMules));
        console.log(parseMules); //expect array in console
        displayMealContainer(parseMules);
    
}
};
    createButton.addEventListener('click', addMule);

//displays user input (mule names) as a list in browser
function displayMealContainer(parseMules){
        const index = parseMules.length -1;
        var muleName = parseMules[index].name;
            console.log(index);

        const mealContainer = document.createElement('div');
        mealContainer.setAttribute('id', 'meal-box');
        mealContainer.textContent = muleName;
        document.querySelector('.output').appendChild(mealContainer);
        window.alert(muleName + " is ready to be packed. Pack your mule with recipes on the recipes page");
        
 };


// removes mule meal from list and localStorage
var removeButton = document.getElementById('remove-btn');

function removeMule() {
    var userInput = window.prompt("name the mule you would like to remove");
    var muleName = querySelector(".meal-box")
   
    if (userInput === muleName) {
        
        window.alert("NO MULES WERE HARMED DURING REMOVAL...");
        document.getElementById('list-items').remove(muleName);
        localStorage.removeItem('mule');
    } 
    else if (userInput !== muleName) {
        window.alert("NO MULES RESPONDED...TRY ANOTHER NAME");
    }
    else (!userInput) 
        window.alert("MULES WILL LAY AROUND EATING IF YOU DON'T HOLLER AT 'EM")
};
    
        removeButton.addEventListener('click', removeMule)