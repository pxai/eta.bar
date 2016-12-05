import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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

  constructor(public route: ActivatedRoute) {
    console.log(this);
  }

  // Angular hook that allows for interaction with elements inserted by the
  // rendering of a view.
  ngAfterViewInit() {
    // Converts the Google login button stub to an actual button.
   gapi.signin2.render(
      this.googleLoginButtonId,
      {
        "onSuccess": this.onGoogleLoginSuccess,
        "scope": "profile",
        "theme": "dark"
      });
  }

  // Triggered after a user successfully logs in using the Google external
  // login provider.
  onGoogleLoginSuccess(loggedInUser) {
    this.userAuthToken = loggedInUser.getAuthResponse().id_token;
    this.userDisplayName = loggedInUser.getBasicProfile().getName();
    console.log(this);
  }
}
