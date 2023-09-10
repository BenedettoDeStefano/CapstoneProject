import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Service/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss']
})
export class LocationSelectionComponent implements OnInit {

  locations: string[] = [];

  constructor(private eventService: EventService, private router: Router) { }

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
  onLocationSelect(event: any): void {
    const selectedLocation = event.target.value;
    console.log('Selected Location:', selectedLocation);
    this.router.navigate(['/home'], { queryParams: { location: selectedLocation } });
  }


}

