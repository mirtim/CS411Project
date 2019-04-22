import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import { Router } from "@angular/router";

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.css']
})
export class HeaderbarComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  signInClicked() {
    this.router.navigateByUrl('/login');

  }

  profileClicked() {
    this.router.navigateByUrl('/profile');
  }

  signOutClicked() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
