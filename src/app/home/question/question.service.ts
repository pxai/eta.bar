import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class QuestionService {
  value = 'Angular 2';
  private mockQuestions = [{
    "_id": 1,
    "question": "What is the meaning of life",
    "answers" : [
      {"_id": 1, "answer": "Nothing at all"},
      {"_id": 2, "answer":"42"},
      {"_id": 3, "answer":"Live and let live"},
      {"_id": 4, "answer":"Run for your life"}
    ]
  }];
  private questionGetUrl : string = '/assets/question.json';
  private resultGetUrl : string = '/assets/results.json';
  constructor(public http: Http) {

  }

  public getLatest() {
    console.log('Title#getData(): Get Latest from back-end');
    // this.question = new Question('What is the meaning of life',['Nothing at all','42','Live and let live','Run for your life']);

     return this.http.get(this.questionGetUrl)
                               .map(res => res.json());

    //return this.mockQuestions[0].map(res => res.json());

    /*return {
      question: 'AngularClass',
      answers : ['Nothing at all','42','Live and let live','Run for your life']
    };*/
  }

  public getResult(_id: number, _idAnswer: number) {
    console.log('Title#getData(): Get Latest from back-end');

    return this.http.get(this.resultGetUrl)
      .map(res => res.json());

  }

}
