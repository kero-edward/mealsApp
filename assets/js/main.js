$(".openMenu i.openIcon").click(function () {
    $("#list-example").animate({ left: "0" }, 500);
    $(".openMenu").animate({ marginLeft: "250px" }, 500);
    $(".openMenu i.openIcon").hide();
    $(".openMenu i.closeIcon").show();
    $("#list-example .list-group-item").animate({ top: "0px" }, 1000);
});

$(".openMenu i.closeIcon").click(function () {
    $("#list-example").animate({ left: "-250px" }, 500);
    $(".openMenu").animate({ marginLeft: "0" }, 500);
    $(".openMenu i.closeIcon").hide();
    $(".openMenu i.openIcon").show();
    $("#list-example .list-group-item").animate({ top: "200px" }, 1000);
});

const rePass = document.querySelector("#rePass");
const rePassAlert = document.querySelector(".rePassAlert");
const passAlert = document.querySelector(".passAlert");
const ageAlert = document.querySelector(".ageAlert");
const nameAlert = document.querySelector(".nameAlert");
const phoneAlert = document.querySelector(".phoneAlert");
const emailAlert = document.querySelector(".emailAlert");
const mealsDiv = document.querySelector(".allMeals");
const searchInputs = document.querySelector(".searchInputs");
let searchWord,
    isNameValid = false,
    isAgeValid = false,
    isEmailValid = false,
    isPhoneValid = false,
    isPassValid = false,
    isRePassValid = false;


(async function getMeals() {
    const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const mealsData = await meals.json();
    displayMeals(mealsData.meals);
})();

function displayMeals(mealArray) {
    let allMeals = '';

    for (const iterator of mealArray) {
        allMeals += `<div class="col-md-3">
                        <div class="rounded-2 card overflow-hidden border-0" onclick="getMealDetails(${iterator.idMeal})">
                            <img src="${iterator.strMealThumb}" class="rounded-2 img-fluid" alt="${iterator.strMeal}">
                            <div class="mealNameLayer position-absolute d-flex justify-content-center align-items-center">
                                <h3>${iterator.strMeal}</h3>
                            </div>
                        </div>
                    </div>`
    }

    mealsDiv.innerHTML = allMeals;
    $(".loaderBox").hide();
}

function getMealDetails(id) {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';
    mealsDiv.innerHTML = '';


    (async function getMealDetails() {
        const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealData = await meal.json();
        displayDetails(mealData.meals[0]);
    })();

    function displayDetails(meal) {
        console.log('meal: ', meal);

        mealsDiv.innerHTML = `<div class="col-md-4" style="z-index: 9;">
                                <div class="image">
                                    <img src="${meal.strMealThumb}" class="img-fluid rounded-2 w-100" alt="${meal.strMeal}">
                                </div>
                                <div class="title text-white text-capitalize mt-2">
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                            <div class="col-md-8 text-white" style="z-index: 9;">
                                <div class="instruction">
                                    <h3 class="text-capitalize">instructions</h3>
                                    <p>${meal.strInstructions}</p>
                                </div>
                                <div class="area text-capitalize d-flex gap-2 mt-4">
                                    <h3>area:</h3>
                                    <h3>${meal.strArea}</h3>
                                </div>
                                <div class="category text-capitalize d-flex gap-2 mt-4">
                                    <h3>category:</h3>
                                    <h3>${meal.strCategory}</h3>
                                </div>
                                <div class="recipe text-capitalize mt-4">
                                    <h3>recipes:</h3>
                                    <div class="recipes d-flex gap-3 flex-wrap">
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure1 + " " + meal.strIngredient1}</div>
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure2 + " " + meal.strIngredient2}</div>
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure3 + " " + meal.strIngredient3}</div>
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure4 + " " + meal.strIngredient4}</div>
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure5 + " " + meal.strIngredient5}</div>
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strMeasure6 + " " + meal.strIngredient6}</div>
                                    </div>
                                </div>
                                <div class="tag text-capitalize mt-4">
                                    <h3>tags:</h3>
                                    <div class="tags d-flex gap-3 flex-wrap">
                                        <div class="p-3 mb-2 bg-warning text-dark rounded-2">${meal.strTags}</div>
                                    </div>
                                </div>
                                <div class="btns mt-4 d-flex gap-3">
                                    <button type="button" class="btn btn-success">
                                        <a class="text-white text-decoration-none text-capitalize" target="_blank" href="${meal.strSource}">source</a>
                                    </button>
                                    <button type="button" class="btn btn-danger">
                                        <a class="text-white text-decoration-none text-capitalize" target="_blank" href="${meal.strYoutube}">youtube</a>
                                    </button>
                                </div>
                            </div>`;
    }

    $(".loaderBox").hide();
}

