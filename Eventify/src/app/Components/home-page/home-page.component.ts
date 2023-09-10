import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  events: any[] = [];
  fetchedEvents?: { content: any[] };

  constructor(private route: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const location = params['location'];
      if (location) {
        const pageable = { page: 0, size: 10 };

        this.eventService.getEventsByLocation(location, pageable).subscribe((fetchedEvents: any) => {
          this.fetchedEvents = fetchedEvents;
          this.events = fetchedEvents.content;
        });
      }
    });
  }
}
