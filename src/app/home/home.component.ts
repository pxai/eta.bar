import { Component } from '@angular/core';
import { Question } from './question';
import { AppState } from '../app.service';
import { Title } from './title';
import { QuestionService } from './question';
import { XLarge } from './x-large';

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
  public question: Question;
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public questionService: QuestionService) {

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

  voteFor(answer) {
    console.log('You voted for ' + answer._id);
  }
}