document.querySelector("#search").addEventListener("click", function () {
    searchInputs.innerHTML = `<div class="col-md-6" style="z-index: 9;">
                                    <input id="searchByName" class="form-control" type="text" placeholder="search by name..."
                                        aria-label="default input example" onkeyup="searchWithName(this.value)">
                                </div>
                                <div class="col-md-6" style="z-index: 9;">
                                    <input id="searchByLetter" class="form-control" type="text" placeholder="search by first letter..."
                                        aria-label="default input example" maxlength="1"  onkeyup="searchWithName(this.value)">
                                </div>`;

    mealsDiv.innerHTML = '';
});

function searchWithName(searchWord) {
    $(".loaderBox").show();

    (async function getMealsByName() {
        const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord.toLowerCase()}`);
        const mealsData = await meals.json();
        const filteredMeals = mealsData.meals.slice(0, 20);
        displayMeals(filteredMeals);
    })();
}

function searchWithLetter(searchWord) {
    $(".loaderBox").show();

    (async function getMealsByLetter() {
        const meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchWord.toLowerCase()}`);
        const mealsData = await meals.json();
        const filteredMeals = mealsData.meals.slice(0, 20);
        displayMeals(filteredMeals);
    })();
}

document.querySelector("#categories").addEventListener("click", function () {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';

    (async function getCategories() {
        const categories = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const categoriesData = await categories.json();

        let allCategories = '';

        for (const iterator of categoriesData.categories.slice(0, 20)) {
            allCategories += `<div class="col-md-3">
                                    <div class="rounded-2 card overflow-hidden border-0" onclick="getMealsByCat('${iterator.strCategory}')">
                                        <img src="${iterator.strCategoryThumb}" class="rounded-2 img-fluid" alt="${iterator.strCategory}">
                                        <div class="mealNameLayer position-absolute d-flex justify-content-center align-items-center">
                                            <h3>${iterator.strCategory}</h3>
                                        </div>
                                    </div>
                                </div>`
        }
        mealsDiv.innerHTML = allCategories;
        $(".loaderBox").hide();
    })();
});

function getMealsByCat(cat) {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';
    mealsDiv.innerHTML = '';

    (async function getCategoriesMeals() {
        const categoriesMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const categoriesMealsData = await categoriesMeals.json();
        const filteredCategories = categoriesMealsData.meals.slice(0, 20);
        displayMeals(filteredCategories);
    })();
}

document.querySelector("#area").addEventListener("click", function () {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';

    (async function getArea() {
        const areas = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const areasData = await areas.json();

        let allAreas = '';

        for (const iterator of areasData.meals.slice(0, 20)) {
            allAreas += `<div class="col-md-3">
                            <div class="rounded-2 card overflow-hidden border-0" onclick="getMealsByArea('${iterator.strArea}')">
                                <img src="./assets/images/country.jpg" class="card-img-top img-fluid" alt="${iterator.strArea}">

                                <div class="card-body">
                                    <h3 class="card-text text-center">${iterator.strArea}</h3>
                                </div>
                            </div>
                        </div>`
        }
        mealsDiv.innerHTML = allAreas;
        $(".loaderBox").hide();
    })();
});

function getMealsByArea(area) {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';
    mealsDiv.innerHTML = '';

    (async function getCategoriesMeals() {
        const areaMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const areaMealsData = await areaMeals.json();
        const filteredMeals = areaMealsData.meals.slice(0, 20);
        displayMeals(filteredMeals);
    })();
}

document.querySelector("#ingredients").addEventListener("click", function () {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';

    (async function getIngredients() {
        const ingredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const ingredientsData = await ingredients.json();

        let allIngredients = '';

        for (const iterator of ingredientsData.meals.slice(0, 20)) {
            allIngredients += `<div class="col-md-3">
                            <div class="rounded-2 card overflow-hidden border-0" onclick="getMealsByIngredients('${iterator.strIngredient}')">
                                <img src="./assets/images/ingredients.avif" class="card-img-top img-fluid" alt="${iterator.strIngredient}">

                                <div class="card-body">
                                    <h3 class="card-text text-center">${iterator.strIngredient}</h3>
                                </div>
                            </div>
                        </div>`
        }
        mealsDiv.innerHTML = allIngredients;
        $(".loaderBox").hide();
    })();
});

