import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent implements OnInit {

  locations: string[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.eventService.getAvailableLocations().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }


}
