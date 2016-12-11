/**
 * Created by PELLO_ALTADILL on 04/12/2016.
 */
import { Injectable } from '@angular/core';
import { Store } from './app.store';

// Use this Store from services,
// this is like a Proxy for our state Store
@Injectable()
export class StoreHelper {
  constructor(private store: Store) {}

  update(prop, state) {
    const currentState = this.store.getState();
    console.log('In Store Helper');
    console.log(state);
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }

  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];

    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.id !== state.id) {
        return item;
      }
      return Object.assign({}, item, state)
    })}))
  }

  findAndDelete(prop, id) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item.id !== id)}));
  }
}
