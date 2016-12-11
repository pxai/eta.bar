import { Component } from '@angular/core';
import { Question } from './question';
import { AppState } from '../app.service';
import { Title } from './title';
import { QuestionService } from './question';
import { XLarge } from './x-large';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    QuestionService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };
  public format: string = "normal";
  public question: Question;

  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title,
              public questionService: QuestionService,
              private oauthService: OAuthService) {
  }

  ngOnInit() {
    this.question = new Question();
    console.log('hello `Home` component');
    this.questionService.getLatest().subscribe(data => this.question = data);
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  voteFor(_id: number, answer) {
    console.log('You voted for ' + _id+ ', answer: ' + answer._id);
    this.questionService.getResult(_id, answer._id).subscribe(data => {this.question = data; this.format= 'voted'});
  }

  get userName() {
    var claims = this.oauthService.getIdentityClaims();

    if (!claims) return "claim false";
    console.log("Given name: " + claims.userName + ","  + claims.given_name);
    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdentityClaims());

    return claims.given_name;
  }

  login() {
    console.log(this.userName);
    console.log("Given name: " + this.userName + ", ok");
    this.oauthService.initImplicitFlow();
  }

  logoff() {
    this.oauthService.logOut();
  }

}
