import { recipes } from "../data/recipes.js";

const main = document.querySelector('.main_bloc');
let newRecipes = [];
function affichageRecipes(recipes) {
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
}
affichageRecipes(recipes);

// TRIE INGREDIENT

const divBlocIngredient = document.querySelector('.top_triage_element');
let ingredientArray = []
function recipeIngredient(recette) {
    ingredientArray = []
    for (let i = 0; i < recette.length; i++) {
        for (let b = 0; b < recette[i].ingredients.length; b++) {
            let ingr = recette[i].ingredients[b].ingredient
            let ingredient = ingr.charAt(0).toUpperCase() + ingr.slice(1).toLowerCase();
            ingredientArray.push(ingredient);
        }
    }
    const newIngredientArray = ingredientArray.filter((a, b) => ingredientArray.indexOf(a) == b);
    divBlocIngredient.innerHTML = "";
    ingredientAffi(newIngredientArray)
    secondaire()
    return newIngredientArray;
}
recipeIngredient(recipes)

function ingredientAffi(filteredArray) {
    filteredArray.forEach(element => {
        divBloc(element, divBlocIngredient);
    })
}

// TRIE APPAREILS

const divBlocAppareils = document.querySelector('.top_triage_element_appareils');
let appareilsArray = []
function recipeAppareils(recette) {
    appareilsArray = []
    for (let i = 0; i < recette.length; i++) {
        let app = recette[i].appliance;
        appareilsArray.push(app);
    }
    const newAppareilsArray = appareilsArray.filter((a, b) => appareilsArray.indexOf(a) == b);
    divBlocAppareils.innerHTML = '';
    appareilsAffi(newAppareilsArray)
    secondaire();
    return newAppareilsArray;
}
recipeAppareils(recipes);

function appareilsAffi(filteredArray) {
    filteredArray.forEach(element => {
        divBloc(element, divBlocAppareils);
    })
}

// TRIE USTENSILES

const divBlocustensiles = document.querySelector('.top_triage_element_ustensiles');
let ustensilesArray = []
function recipeUstensiles(recette) {
    ustensilesArray = []
    for (let i = 0; i < recette.length; i++) {
        for (let b = 0; b < recette[i].ustensils.length; b++) {
            let ust = recette[i].ustensils[b];
            let ustensiles = ust.charAt(0).toUpperCase() + ust.slice(1).toLowerCase();
            ustensilesArray.push(ustensiles);
        }
    }
    const newUstensilesArray = ustensilesArray.filter((a, b) => ustensilesArray.indexOf(a) == b);
    divBlocustensiles.innerHTML = '';
    ustensilesAffi(newUstensilesArray)
    secondaire();
    return newUstensilesArray;
}
recipeUstensiles(recipes);

function ustensilesAffi(filteredArray) {
    filteredArray.forEach(element => {
        divBloc(element, divBlocustensiles);
    })
}

// CODE FACTORISÉ UTILISÉ DANS CHAQUE TRIE
function divBloc(element, blocDiv) {
    const div = document.createElement('div');
    div.setAttribute('class', 'top_triage_element_text');
    div.textContent = element;
    blocDiv.appendChild(div);
}

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
    xmark[0].classList.remove('fa-xmark');
    input[index].value = '';

    if (input[index].id === 'searchIngredient') {
        divBlocIngredient.innerHTML = '';
        newRecipes.length ? recipeIngredient(newRecipes) : recipeIngredient(recipes);
    } else if (input[index].id === 'searchAppareils') {
        divBlocAppareils.innerHTML = '';
        newRecipes.length ? recipeAppareils(newRecipes) : recipeAppareils(recipes);
    } else if (input[index].id === 'searchUstensiles') {
        divBlocustensiles.innerHTML = '';
        newRecipes.length ? recipeUstensiles(newRecipes) : recipeUstensiles(recipes);
    } else if (input[index].id === 'research') {
        inputHeader.style.marginRight = "17px"
        main.innerHTML = ""
        tab = [];
        affiFacto()
    }
}

// FUNCTION D'AFFI FACTO

