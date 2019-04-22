import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: SocialUser;

  enteredOrigin: string;
  enteredDestination: string;
  enteredTripName: string;

  tripOptions = [];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  createNewTrip() {
    console.log('Clicked');
    this.http.get('http://127.0.0.1:3000/api/yelp/' + this.enteredOrigin + "/" + this.enteredDestination).subscribe(result => {
      this.tripOptions = result;
      console.log(result);
      // const trip = {
      //   tripname: this.enteredTripName,
      //   origin: this.enteredOrigin,
      //   destination: this.enteredDestination,
      //   waypoints: [],
      //   userid: this.user.id
      // };
      //
      // console.log(trip);
      //
      // this.http.post('http://127.0.0.1:3000/api/trips', trip).subscribe(result => {
      //   console.log(result);
      // });
    });
  }
}
