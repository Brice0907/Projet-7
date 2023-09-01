import { recipes } from "../data/recipes.js";

console.log(recipes)
const main = document.querySelector('.main_bloc');
recipes.forEach(element => {

    const image = `asset/${element.image}`;

    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'main_div');

    const img = document.createElement('img');
    img.setAttribute('src', image);
    img.setAttribute('class', 'recipe_img')

    const title = document.createElement('div');
    title.setAttribute('class', 'recipe_title')
    title.textContent = element.name;

    mainDiv.appendChild(img);
    mainDiv.appendChild(title);
    main.appendChild(mainDiv);
});