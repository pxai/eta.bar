/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

//import { AppState } from './app.service';
import { Store } from './app.store';
import { StoreHelper } from './store-helper';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css',
    './theme.scss'
  ],
  templateUrl: 'app.template.html'

})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'eta.bar';
  url = 'https://github.com/pxai/eta.bar';

  isDarkTheme: boolean = false;

  constructor(
   // public appState: AppState,
    public storeHelper: StoreHelper,
    public store: Store) {

  }

  ngOnInit() {
   // console.log('Initial App State', this.appState.state);
    console.log('Initial App Store State', this.store.getState());
  }

}

