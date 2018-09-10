import axios from 'axios';
import { proxy,key } from '../config';


export default class recipe {
    constructor(rid=46956) {
        this.rid =rid;
    }

    async getResults() {
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key(2)}&rId=${this.rid}`);

            this.result = res.data.recipe;
            this.ingredients=res.data.recipe.ingredients;
            console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }


    clacServings(){
      this.servings=4

    }

    calcTime(){
      //assuming that 15mins per 3 ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 3);
      this.time = periods * 15;



    }


    parseIngredient() {
      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
      const units = [...unitsShort, 'kg', 'g'];

      //1. UNPFORM UNITS
      const newingredients = this.ingredients.map(el=>{
        let ingredient=el.toLowerCase();

        unitsLong.forEach((unit,index)=>{
          ingredient=ingredient.replace(unit,unitsShort[index]);
        });

      //2. REMOVE BRACKETS EXTRA INFORMATION
        ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');


      //3. PARSE THE STRING INTO COUNT,UNIT AND INGREDIENTS
      let ingarr=ingredient.split(' ');
      const unitindex=ingarr.findIndex(word=>units.includes(word));
      console.log(unitindex);
      let ingredientobj;
      const arrcount =ingarr.slice(0,unitindex);

      //count, unit and ingredients all present
      if(unitindex >-1){
        let count;
        if(arrcount.length===1){
          count=eval(ingarr[0].replace('-', '+'));
          count=parseFloat(count.toFixed(2));
        }
        else {
          count=eval(ingarr.slice(0, unitindex).join('+'));
          count=parseFloat(count.toFixed(2));
        }
        ingredientobj={
          count,
          unit:ingarr[unitindex],
          ingredient:ingarr.slice(unitindex+1).join(' ')
        };

      }
      //count, ingredients but not unit
      else if(parseInt(ingarr[0], 10)){
        ingredientobj={
        count:parseInt(ingarr[0], 10),
        unit:'',
        ingredient:ingarr.slice(1).join(' ')
      };

      }

      //only ingredients are present
      else if(unitindex=== -1){
        ingredientobj={
          count:1,
          unit:'',
          ingredient
        };

      }

      return ingredientobj;

    });
    this.ingredients=newingredients;
  }

  updateServings(type) {
    //update servings
    const newServings=type==='dec'?this.servings-1:this.servings+1;
    //update ingredients
    this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
            ing.count=parseFloat(ing.count.toFixed(2));
              });
      this.servings=newServings;
  }
}
