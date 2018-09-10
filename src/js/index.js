// Global app controller
import {elements, loader,clearLoader } from './views/base'
import search from './models/Search'
import recipe from './models/Recipe'
import list from './models/List'
import likes from './models/Likes'
import * as viewSearch from './views/viewSearch'
import * as viewRecipe from './views/viewRecipe'
import * as viewList from './views/viewList'
import * as viewLikes from './views/viewLikes'


const state={
  recipe:1
};

//SEARCH CONTROLLER
const searchControl= async()=> {


  //1. GET QUERY FROM UI
  const query=viewSearch.getQuery();
  console.log(query);
  if(query){

  //2. CREATE THE SEARCH OBJECT AND ADD TO STATE
  state.search =new search(query);
  console.log(state.search);

  //3. PREPARE UI FOR SEARCH RESULT
   //clear input field
   viewSearch.clearInput();
   //clear previous result list
   viewSearch.clearRecipe();

   //add loading icon
   loader(elements.result);




  //4. GET THE SEARCH RESULT FORM API
  await state.search.getResults(query);
  console.log(state.search.result)

  //5. RENDER THE UI FOR SEARCH RESULT
   //clear the loading icon
   clearLoader();
   // render the search result
   viewSearch.renderResults(state.search.result,);
}
};




//RECIPE CONTROLLER
const recipeControl= async(id)=> {

  //1. CREATE THE RECIPE OBJECT AND ADD TO STATE
  state.recipe =new recipe(id);
  window.r=state.recipe;
  console.log(state.recipe);


  //2. PREPARE UI FOR RECIPE
   //clear previous recipe
   viewRecipe.clearRecipe();

   //add loading icon
   loader(elements.recipe);

  //3. GET THE SEARCH RESULT FORM API AN PARSE INGREDIENTS
  await state.recipe.getResults();
  //console.log(state.recipe.result)
  state.recipe.parseIngredient();
    // Calculate servings and time
    state.recipe.calcTime();
    state.recipe.clacServings();

  //4. RENDER THE UI FOR RECIPE
   //clear the loading icon
   clearLoader();
   // render the recipe
   viewRecipe.renderRecipe(state.recipe);
   viewLikes.toggleLikes(state.likes.isLiked(state.recipe.rid));

//}
}


//SHOPPING LIST CONTROLLER
const listControl=()=>{
  //1. create a shopping list if not exixt
  if(!state.list) state.list=new list();
  //2. add the current recipe ingredient to the list
  state.recipe.ingredients.forEach(el=>{
    const item=state.list.addItem(el.count,el.unit,el.ingredient);
    viewList.renderList(item);



  })
}




//HANDLE SHOPPING LIST ITEM DELETE AND UPDATE
elements.shoppinglist.addEventListener('click',e=>{
  const id= e.target.closest('.shopping__item').dataset.id;
    //delete item form list
    if(e.target.matches('.shopping__item,.shopping__item *')){
      //remove from shopping list
      state.list.deleteItem(id);
        //delete item from ui
         viewList.deleteList(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
  })


state.likes=new likes();
state.likes.readStorage();
viewLikes.renderMenu(state.likes.getNoLikes());
state.likes.likes.forEach(item=>viewLikes.renderLikes(item));




  //LIKES CONTROLLER
  const likeControl=()=>{
    //create a like list if not present

    const currentid=state.recipe.rid;
    // add likes to the state
    if(!state.likes.isLiked(currentid)){

      const item=state.likes.addItem(currentid,
      state.recipe.result.title,
      state.recipe.result.image_url,
      state.recipe.result.publisher);
      console.log(item);

    // toggle like button
    viewLikes.toggleLikes(true);
    // update the ui
    viewLikes.renderMenu(state.likes.getNoLikes());
    viewLikes.renderLikes(item);


    }
    else {
      //delete item
      state.likes.deleteItem(currentid);

      //toggle like button
      viewLikes.toggleLikes(false);

      //update the ui
      viewLikes.renderMenu(state.likes.getNoLikes());
      viewLikes.removeLikes(currentid);

    }

  }




//EVENT LISTNER FOR SEARCH
elements.inputform.addEventListener("submit",e=>{
  e.preventDefault();
  searchControl();
})




//EVENT LISTENER FOR RECIPES PAGINATION
elements.resultpage.addEventListener('click', e=>{
  let button,page;
  if(e.path.length===8){
    button =e.path[0];
  }
  else if(e.path.length===9){
    button =e.path[1];
  }
  else if(e.path.length===10){
    button =e.path[2];
  }
  page=parseInt(button.childNodes[1].innerText.slice(5, 6));
  viewSearch.clearRecipe();
  viewSearch.renderResults(state.search.result,page);

})




// EVNET LISTENER FOR RECIPE
elements.resultlist.addEventListener('click',  e=>{
  const id=e.target.closest('.results__link').getAttribute('href').slice(1);
  recipeControl(id);

})
//EVENT LISTNER FOR LIKED RECIPE LIST
elements.likelist.addEventListener('click',  e=>{
  const id=e.target.closest('.likes__link').getAttribute('href').slice(1);
  recipeControl(id);

})




//EVENT LISTNER FOR SERVINGS,SHOPPING LIST AND LIKES
elements.recipe.addEventListener('click' ,e=>{
  //servings decrease
  if(e.target.matches('.btn-decrease, .btn-decrease *'))
  { if(state.recipe.servings>1){
    state.recipe.updateServings('dec');
    viewRecipe.clearRecipe();
    viewRecipe.renderRecipe(state.recipe);
    viewLikes.toggleLikes(state.likes.isLiked(state.recipe.rid));

}

  }
  //servings increase
  else if(e.target.matches('.btn-increase, .btn-increase *'))
  {
    state.recipe.updateServings('inc');
    viewRecipe.clearRecipe();
    viewRecipe.renderRecipe(state.recipe);
    viewLikes.toggleLikes(state.likes.isLiked(state.recipe.rid));
}
//shopping list
if(e.target.matches('.recipe__btn, .recipe__btn *'))
{
  listControl();
}
//likes
if(e.target.matches('.recipe__love, .recipe__love *')){

  likeControl();
}

});
