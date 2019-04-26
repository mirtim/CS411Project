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
  loading: boolean = false;

  user: SocialUser;

  enteredOrigin: string;
  enteredDestination: string;
  enteredTripName: string;

  tripOptions = [];
  tripOptionsNums = [];
  tripOptionsFinal = [];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  testFunc() {
    var wayps = [];

    for (var i = 0; i < this.tripOptionsFinal.length; i ++) {
      var temp = {
        location: {lat: this.tripOptionsFinal[i].coordinates.latitude, lng: this.tripOptionsFinal[i].coordinates.longitude},
        stopover: true
      };
      wayps.push(temp);
    }

    console.log(wayps);

    const trip = {
      tripname: this.enteredTripName,
      origin: this.enteredOrigin,
      destination: this.enteredDestination,
      waypoints: wayps,
      userid: this.user.id
    };

    this.http.post('http://127.0.0.1:3000/api/trips', trip).subscribe(result => {
      console.log(result);
    });

    this.router.navigateByUrl('/profile');
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  createNewTrip() {
    this.loading = true;
    this.http.get<any>('http://127.0.0.1:3000/api/yelp/' + this.enteredOrigin + "/" + this.enteredDestination).subscribe((result) => {
      this.tripOptions = result;
      this.tripOptionsNums = Array(this.tripOptions.length).fill().map((x,i)=>i);
      this.tripOptionsFinal = Array(this.tripOptions.length).fill(-1);

      console.log(this.tripOptionsNums);
      this.loading = false;
    });
  }
}