function affiFacto() {
    if (newRecipes.length > 0) {
        affichageRecipes(newRecipes);
        recipeIngredient(newRecipes);
        recipeAppareils(newRecipes);
        recipeUstensiles(newRecipes);
    } else {
        affichageRecipes(recipes);
        recipeIngredient(recipes);
        recipeAppareils(recipes);
        recipeUstensiles(recipes);
    }
}

// SYSTEME DE TRI INGREDIENT, APPAREILS, USTENSILES

const searchIngredient = document.querySelector('#searchIngredient');
const searchAppareil = document.querySelector('#searchAppareils');
const searchUstensile = document.querySelector('#searchUstensiles');


searchIngredient.addEventListener('input', (e) => filtered(e, searchIngredient, divBlocIngredient, newRecipes.length ? recipeIngredient(newRecipes) : recipeIngredient(recipes)));
searchAppareil.addEventListener('input', (e) => filtered(e, searchAppareil, divBlocAppareils, newRecipes.length ? recipeAppareils(newRecipes) : recipeAppareils(recipes)));
searchUstensile.addEventListener('input', (e) => filtered(e, searchUstensile, divBlocustensiles, newRecipes.length ? recipeUstensiles(newRecipes) : recipeUstensiles(recipes)));

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
let tab = []
function mainFilter(e) {

    if (e.target.value.length >= 3) {

        main.innerHTML = "";

        let stringInput = e.target.value.toLowerCase();

        if (newRecipes.length > 0) {
            mainFacto(newRecipes, stringInput)
        } else {
            mainFacto(recipes, stringInput)
        }

        if (newRecipes.length === 0) {
            const nbrRecipe = document.querySelector('.top_quantite');
            nbrRecipe.textContent = 0 + " de reccette";
        }
        affichageRecipes(tab);
        recipeIngredient(tab);
        recipeAppareils(tab);
        recipeUstensiles(tab);
        secondaire()

    } else if (e.target.value.length === 0) {
        main.innerHTML = "";
        tab = [];
        affiFacto()
        secondaire()
    }
}

function mainFacto(recette, str) {
    tab = []
    for (let i = 0; i < recette.length; i++) {
        let recipeName = recette[i].name.toLocaleLowerCase();
        let recipeDescription = recette[i].description.toLocaleLowerCase();

        for (let x = 0; x < recette[i].ingredients.length; x++) {
            let recipeIngredient = recette[i].ingredients[x].ingredient.toLocaleLowerCase();

            if (recipeName.includes(str) || recipeDescription.includes(str) || recipeIngredient.includes(str)) {
                tab.push(recette[i]);
                break;
            }
        }
    }
}

// TRI SECONDAIRE AU CLICK

let secondaireTri = document.querySelector('.secondaire_tri');

function secondaire() {
    let elementText = document.querySelectorAll('.top_triage_element_text');
    elementText.forEach((el) => {
        el.addEventListener('click', () => secondaireFilter(el))
    });
}
secondaire()

function secondaireFilter(el) {

    let div = document.createElement('div');
    div.setAttribute('class', 'secondaire_tri_bloc')
    let content = el.textContent
    div.textContent = content

    let i = document.createElement('i');
    i.setAttribute('class', 'fa-solid fa-xmark secondaire_tri_bloc_cross');

    let triBloc = document.querySelectorAll('.secondaire_tri_bloc')

    div.appendChild(i);

    let ajout = true;

    for (let i = 0; i < triBloc.length; i++) {
        if (triBloc[i].textContent === el.textContent) {
            ajout = false;
            break;
        }
    }

    if (ajout) {
        secondaireTri.appendChild(div);
        seconfaireFilterTri(
            content,
            newRecipes.length ? recipeIngredient(newRecipes) : tab.length ? recipeIngredient(tab) : recipeIngredient(recipes),
            newRecipes.length ? recipeAppareils(newRecipes) : tab.length ? recipeAppareils(tab) : recipeAppareils(recipes),
            newRecipes.length ? recipeUstensiles(newRecipes) : tab.length ? recipeUstensiles(tab) : recipeUstensiles(recipes)
        );
    }

    i.addEventListener('click', () => secondaireFilterClear(el));
}

