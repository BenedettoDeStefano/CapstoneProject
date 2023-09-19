import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service'
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';
import { ReservationService } from 'src/app/Service/reservation.service';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  eventDetails: any;
  reviews:  Review[] = [];
  currentUser: any;
  rating = 0;
  comment = '';
  averageRating: number = 0;

  constructor(private route: ActivatedRoute,private eventService: EventService, private reviewService: ReviewService, private reservationService:ReservationService, private userService: UserService, private router: Router) { }


  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
          const eventId = params.get('id');
          if (eventId) {
              this.eventService.getEventById(eventId).subscribe((details) => {
                  this.eventDetails = details;
              });

              this.reviewService.getReviewsByEventId(eventId).subscribe((reviewsList) => {
                  this.reviews = reviewsList;
                  this.calculateAverageRating(reviewsList);
              });
              this.userService.getCurrentUserInfo().subscribe(user => {
                this.currentUser = user;
            });
          }
      });
  }
//PRENOTAZIONE
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
      window.alert('La tua prenotazione è stata presa in carico, entra nel tab prenotazioni per confermarla.');
      this.router.navigate(['/reservations']);
    }, error => {
      console.error('Error occurred:', error);
    });
  }

//RECENSIONE
submitReview(): void {
  if (!this.currentUser) {
    console.error('L\'utente non è loggato!');
    return;
  }
  const reviewPayload: Review = {
    rating: this.rating,
    comment: this.comment,
    eventId: this.eventDetails.id,
    reviewerId: this.currentUser.id
  };
  this.reviewService.submitReview(reviewPayload).subscribe(response => {
    console.log('Review submitted:', response);
    window.alert('La tua recensione è stata inviata con successo!');
    this.reviews.push(response);
    this.calculateAverageRating(this.reviews);
    this.rating = 0;
    this.comment = '';
  }, error => {
    console.error('Error occurred:', error);
  });
}


calculateAverageRating(reviews: Review[]): void {
  if (!reviews || reviews.length === 0) {
    this.averageRating = 0;
    return;
  }
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = totalRating / reviews.length;
  this.averageRating = parseFloat(average.toFixed(1));
}

setRating(star: number) {
  this.rating = star;
}
}
