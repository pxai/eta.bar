import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { StoreHelper } from '../store-helper';

@Injectable()
export class CommentService {
  value = 'Angular 2';

  //private questionGetUrl : string = '/assets/question.json';
  private commentsGetUrl : string = '/api/v1/comments/last/';
  private commentsPagesGetUrl : string = '/api/v1/comments/pages/';
  private commentCreateUrl : string = '/api/v1/comments/create';

  constructor(private http: Http, private storeHelper: StoreHelper) {

  }

  public getLatest(questionid: any, page: string = '2016-12-18T00:03:46.658Z') {

    console.log('Getting latest comments from backend: ' + questionid);

     return this.http.get(this.commentsGetUrl+questionid+'/'+page)
                               .map(res => res.json())
                               .do( (comments: any) => {
         this.storeHelper.addComments('question', comments);
         console.log('Comments received: ');console.log(comments);
       });
  }


  public createComment (questionid: any, text: string) {
    console.log('Sending comment: ' + text + ' to: ' + this.commentCreateUrl);
    // var headers = new Headers();
    // headers.append('Content-type','application/json');
    return this.http.post(this.commentCreateUrl, {questionid: questionid, text: text})
      .map(res => res.json());

  }

}
