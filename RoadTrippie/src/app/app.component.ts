import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tripData = {origin: "Boston, MA", destination: 'San Diego, CA'};

  onLocationChanged(tripData) {
    this.tripData = {... tripData};
  }
}
