// this lets us to set a default state
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

// define how our states how to look for our app.
export interface Answer {
  _id: number | string
  answer: string
  votes: number
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
  comments: Comment[]
}

// This is an interface of how our state will look like
export interface State {
  questions: Array<Question>
}

// This is  the state that application is gonna start with
const defaultState: State = {
  questions: []
}

// This is the actual store
const _store = new BehaviorSubject<State>(defaultState);

// This is a service to interact with the store!!
@Injectable()
export class Store {
  private store = _store;
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
