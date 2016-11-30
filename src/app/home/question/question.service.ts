import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuestionService {
  value = 'Angular 2';
  constructor(public http: Http) {

  }

  public getLatest() {
    console.log('Title#getData(): Get Latest from back-end');
    // this.question = new Question('What is the meaning of life',['Nothing at all','42','Live and let live','Run for your life']);

     return this.http.get('/assets/question.json')
                                .map(res => res.json());
    /*return {
      question: 'AngularClass',
      answers : ['Nothing at all','42','Live and let live','Run for your life']
    };*/
  }

}
