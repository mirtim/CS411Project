import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onChangeLocation() {
    this.origin = this.enteredOrigin;
    this.destination = this.enteredDestination;
  }
}
