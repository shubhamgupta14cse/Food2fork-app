import {elements} from './base'

//RENDER RECIPE
export const renderRecipe=(recipe)=>{

  const recipeHTML=`
  <figure class="recipe__fig">
        <img src=${recipe.result.image_url} class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.result.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">

        </ul>

        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.result.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.result.source_url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>`;

    elements.recipe.insertAdjacentHTML('afterbegin',recipeHTML);
    recipe.ingredients.forEach(renderIngredients);

  }

// RENDER INGREDIENTS TO RECIPE
  const renderIngredients=(el)=>{
  const ingredienthtml=
      `<li class="recipe__item">
          <svg class="recipe__icon">
              <use href="img/icons.svg#icon-check"></use>
          </svg>
          <div class="recipe__count">${el.count}</div>
          <div class="recipe__ingredient">
              <span class="recipe__unit">${el.unit}</span>
              ${el.ingredient}
          </div>
      </li>`;
  document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend',ingredienthtml);
  }



// CLEAR THE PREVIOUS RECIPE
export const clearRecipe=()=>{

    elements.recipe.innerHTML="";
}
