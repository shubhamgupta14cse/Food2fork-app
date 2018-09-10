export const elements ={
  inputform:document.querySelector(".search"),
  inputtext:document.querySelector(".search__field"),
  resultlist:document.querySelector(".results__list"),
  result:document.querySelector(".results"),
  resultpage:document.querySelector(".results__pages"),
  recipe:document.querySelector(".recipe"),
  ingredients:document.querySelector('.recipe__ingredient-list'),
  shoppinglist:document.querySelector('.shopping__list'),
  likelist:document.querySelector('.likes__list')


};

export const elementStrings={
  loader:'loader'
};


export const loader= parent=>{
  const loader = `
      <div class="${elementStrings.loader}">
          <svg>
              <use href="img/icons.svg#icon-cw"></use>
          </svg>
      </div>
  `;
   parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader=()=>{
  const loader =document.querySelector(`.${elementStrings.loader}`);
  if(loader) loader.parentElement.removeChild(loader);


};
