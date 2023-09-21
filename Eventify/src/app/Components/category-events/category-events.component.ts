import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';
import { Category } from 'src/app/Models/event';
import { SaveService } from 'src/app/Service/save.service';
import { Event } from 'src/app/Models/event';

@Component({
  selector: 'app-category-events',
  templateUrl: './category-events.component.html',
  styleUrls: ['./category-events.component.scss']
})
export class CategoryEventsComponent implements OnInit {

  events: Event[] = [];
  category: string = '';
  selectedEventId: string = "";
  selectedEventImageURL: string = "";

  constructor( private route: ActivatedRoute,private eventService: EventService,
    private saveService: SaveService) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.category = params['category'];
        let categoryEnum: Category = Category[this.category as keyof typeof Category];
        const selectedLocation = this.saveService.getSelectedLocation();
        if (selectedLocation) {
          this.eventService.getEventsByLocationAndCategory(
            selectedLocation.toString(),
            categoryEnum.toString()
          ).subscribe(events => {
            this.events = events;
          });
        }
      });
    }

    openShareModal(eventId: string, imageURL: string): void {
      this.selectedEventId = eventId;
      this.selectedEventImageURL = imageURL;
    }
}
