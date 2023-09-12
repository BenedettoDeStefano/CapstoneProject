import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';
import { SaveService } from 'src/app/Service/save.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  events: any[] = [];
  fetchedEvents?: { content: any[] };

  constructor(private route: ActivatedRoute, private eventService: EventService, private saveService: SaveService) {}

  ngOnInit(): void {
    const selectedLocation = this.saveService.getSelectedLocation();

    if (selectedLocation) {
      const pageable = { page: 0, size: 10 };

      this.eventService.getEventsByLocation(selectedLocation, pageable).subscribe((fetchedEvents: any) => {
        this.fetchedEvents = fetchedEvents;
        this.events = fetchedEvents.content;
      });
    }
  }}
