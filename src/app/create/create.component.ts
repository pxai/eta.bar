import { Component } from '@angular/core';
import { AppState } from '../app.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */


@Component({
  selector: 'create',
  templateUrl: 'create.component.html'
    /*`
    <h1>Create new</h1>
    <router-outlet></router-outlet>
  `*/
})
export class CreateComponent {
  // Set our default values
  localState = { value: '' };

  constructor(public appState: AppState) {

  }

  ngOnInit() {
    console.log('hello `Create` component');
  }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
