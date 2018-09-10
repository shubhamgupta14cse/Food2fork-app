import {elements} from './base';

export const renderLikes=(item)=>{
const html=`
<li>
    <a class="likes__link" href="#${item.id}">
        <figure class="likes__fig">
            <img src="${item.url}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${item.title}</h4>
            <p class="likes__author">${item.publisher}</p>
        </div>
    </a>
</li>`

elements.likelist.insertAdjacentHTML('beforeend',html);

}


export const removeLikes=(id)=>{

  const node=document.querySelector( `[ href="#${id}" ]`);
  node.parentElement.removeChild(node);
}



export const toggleLikes=(isLiked)=>{
  const string = isLiked? 'heart': 'heart-outlined'

document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#icon-${string}`)

}

export const renderMenu=(likeslenght)=>{
  const string=likeslenght>0?'visible' :'hidden'
  document.querySelector('.likes__field').style.visibility = string;
}
