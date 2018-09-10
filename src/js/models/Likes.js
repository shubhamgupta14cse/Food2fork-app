export default class likes{
  constructor(){
    this.likes=[];
  }

    addItem(id,title,url,publisher){
      const item={
        id,
        title,
        url,
        publisher
      };
      this.likes.push(item);
      //presist data in local storage
      this.presistData();
      return item;


    }

    deleteItem(id){
      const index=this.likes.findIndex(el=>el.id===id);
      this.likes.splice(index,1);

      //persist data in local storage
      this.presistData();

    }
    isLiked(id){
      return this.likes.findIndex(el => el.id===id) !==-1;

    }
    getNoLikes() {
        return this.likes.length;
    }

    presistData(){

      localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    readStorage(){

      const storage=JSON.parse(localStorage.getItem('likes'));
      if(storage) this.likes=storage;
    }


    }
