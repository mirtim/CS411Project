import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  signInClicked() {
    console.log("Sign In CLicked");
  }

  signOutClicked() {
    this.authService.signOut();
  }
}
