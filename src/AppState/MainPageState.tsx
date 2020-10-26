import * as React from 'react';
import { observable, action, computed } from 'mobx';

export interface ResponseItemType {
    name: string
}
export class MainPageState {

    @observable results: Array<ResponseItemType> = [];
    @observable isLoading: boolean = true;
    @observable nums: number = 0;
    @observable searchResults: Array<ResponseItemType> = [];
    @observable isButtonVisible: boolean = true;

    constructor()
    {}

    @computed get searchResultsData() {
        return this.searchResults;
    }

    @action async loadData() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0+&limit=1050`);
            const respJson = await response.json();

            this.results = respJson.results;
            this.searchResults = respJson.results;
            this.isLoading = false;
        }
        catch(err){
            console.log('failed fetch')
        }
    }

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const res = this.results.filter(el => el.name.toLowerCase().match(e.target.value.toLowerCase()));
      this.searchResults = res;
      this.nums = 0;
  }

  @action handleClickNext = () => {
      this.nums = this.nums + 10;
      if( this.nums >= this.searchResults.length - 10 ) {
          this.isButtonVisible = false;
      }
  }

  handleClickPrev = () => {

      this.nums = this.nums > 10 ? this.nums - 10 : 0;
      this.isButtonVisible = true;
  }

  @computed get firstTenElements() {
      return this.searchResults.slice(this.nums, this.nums + 10);
  }


}
