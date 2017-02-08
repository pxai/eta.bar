import { Component } from '@angular/core';
import { Question } from './question';
import { AppState } from '../app.service';
import { Title } from './title';
import { QuestionService } from './question';
import { CommentService } from '../comment/comment.service';
import { XLarge } from './x-large';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { Store } from '../app.store';
import { StoreHelper } from '../store-helper';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    QuestionService,
    CommentService
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
  public totalVotes = 0;
  public votes = [];
  public votesPercentage = [];

  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title,
              public questionService: QuestionService,
              private commentService: CommentService,
              private store: Store,
              private storeHelper: StoreHelper,
              private oauthService: OAuthService) {
  }

  ngOnInit() {
    this.question = new Question();
    this.totalVotes = 0;
    console.log('hello `Home` component');
    // Without store
    // this.questionService.getLatest().subscribe(data => this.question = data);

    // We get the latests and we just subscribe
    this.questionService.getLatest().subscribe((data: any) =>  {
      console.log('First request: ');
      console.log(data);
      if (data.session != null) {
        this.storeHelper.update('session', data.session);
        console.log('Previous session recovered ');
      } else {
        console.log('No session stablished');
      }
    });

    // subscribe to the store, so other operations just need to subscribe
    this.store.changes //.pluck('question')
      //.map((data: any) => data)
      .subscribe((data: any) =>  {
          console.log('Home comoponent, store changed: ' + data.question._id);
          console.log(data.question);
          this.question = data.question;
      });
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  voteFor(_id: number, answer) {

    console.log('You voted for ' + _id+ ', answer: ' + answer.id);
    this.questionService.getResult(_id, answer.id).subscribe(data => {
      //this.question = data.question;
      console.log(data);
      this.storeHelper.update('votes', data);
      this.format= 'voted';
      this.votes = [];
      for (var i = 0; i < this.question.answers.length;i++) {
        this.votes[i] = 0;
        this.votesPercentage[i] = 0;
      }

      for (var i = 0; i < data.length;i++) {
        this.votes[data[i]._id.answerid] = data[i].count;
        this.totalVotes = this.totalVotes + data[i].count;
      }

      for (var i = 0; i < this.question.answers.length;i++) {
        this.votesPercentage[i] = Math.round((this.votes[i] * 100) / this.totalVotes);
      }
      console.log(this.votes);
      console.log(this.votesPercentage);
    });
  }



}
