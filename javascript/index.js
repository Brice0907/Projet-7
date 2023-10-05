import { recipes } from "../data/recipes.js";

console.log(recipes)
const main = document.querySelector('.main_bloc');
let count = 0;
function affichageRecipes(recipes) {
    recipes.forEach(element => {
        count++;
        const nbrRecipe = document.querySelector('.top_quantite');
        nbrRecipe.textContent = count + " de reccettes";

        const image = `asset/${element.image}`;

        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'main_div');

        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.setAttribute('class', 'recipe_img')

        const time = document.createElement('div');
        time.setAttribute('class', 'recipe_time');
        time.textContent = element.time + "min";

        const title = document.createElement('div');
        title.setAttribute('class', 'recipe_title')
        title.textContent = element.name;

        const divBlocInfo = document.createElement('div');
        divBlocInfo.setAttribute('class', 'recipe_bloc_info');

        const sousTitle1 = document.createElement('p');
        sousTitle1.setAttribute('class', 'recipe_sous_title');
        sousTitle1.textContent = "RECETTE";

        const description = document.createElement('p');
        description.setAttribute('class', 'recipe_description');
        description.textContent = element.description;

        const sousTitle2 = document.createElement('p');
        sousTitle2.setAttribute('class', 'recipe_sous_title');
        sousTitle2.textContent = "INGRÉDIENTS";

        const blocIngredient = document.createElement('div');
        blocIngredient.setAttribute('class', 'recipe_bloc_ingredient');

        element.ingredients.forEach(el => {
            const listIngredient = document.createElement('div');
            listIngredient.setAttribute('class', 'bloc_ingredient');

            const ingredient = document.createElement('p');
            ingredient.setAttribute('class', 'bloc_ingredient_title');
            ingredient.textContent = el.ingredient;

            const quantity = document.createElement('p');
            quantity.setAttribute('class', 'bloc_ingredient_unite');
            if (el.quantity != undefined && el.unit != undefined) {
                quantity.textContent = el.quantity + " " + el.unit;
            } else if (el.quantity != undefined) {
                quantity.textContent = el.quantity;
            } else {
                return false;
            }

            blocIngredient.appendChild(listIngredient);
            listIngredient.appendChild(ingredient);
            listIngredient.appendChild(quantity);
        })

        mainDiv.appendChild(img);
        mainDiv.appendChild(time)
        mainDiv.appendChild(title);
        mainDiv.appendChild(divBlocInfo);
        divBlocInfo.appendChild(sousTitle1);
        divBlocInfo.appendChild(description);
        divBlocInfo.appendChild(sousTitle2);
        mainDiv.appendChild(blocIngredient);
        main.appendChild(mainDiv);
    });
}
affichageRecipes(recipes);

// TRIE INGREDIENT
// function filter à faire
// testtt(recipes, "ingredients", "ingredient");
// testtt(recipes, "ustensils");
// function testtt(recipes, ingredients, ingredient){
//     for (let i = 0; i < recipes.length; i++) {
//         for (let b = 0; b < recipes[i][ingredients].length; b++) {
//             let ingr = recipes[i][ingredients][b][ingredient]
//             let ingredient = ingr.charAt(0).toUpperCase() + ingr.slice(1).toLowerCase();
//             ingredientArray.push(ingredient);
//         }
//     }
// }

let ingredientArray = []
for (let i = 0; i < recipes.length; i++) {
    for (let b = 0; b < recipes[i].ingredients.length; b++) {
        let ingr = recipes[i].ingredients[b].ingredient
        let ingredient = ingr.charAt(0).toUpperCase() + ingr.slice(1).toLowerCase();
        ingredientArray.push(ingredient);
    }
}
const newIngredientArray = ingredientArray.filter((a, b) => ingredientArray.indexOf(a) == b);

