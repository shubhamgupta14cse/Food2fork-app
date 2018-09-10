import {elements} from './base';

export const getQuery = ()=>elements.inputtext.value;

export const clearInput =()=>{
  elements.inputtext.value="";
};

export const clearRecipe=()=>{
  elements.resultlist.innerHTML="";
    elements.resultpage.innerHTML="";

}

//ADJUST THE RECIPE TITLE LENGTH
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
  }
// ADD A RECIPE TO RESULT LIST
const renderItem=recipe=>{
  const html=`<li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src=${recipe.image_url} alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>`

  elements.resultlist.insertAdjacentHTML('beforeend', html);

}


const createButton=(page,type)=>{

  const button=`
      <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
          <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
          </svg>
      </button>
  `;


    elements.resultpage.insertAdjacentHTML('afterbegin',button);
}

const renderButton=(page,totalresult,resultperpage)=>{

  const pages=Math.ceil(totalresult/resultperpage);
  //one next button if one page
  if(page === 1 && pages > 1){
     createButton(page,'next');
  }
  //both button if in between pages
  else if(page<pages){

   createButton(page,'next');
   createButton(page,'prev');
}

  //one prev button if last page
  else if(page === pages && pages > 1)
  {
   createButton(page,'prev');
}

}


export const renderResults=(recipes,page=1,resultperpage=10)=>{

  const start=(page-1)*resultperpage;
  const end=page*resultperpage;
  //render recipe result
  recipes.slice(start,end).forEach(renderItem);

  //render pagination button
  renderButton(page, recipes.length, resultperpage);
}
