import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';


// Google's login API namespace
declare var gapi:any;

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  googleLoginButtonId = "google-login-button";
  userAuthToken = null;
  userDisplayName = "empty";
  localState: any;

  constructor(public route: ActivatedRoute, private oauthService: OAuthService) {

    this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth"; //Id-Provider?
    this.oauthService.redirectUri = window.location.origin + "/index.html";
    this.oauthService.clientId = " 615208896962-m7ete2bdf60trg5a90ar1daus4ebl014.apps.googleusercontent.com";
    this.oauthService.scope = "openid profile email";
    this.oauthService.issuer = "https://accounts.google.com";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);

    this.oauthService.tryLogin({});
    console.log(this);
  }

  get userName() {
    var claims = this.oauthService.getIdentityClaims();

    if (!claims) return "claim false";
    console.debug(this.oauthService.getIdentityClaims());
    console.log("Given name: " + claims.userName + ","  + claims.given_name);
    console.log(this.oauthService.getAccessToken());
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
