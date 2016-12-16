import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { StoreHelper } from '../store-helper';

@Injectable()
export class CommentService {
  value = 'Angular 2';

  //private questionGetUrl : string = '/assets/question.json';
  private commentsGetUrl : string = '/api/v1/comments/last/';
  private commentCreateUrl : string = '/api/v1/comments/create';

  constructor(private http: Http, storeHelper: StoreHelper) {

  }

  public getLatest(id: string) {
    console.log('Title#getData(): Get Latest from back-end');
     return this.http.get(this.commentsGetUrl+id)
                               .map(res => res.json());
  }

  public createComment (questionid: number, text: string) {
    console.log('Sending comment: ' + text + ' to: ' + this.commentCreateUrl);
    // var headers = new Headers();
    // headers.append('Content-type','application/json');
    return this.http.post(this.commentCreateUrl, {questionid: questionid, text: text})
      .map(res => res.json());

  }

}
