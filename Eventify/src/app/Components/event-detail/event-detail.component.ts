import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service'
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';
import { ReservationService } from 'src/app/Service/reservation.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  eventDetails: any;
  reviews:  Review[] = [];
  currentUser: any;
  constructor(private route: ActivatedRoute,private eventService: EventService, private reviewService: ReviewService, private reservationService:ReservationService, private userService: UserService) { }


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
              this.userService.getCurrentUserInfo().subscribe(user => {
                this.currentUser = user;
            });
          }
      });
  }

  reserve(): void {
    if (!this.currentUser) {
      console.error('User is not logged in!');
      return;
    }
    const payload = {
      userId: this.currentUser.id,
      eventId: this.eventDetails.id
    };
    this.reservationService.reserveTicket(payload).subscribe(response => {
      console.log('Reservation confirmed:', response);
    }, error => {
      console.error('Error occurred:', error);
    });
  }

}
