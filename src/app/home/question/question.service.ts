import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { StoreHelper } from '../store-helper';

@Injectable()
export class QuestionService {
  value = 'Angular 2';
  private mockQuestions = [{
    "_id": 1,
    "question": "What is the meaning of life",
    "type": "normal",
    "answers" : [
      {"_id": 1, "answer": "Nothing at all", "votes": 31},
      {"_id": 2, "answer":"42", "votes": 3},
      {"_id": 3, "answer":"Live and let live", "votes": 11},
      {"_id": 4, "answer":"Run for your life", "votes": 16}
    ]
  }];

  private questionGetUrl : string = '/api/v1/question/last';
  private resultGetUrl : string = '/api/v1/question/vote';
  constructor(private http: Http,  private storeHelper: StoreHelper) {

  }

  public getLatest() {
    console.log('Title#getData(): Get Latest from back-end');
    // this.question = new Question('What is the meaning of life',['Nothing at all','42','Live and let live','Run for your life']);

     /*return this.http.get(this.questionGetUrl)
                               .map(res => res.json());
*/

    //return this.mockQuestions[0].map(res => res.json());

    /*return {
      question: 'AngularClass',
      answers : ['Nothing at all','42','Live and let live','Run for your life']
    };*/
  }

  public getResult(_id: number, _idAnswer: number) {
    console.log('Title#getData(): Get Latest from back-end');
    //var headers = new Headers();
    //headers.append('Content-type','application/json');
    return this.http.post(this.resultGetUrl,JSON.stringify({_id: _id, _idAnswer: _idAnswer}))
      .map(res => res.json());

  }

}
