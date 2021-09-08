const apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

// TARGET ELEMENTS
const mealBtn = document.getElementById("meal_btn");
const mealPic = document.getElementById("random_meal_pic");
const mealCategory = document.getElementById("meal_category");
const mealArea = document.getElementById("meal_area");
const mealTitle = document.getElementById("meal_title");
const ingredientsTitle = document.querySelector("h3")
const mealDescription = document.getElementById("meal_description");
const mealIngredients = document.getElementById("ingredients_list");
const videoTitle = document.getElementById("meal_video_title");
const videoContainer = document.getElementById("video_container");

// FUNCTIONS

// Async function to reach out to the random meal api url, then pass content to display function
async function getRandomMeal() {
	const response = await fetch(apiURL);
	const responseJson = await response.json();

	const { meals } = responseJson;
	const theMeal = meals[0];

	displayMeal(theMeal);
}

// Function to display the contents of the random meal we fetched
function displayMeal(meal) {
	console.log(meal);

    mealPic.setAttribute("src", meal.strMealThumb);
    mealCategory.innerHTML = `<strong>Category: </strong>${meal.strCategory}`;
    mealArea.innerHTML = `<strong>Area: </strong>${meal.strArea}`;

    mealTitle.innerText = meal.strMeal;
    mealDescription.innerText = meal.strInstructions;

    /*
        create a variable and a while loop
         -variable will always increase by 1
         -while loop will go until the value is an empty string
         -create a new li element each iteration and append it to the mealIngredients list
    */

    const ingredients = [];

    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            const mealIngredient = meal[`strIngredient${i}`];
            const mealMeasurement = meal[`strMeasure${i}`];
            
            const ingredientStr = `${mealIngredient} - ${mealMeasurement}`;

            ingredients.push(ingredientStr)
        }
    }

    ingredientsTitle.innerText = 'Ingredients:';

    for (let ingredient of ingredients) {
        const newItem = document.createElement("li");
        newItem.innerText = ingredient;

        mealIngredients.appendChild(newItem);
    }

    videoTitle.innerText = 'Video Recipe';

    const youtubeStr = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`

    const newVideo = document.createElement("iframe");
    newVideo.setAttribute("src", youtubeStr);

    videoContainer.appendChild(newVideo);
}

// EVENT LISTENERS

// Event listener for clicking on the button
mealBtn.addEventListener("click", getRandomMeal);