function getMealsByIngredients(ingredient) {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';
    mealsDiv.innerHTML = '';

    (async function getIngredientMeals() {
        const ingredientMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const ingredientMealsData = await ingredientMeals.json();
        const filteredMeals = ingredientMealsData.meals.slice(0, 20);
        displayMeals(filteredMeals);
    })();
}

function nameValidate(name) {

    const regex = /^[a-zA-Z ]{1,30}$/;

    if (regex.test(name) == true) {
        nameAlert.style.display = "none";
        isNameValid = true;
    } else {
        nameAlert.style.display = "block";
        isNameValid = false;
    }
}

function emailValidate(email) {

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(email) == true) {
        emailAlert.style.display = "none";
        isEmailValid = true;
    } else {
        emailAlert.style.display = "block";
        isEmailValid = false;
    }
}

function phoneValidate(phone) {

    const regex = /^01[0125][0-9]{8}$/gm;

    if (regex.test(phone) == true) {
        phoneAlert.style.display = "none";
        isPhoneValid = true;
    } else {
        phoneAlert.style.display = "block";
        isPhoneValid = false;
    }
}

function ageValidate(age) {

    const regex = /^(1[89]|[2-9]\d)$/gm;

    if (regex.test(age) == true) {
        ageAlert.style.display = "none";
        isAgeValid = true;
    } else {
        ageAlert.style.display = "block";
        isAgeValid = false;
    }
}

function passValidate(pass) {

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (regex.test(pass) == true) {
        passAlert.style.display = "none";
        isPassValid = true;
    } else {
        passAlert.style.display = "block";
        isPassValid = false;
    }

    rePassValidate(pass);
}

function rePassValidate(pass) {
    rePassAlert.style.display = "block";

    rePass.addEventListener("keyup", function () {
        if (this.value == pass) {
            rePassAlert.style.display = "none";
            isRePassValid = true;
        } else {
            rePassAlert.style.display = "block";
            isRePassValid = false;
        }

        if (isNameValid == true && isEmailValid == true && isAgeValid == true && isPhoneValid == true && isPassValid == true && isRePassValid == true) {
            document.querySelector("#submitBtn").removeAttribute('disabled');
        } else {
            document.querySelector("#submitBtn").setAttribute('disabled', '');
        }
    });
}

document.querySelector("#contact").addEventListener("click", function () {
    $(".loaderBox").show();
    searchInputs.innerHTML = '';
    mealsDiv.innerHTML = '';

    mealsDiv.innerHTML = `<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput1"
            placeholder="Enter Your Name" onkeyup="nameValidate(this.value)">
    </div>
    <div class="alert alert-danger nameAlert" role="alert">
        Special characters and numbers not allowed, only letters!
    </div>
</div>
<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input type="email" class="form-control" id="exampleFormControlInput2"
            placeholder="Enter Your Email" onkeyup="emailValidate(this.value)">
    </div>
    <div class="alert alert-danger emailAlert" role="alert">
        Email not valid *exemple@yyy.zzz
    </div>
</div>
<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput3"
            placeholder="Enter Your Phone" onkeyup="phoneValidate(this.value)">
    </div>
    <div class="alert alert-danger phoneAlert" role="alert">
        Enter valid Phone Number
    </div>
</div>
<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input type="text" class="form-control" id="exampleFormControlInput4"
            placeholder="Enter Your Age" onkeyup="ageValidate(this.value)">
    </div>
    <div class="alert alert-danger ageAlert" role="alert">
        Enter valid age, from 18 to 99!
    </div>
</div>
<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input type="password" class="form-control" id="exampleFormControlInput5"
            placeholder="Enter Your Password" onkeyup="passValidate(this.value)">
    </div>
    <div class="alert alert-danger passAlert" role="alert">
        Enter valid password, assert from 6 to 16 with at least one number and special character!
    </div>
</div>
<div class="col-md-5" style="z-index: 9;">
    <div class="mb-3">
        <input id="rePass" type="password" class="form-control" id="exampleFormControlInput6"
            placeholder="RePassword">
    </div>
    <div class="alert alert-danger rePassAlert" role="alert">
        RePassword correctly!
    </div>
</div>

<div class="position-relative" style="z-index: 9;">
    <button id="submitBtn" type="button" class="btn btn-success" disabled>Success</button>
</div>`;

    document.querySelector("#submitBtn").setAttribute('disabled', '');

    $(".loaderBox").hide();
});