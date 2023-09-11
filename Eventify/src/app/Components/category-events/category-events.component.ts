import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-category-events',
  templateUrl: './category-events.component.html',
  styleUrls: ['./category-events.component.scss']
})
export class CategoryEventsComponent implements OnInit {

  events: any[] = [];
  category: string = '';

  constructor( private route: ActivatedRoute,private eventService: EventService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.eventService.getEventsByCategoryOrderByDateDesc(this.category).subscribe(events => {
        this.events = events;
      });
    });
  }



}
