/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';

import { AppState } from './app.service';
import { Store } from './app.store';
import { StoreHelper } from './store-helper';
import { AuthService } from './auth/auth.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

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
  name = 'eta.bar';
  url = 'https://github.com/pxai/eta.bar';
  user = { given_name: '', picture: ''};
  session: any;

  isDarkTheme: boolean = false;

  constructor(
   // public appState: AppState,
    public storeHelper: StoreHelper,
    public store: Store,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private oauthService: OAuthService,
    private authService: AuthService,
   public snackBar: MdSnackBar) {

  this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?
  this.oauthService.redirectUri = window.location.origin + "";
  this.oauthService.clientId = "126838648966-q1ijfjc4bhlc60eqnliebiaq9rluklv1.apps.googleusercontent.com";
  this.oauthService.scope = "openid profile email";
  this.oauthService.issuer = "https://accounts.google.com";
  this.oauthService.oidc = true;
  this.oauthService.setStorage(sessionStorage);

  this.oauthService.tryLogin({
  onTokenReceived: authData => {
    console.log("logged in: " + authData.accessToken);


    this.authService.signInUser(authData).subscribe( data => {
      console.log(data);
      if (data.valid) {
        //this.user = authData.idClaims;
        this.open(authData.idClaims.given_name + ' bezala sartuta');
        this.storeHelper.update('session', authData.idClaims);
      } else {
        console.log('Validation invalid!');
        this.open('Ezin izan da erabiltzailea baieztatu!');
      }


     });

}});
console.log(this);

  }

  ngOnInit() {
   // console.log('Initial App State', this.appState.state);
    console.log('Initial App Store State', this.store.getState());

  }

  get userData() {
    var claims = this.oauthService.getIdentityClaims();

    if (!claims) return "";

    console.log("Given name: " + claims.given_name + ","  + claims.picture + '. Finally: ');
    this.open(claims.given_name + ' bezala sartuta');

    return claims;

  }

  get avatarImg () {
    let image = '<img src="'+this.user.picture +'" align="right" class="avatar" alt="'+this.user.given_name+'\'s Avatar" title="'+this.user.given_name +'\'s Avatar" />';
    console.log(image);
    return image;
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    console.log('Log out');
    this.oauthService.logOut();
    this.storeHelper.update('session',null);
    this.user = { given_name: '', picture: ''};
   this.authService.signOutUser().subscribe( data => {
      console.log('Finally: ' + data);
      this.storeHelper.update('session',null);
      this.open('Adio, egongo gatxik!');
    });
  }

  open(message: string) {
    let config = new MdSnackBarConfig();
    //config.duration = this.autoHide;
    this.snackBar.open(message, '' && '', config);
  }

  create() {
    this.router.navigate(['create']);
  }
}

