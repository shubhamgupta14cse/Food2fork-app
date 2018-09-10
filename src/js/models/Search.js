import axios from 'axios';
import {proxy,key} from '../config';

export default class search {

  constructor(query) {
    this.query=query;

  }

  async getResults() {

    try {

      const res= await axios(`${proxy}http://food2fork.com/api/search?key=${key(2)}&q=${this.query}`);
      this.result= res.data.recipes;

    }

    catch(error){
      alert(error);
    }

  }

}
