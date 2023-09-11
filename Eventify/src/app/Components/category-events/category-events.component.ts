import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';
import { Category } from 'src/app/Models/event';

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
      let categoryEnum: Category = Category[this.category as keyof typeof Category];
      this.eventService.getEventsByCategoryOrderByDateDesc(categoryEnum).subscribe(events => {
        this.events = events;
      });
    });
  }



}
