import { recipes } from "../data/recipes.js";

console.log(recipes)
const main = document.querySelector('.main_bloc');
let count = 0;
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

// TRIE INGREDIENT

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
newIngredientArray.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'top_triage_element_text');
    div.textContent = element
    divBlocIngredient.appendChild(div)
})

// TRIE APPAREILS

let appareilsArray = []
for (let i = 0; i < recipes.length; i++) {
    let app = recipes[i].appliance;
    appareilsArray.push(app);
}
const newAppareilsArray = appareilsArray.filter((a, b) => appareilsArray.indexOf(a) == b);

const divBlocAppareils = document.querySelector('.top_triage_element_appareils');
newAppareilsArray.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'top_triage_element_text');
    div.textContent = element;
    divBlocAppareils.appendChild(div);
})

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
newUstensilesArray.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'top_triage_element_text');
    div.textContent = element;
    divBlocustensiles.appendChild(div);
})

// BOUTON TRIE

const btnTriage = document.querySelectorAll('.top_triage_btn');
const blocTriage = document.querySelectorAll('.top_triage_tri');
const elementTriage = document.querySelectorAll('.top_triage_tri_research');
const chevron = document.querySelectorAll('.fa-chevron-up');

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
    }

}