import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
}
