import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: SocialUser;

  trips;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': this.user.id,
        })
      };

      this.http.get('http://127.0.0.1:3000/api/trips', httpOptions).subscribe((result) => {
        this.trips = result;
        console.log(this.trips);
      });
    });
  }

  deleteTrip(tripid: string) {
    console.log("Trip Deleted: " + tripid);
    this.http.delete('http://127.0.0.1:3000/api/trips/' + tripid).subscribe(result => {
      this.ngOnInit();
    });
  }

  addNewTrip() {
    this.router.navigateByUrl('/create')
  }

  viewTrip(tripid: string) {
    console.log(tripid);
  }
}
