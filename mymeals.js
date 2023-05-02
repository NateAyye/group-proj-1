// const addMeal = document.querySelector('button') //button is currently a stand in

// searchButton.addEventListener('click', meal);
// will likely need to add 
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




function getMeal(){
    for (let i = 0; i < localStorage.length; i++) {
        var meals = localStorage[i];
        
    }
    const meal = localStorage.getItem('637016')
    document.getElementById('meal1');
    console.log(meal);
}

// createElement