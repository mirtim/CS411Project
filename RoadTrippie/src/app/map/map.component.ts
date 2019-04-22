import { Component, OnInit } from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public origin = "Boston, MA";
  public destination = "Palo Alto, CA";
  enteredOrigin = this.origin;
  enteredDestination = this.destination;
  public waypoints = []; //[{location: "New York, NY", stopover: true}];
  public tripid: string;

  user: SocialUser;

  public trip;

  constructor(
    private authService: AuthService,
    private router: Router,
    private act: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.act.params.subscribe(params => {
        this.tripid = params.tripid;

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': this.user.id,
          })
        };

        this.http.get('http://127.0.0.1:3000/api/trips/' + this.tripid, httpOptions).subscribe((result) => {
          this.trip = result;
        });
      });
    });
  }

  onChangeLocation() {
    this.origin = this.enteredOrigin;
    this.destination = this.enteredDestination;
  }
}