// TRI SECONDAIRE SUPPRESSION FILTRE

function secondaireFilterClear(el) {
    let triBloc = document.querySelectorAll('.secondaire_tri_bloc')
    for (let i = 0; i < triBloc.length; i++) {
        if (el.textContent === triBloc[i].childNodes[0].data) {
            triBloc[i].remove();
        }
    }
    affiAfterSuppr()
}

// RE AFFI APRES SUPPRESSION FILTRE 

function affiAfterSuppr() {
    let triBloc = document.querySelectorAll('.secondaire_tri_bloc')

    if (tab.length === 0 && triBloc.length === 0) {
        newRecipes = [];
        main.innerHTML = "";
        affiFacto()
    }
    if (triBloc.length === 0 && tab.length > 0) {
        newRecipes = tab;
        main.innerHTML = "";
        affiFacto()
        newRecipes = [];
    }
    if (triBloc.length > 0) {
        newRecipes = []

        for (let i = 0; i < triBloc.length; i++) {
            if (!searchBar.value) {
                seconfaireFilterTri(triBloc[i].textContent, recipeIngredient(recipes), recipeAppareils(recipes), recipeUstensiles(recipes));
            }
            if (tab.length > 0) {
                seconfaireFilterTri(triBloc[i].textContent, recipeIngredient(tab), recipeAppareils(tab), recipeUstensiles(tab));
            }
        }
    }
}

// FUNCTION SECONDAIRE TRI TABLEAU

let valeur = "";
function seconfaireFilterTri(content, ingredientArr, appareilArr, ustensileArr) {
    valeur = "";

    factoseconfaireFilterTri(ingredientArr, content, "ingredient");

    if (!valeur) {
        factoseconfaireFilterTri(appareilArr, content, "appareil");
    }
    if (!valeur) {
        factoseconfaireFilterTri(ustensileArr, content, "ustensile");
    }
    if (valeur) {
        valeurTri(valeur, content, newRecipes.length ? newRecipes : tab.length ? tab : recipes);
    }
}

// FACTO FILTRE

function factoseconfaireFilterTri(arr, content, obj) {
    for (let i = 0; i < arr.length; i++) {
        if (content === arr[i]) {
            valeur = obj;
            break;
        }
    }
}

// AFFICHAGE DES RECETTE APRES FILTRE + MISE A JOUR FILTRE APRES FILTRE

function valeurTri(value, content, tableauRecipe) {
    newRecipes = [];

    for (let i = 0; i < tableauRecipe.length; i++) {

        if (value === "ingredient") {
            for (let x = 0; x < tableauRecipe[i].ingredients.length; x++) {
                let ingredient = tableauRecipe[i].ingredients[x].ingredient;

                if (ingredient.includes(content)) {
                    newRecipes.push(tableauRecipe[i])
                    break;
                }
            }
        }

        if (value === "appareil") {
            let appareil = tableauRecipe[i].appliance

            if (appareil.includes(content)) {
                newRecipes.push(tableauRecipe[i])
            }
        }

        if (value === "ustensile") {
            for (let b = 0; b < tableauRecipe[i].ustensils.length; b++) {
                let ustensils = tableauRecipe[i].ustensils[b];

                let ust = ustensils.charAt(0).toUpperCase() + ustensils.slice(1).toLowerCase();

                if (ust.includes(content)) {
                    newRecipes.push(tableauRecipe[i])
                }
            }
        }
    }

    main.innerHTML = "";
    affichageRecipes(newRecipes);
    recipeIngredient(newRecipes);
    recipeAppareils(newRecipes);
    recipeUstensiles(newRecipes);
}

// LORSQUE RECHERCHE INTROUVABLE // METTRE SE QU'IL Y A D'ECRIS DANS LA BARRE DE RECHERCHE + "Aucune recette ne contient ... "
// FAIRE UNE DEUXIEME VERSION POUR LA BARRE DE RECHERCHE PRINCIPALE