const divBlocIngredient = document.querySelector('.top_triage_element');
function ingredientAffi(filteredArray) {
    filteredArray.forEach(element => {
        const div = document.createElement('div');
        div.setAttribute('class', 'top_triage_element_text');
        div.textContent = element
        divBlocIngredient.appendChild(div)
    })
}
ingredientAffi(newIngredientArray)

// TRIE APPAREILS

let appareilsArray = []
for (let i = 0; i < recipes.length; i++) {
    let app = recipes[i].appliance;
    appareilsArray.push(app);
}
const newAppareilsArray = appareilsArray.filter((a, b) => appareilsArray.indexOf(a) == b);

const divBlocAppareils = document.querySelector('.top_triage_element_appareils');
function appareilsAffi(filteredArray) {
    filteredArray.forEach(element => {
        const div = document.createElement('div');
        div.setAttribute('class', 'top_triage_element_text');
        div.textContent = element;
        divBlocAppareils.appendChild(div);
    })
}
appareilsAffi(newAppareilsArray)

// TRIE USTENSILES

let ustensilesArray = []
for (let i = 0; i < recipes.length; i++) {
    for (let b = 0; b < recipes[i].ustensils.length; b++) {
        let ust = recipes[i].ustensils[b];
        let ustensiles = ust.charAt(0).toUpperCase() + ust.slice(1).toLowerCase();
        ustensilesArray.push(ustensiles);
    }
}
const newUstensilesArray = ustensilesArray.filter((a, b) => ustensilesArray.indexOf(a) == b);

const divBlocustensiles = document.querySelector('.top_triage_element_ustensiles');
function ustensilesAffi(filteredArray) {
    filteredArray.forEach(element => {
        const div = document.createElement('div');
        div.setAttribute('class', 'top_triage_element_text');
        div.textContent = element;
        divBlocustensiles.appendChild(div);
    })
}
ustensilesAffi(newUstensilesArray)

// BOUTON TRIE

const btnTriage = document.querySelectorAll('.top_triage_btn');
const blocTriage = document.querySelectorAll('.top_triage_tri');
const elementTriage = document.querySelectorAll('.top_triage_tri_research');
const chevron = document.querySelectorAll('.fa-chevron-up');
const cross = document.querySelectorAll('.bloc_input_triage_cross');
const loopTri = document.querySelectorAll('.bloc_input_triage_logo');

btnTriage.forEach((btn, index) => {
    btn.addEventListener('click', () => OpenTrie(index));
})

function OpenTrie(index) {

    if (elementTriage[index].classList[1] == "block") {
        chevron[index].classList.add('rotate');
        blocTriage[index].classList.add("hauteur");
        elementTriage[index].classList.add("none");
        elementTriage[index].classList.remove("block");
    } else {
        chevron[index].classList.remove('rotate');
        blocTriage[index].classList.remove("hauteur");
        elementTriage[index].classList.remove("none");
        elementTriage[index].classList.add("block");
        cross[index].classList.remove('fa-xmark');
        loopTri[index].style.transform = "translateX(-20px)";
    }
}

// INPUT

const inputHeader = document.querySelector('.header_bloc_research_bar');
const crossHeader = document.querySelector('.header_bloc_research_cross');

inputHeader.addEventListener('input', () => crossHeaderApparition(inputHeader));

function crossHeaderApparition(inputHeader) {
    if (inputHeader.value != "") {
        crossHeader.classList.add('fa-xmark');
        inputHeader.style.marginRight = "0px"

    } else {
        crossHeader.classList.remove('fa-xmark');
        inputHeader.style.marginRight = "17px"
    }
}

const inputTri = document.querySelectorAll('.top_triage_tri_input');
inputTri.forEach((input, index) => {
    input.addEventListener('input', () => crossApparition(input, index));
})

function crossApparition(input, index) {
    if (input.value != "") {
        cross[index].classList.add('fa-xmark');
        loopTri[index].style.transform = "translateX(-30px)";
    } else {
        cross[index].classList.remove('fa-xmark');
        loopTri[index].style.transform = "translateX(-20px)";
    }
}

