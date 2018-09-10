import uniqid from 'uniqid';

export default class list{
  constructor(){
    this.list=[];

  }

  addItem(count,unit,ingredient){
    const list={
      id:uniqid(),
      count,
      unit,
      ingredient
    };
    this.list.push(list);
    return list;
  }

  deleteItem(id){
    const index=this.list.findIndex(el=>el.id===id);
    this.list.splice(index,1);

  }

  updateCount(id, newCount) {
      this.list.find(el => el.id === id).count = newCount;
  }

}
