import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StoreHelper } from '../store-helper';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private validateUrl : string = '/validate';
  private logoutUrl : string = '/logout';

  constructor(private http: Http, private storeHelper: StoreHelper) {

  }

  public signInUser (authData: any) {
    return this.http.post(this.validateUrl, authData)
      .map(res => res.json() );
      /*.do( (question: any) => {
        this.storeHelper.update('question', question);
        console.log('Service: ');console.log(question);
      });*/
  }

  public signOutUser () {
    return this.http.get(this.logoutUrl)
      .map(res => res.json() );
    /*.do( (question: any) => {
     this.storeHelper.update('question', question);
     console.log('Service: ');console.log(question);
     });*/
  }

}
