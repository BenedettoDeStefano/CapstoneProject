import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service'
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  eventDetails: any;
  reviews: Review[] = [];

  constructor(private route: ActivatedRoute,private eventService: EventService, private reviewService: ReviewService) { }


  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
          const eventId = params.get('id');
          if (eventId) {
              this.eventService.getEventById(eventId).subscribe((details) => {
                  this.eventDetails = details;
              });

              this.reviewService.getReviewsByEventId(eventId).subscribe((reviewsList) => {
                  this.reviews = reviewsList;
              });
          }
      });
  }

}