const xmark = document.querySelectorAll('.cross');
const input = document.querySelectorAll('.input');
xmark.forEach((el, index) => {
    el.addEventListener('click', () => clearInput(index));
})

function clearInput(index) {
    xmark[index].classList.remove('fa-xmark');
    input[index].value = '';

    if (input[index].id === 'searchIngredient') {
        divBlocIngredient.innerHTML = '';
        ingredientAffi(newIngredientArray)
    } else if (input[index].id === 'searchAppareils') {
        divBlocAppareils.innerHTML = '';
        appareilsAffi(newAppareilsArray)
    } else if (input[index].id === 'searchUstensiles') {
        divBlocustensiles.innerHTML = '';
        ustensilesAffi(newUstensilesArray)
    } else if (input[index].id === 'research') {
        inputHeader.style.marginRight = "17px"
        affichageRecipes(recipes);
    }
}

// SYSTEME DE TRI INGREDIENT, APPAREILS, USTENSILES

const searchIngredient = document.querySelector('#searchIngredient');
const searchAppareil = document.querySelector('#searchAppareils');
const searchUstensile = document.querySelector('#searchUstensiles');

searchIngredient.addEventListener('input', (e) => filtered(e, searchIngredient, divBlocIngredient, newIngredientArray));
searchAppareil.addEventListener('input', (e) => filtered(e, searchAppareil, divBlocAppareils, newAppareilsArray));
searchUstensile.addEventListener('input', (e) => filtered(e, searchUstensile, divBlocustensiles, newUstensilesArray));

function filtered(e, el, bloc, newArr) {
    el.addEventListener('input', function () { filterIngredient(e, bloc, newArr) });
}

function filterIngredient(e, bloc, newArr) {

    bloc.innerHTML = '';

    if (e.target.value.length >= 3) {

        let stringInput = e.target.value.toLowerCase();
        let filterIngredientArr = newArr.filter(el => el.toLowerCase().includes(stringInput))

        if (e.target.id === 'searchIngredient') {
            ingredientAffi(filterIngredientArr)
        } else if (e.target.id === 'searchAppareils') {
            appareilsAffi(filterIngredientArr)
        } else if (e.target.id === 'searchUstensiles') {
            ustensilesAffi(filterIngredientArr)
        }

    } else if (e.target.value.length < 3) {

        if (e.target.id === 'searchIngredient') {
            ingredientAffi(newArr)
        } else if (e.target.id === 'searchAppareils') {
            appareilsAffi(newArr)
        } else if (e.target.id === 'searchUstensiles') {
            ustensilesAffi(newArr)
        }
    }
}

// SYSTEME DE TRI BARRE PRINCIPALE

const searchBar = document.querySelector('.header_bloc_research_bar');

searchBar.addEventListener('input', (e) => mainFilter(e));

let newRecipes = [];

function mainFilter(e) {

    if (e.target.value.length >= 3) {
        newRecipes = [];
        main.innerHTML = "";
        let stringInput = e.target.value.toLowerCase();

        for (let i = 0; i < recipes.length; i++) {
            let recipeName = recipes[i].name.toLocaleLowerCase();
            let recipeDescription = recipes[i].description.toLocaleLowerCase();

            for (let x = 0; x < recipes[i].ingredients.length; x++) {
                let recipeIngredient = recipes[i].ingredients[x].ingredient.toLocaleLowerCase();

                if (recipeName.includes(stringInput) || recipeDescription.includes(stringInput) || recipeIngredient.includes(stringInput)) {
                    newRecipes.push(recipes[i]);
                    break;
                }
            }
        }
        affichageRecipes(newRecipes);
    } else if (e.target.value.length < 3) {
        main.innerHTML = "";
        affichageRecipes(recipes);
    }
}