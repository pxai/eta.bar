// this lets us to set a default state
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

// define how our states how to look for our app.
export interface Answer {
  _id: number | string
  answer: string
}

export interface Comment {
  _id: number | string
  text: string
  commentDate: Date
  parentid: number | string
  userid: number | string
}

export interface Question {
  _id: number | string
  question: string
  answers: Answer[]
}

// This is an interface of how our state will look like
export interface State {
  question: Question
  votes
  comments
  firstComment
  session: {}
}

// This is  the state that application is gonna start with
// The : State gives some type safety
const defaultState: State = {
  question : {_id: 0, question: "", answers: []},
  votes: [],
  comments: [],
  firstComment: '',
  session: null
}

// This is the actual store
const _store = new BehaviorSubject<State>(defaultState);

// This is a service to interact with the store!!
@Injectable()
export class Store {
  private store = _store;
  // We subscribe the components to this

  // this will ensure that all states changes are immutable
  // we can reasen about date easier and add optimizations
  changes = this.store.asObservable().distinctUntilChanged()

  setState(state: State) {
    this.store.next(state);
  }

  getState(): State {
    return this.store.value;
  }


  purge() {
    this.store.next(defaultState);
  }
}
