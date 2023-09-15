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

const btnTriage = document.querySelectorAll('.top_triage_tri');

btnTriage.addEventListener('click', function () {
    btnTriage.setAttribute('class',);
})