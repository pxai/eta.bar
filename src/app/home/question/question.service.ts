import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { StoreHelper } from '../../store-helper';
import 'rxjs/Rx';

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


  //private questionGetUrl : string = '/assets/question.json';
  private questionGetUrl : string = '/api/v1/question/';
  private resultGetUrl : string = '/api/v1/question/vote';
  private resultAnonymousGetUrl : string = '/api/v1/question/anonymous/vote';
  private lastQuestionsGetUrl : string = '/api/v1/question/latest';
  private currentQuestion;
  private lang: string = 'eu';

  constructor(private http: Http, private storeHelper: StoreHelper) {

  }

  public getLatest(q: string ='', lang: string = 'eu') {
    console.log('Title#getData(): Get Latest from back-end ' + lang);

    this.questionGetUrl = '/api/v1/question/' + ((q!='')?'q/'+q:'last' + '/' + lang);
    // We add the method to save question in the store.
    // The operation is immutable for data
     return this.http.get(this.questionGetUrl)
                                .map(res => res.json())
                                .do( (data: any) => {
                                    this.storeHelper.update('question', data.question);
                                    this.storeHelper.update('comments', data.comments);
                                    if (data.comments.length > 0) {
                                      this.storeHelper.update('firstComment', data.comments[0].createdAt);
                                    }
                                    console.log('Get latest: ');
                                    console.log(data.question);
                                });
  }

  public getResult(id: number, answerId: number) {
    console.log('Get result after vote');

    //var headers = new Headers();
    //headers.append('Content-type','application/json');
    return this.http.post(this.resultGetUrl,{questionid: id, answerId: answerId})
      .map(res => res.json());

  }


  public getLatestQuestions(skip: number = 0, lang: string) {
    //var headers = new Headers();
    //headers.append('Content-type','application/json');
    return this.http.get(this.lastQuestionsGetUrl+"/"+skip+"/"+lang)
      .map(res => res.json());

  }
  /*
  * when creating
  * ...post()
  *     .do(savedAnswer => this.storeHelper.add('answers', savedAnswer))
   */

}
