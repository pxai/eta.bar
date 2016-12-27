/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { AppState } from './app.service';
import { Store } from './app.store';
import { StoreHelper } from './store-helper';
import { AuthService } from './auth/auth.service';

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
    public store: Store,
    public route: ActivatedRoute,
    private oauthService: OAuthService,
    private authService: AuthService) {

  this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?
  this.oauthService.redirectUri = window.location.origin + "";
  this.oauthService.clientId = "615208896962-m7ete2bdf60trg5a90ar1daus4ebl014.apps.googleusercontent.com";
  this.oauthService.scope = "openid profile email";
  this.oauthService.issuer = "https://accounts.google.com";
  this.oauthService.oidc = true;
  this.oauthService.setStorage(sessionStorage);

  // https://console.developers.google.com/apis/credentials/oauthclient/clientId?project=clientId.projectnumb
  this.oauthService.tryLogin({
  onTokenReceived: context => {
  //
  // Output just for purpose of demonstration
  // Don't try this at home ... ;-)
  //
  console.log("logged in: " + context.accessToken);
    this.authService.signInUser(context).subscribe( data => {
     console.log('Finaly: ' + data);
     });
  console.log(context);
}});
console.log(this);

  }

  ngOnInit() {
   // console.log('Initial App State', this.appState.state);
    console.log('Initial App Store State', this.store.getState());
  }

  get userName() {
    var claims = this.oauthService.getIdentityClaims();

    if (!claims) return "";
    this.storeHelper.update('session', claims);
    console.log("Given name: " + claims.given_name + ","  + claims.picture);


    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdentityClaims());

    return claims.given_name;
  }

  login() {
    console.log(this.userName);
    console.log("Given name: " + this.userName + ", ok");
    this.oauthService.initImplicitFlow();
  }

  logout() {
    console.log('Log out');
    this.oauthService.logOut();
    this.store.purge();
  }
}

