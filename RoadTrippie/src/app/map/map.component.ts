import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public origin = "Boston, MA";
  public destination = "Palo Alto, CA";
  public waypoints = [{location: "New York, NY", stopover: true}];

  constructor() { }

  ngOnInit() {
  }
}
