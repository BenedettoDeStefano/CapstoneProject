import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';
import { Router } from '@angular/router';
import { SaveService } from 'src/app/Service/save.service';
import { Location } from 'src/app/Models/event';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent implements OnInit {

  locations: string[] = [];

  constructor(private eventService: EventService, private router: Router, private saveService: SaveService) { }

  ngOnInit(): void {
    const savedLocation = this.saveService.getSelectedLocation();
    if (savedLocation) {
      this.router.navigate(['/home'], { queryParams: { location: savedLocation } });
    } else {
      this.fetchLocations();
    }
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

  onLocationCardClick(location: string): void {
    const selectedLocation: Location = Location[location as keyof typeof Location];
    this.saveService.setSelectedLocation(selectedLocation);
    this.router.navigate(['/home'], { queryParams: { location } });
}
}

