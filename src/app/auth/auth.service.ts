import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { StoreHelper } from '../store-helper';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private validateUrl : string = '/validate';

  constructor(private http: Http, private storeHelper: StoreHelper) {

  }

  public signInUser (context: any) {
    return this.http.post(this.validateUrl, {data: context})
      .map(res => res.json() );
      /*.do( (question: any) => {
        this.storeHelper.update('question', question);
        console.log('Service: ');console.log(question);
      });*/
  }

}
