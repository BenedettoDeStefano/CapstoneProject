import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Service/user.service';
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  currentSection: string = 'users';

  users: User[] = [];
  selectedUser: User | null = null;

  events: Event[] = [];
  reviewsForSelectedEvent: Review[] = [];
  selectedEventId: string | null = null;

  constructor(private userService:UserService, private reviewService: ReviewService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadEvents();
  }

  changeSection(section: string): void {
    this.currentSection = section;
}






//   *******************Sezione Utenti*****************
// Ottieni tutti gli utenti
loadUsers(): void {
  this.userService.getAllUsers().subscribe(users => {
    this.users = users;
  });
}

// Visualizza i dettagli di un utente
viewUserDetails(id: string): void {
  this.userService.getUserById(id).subscribe(user => {
    this.selectedUser = user;
  });
}

// Elimina un utente
deleteUser(id: string): void {
  this.userService.deleteUserById(id).subscribe(() => {
    this.loadUsers();  // Ricarica la lista degli utenti dopo l'eliminazione
  });
}
//   *******************Sezione Utenti*****************








//   *******************Sezione Recensioni*****************
//carica recensioni
loadEvents(): void {
  this.eventService.getAllEvents().subscribe(events => {
    this.events = events;
  });
}

// Seleziona un evento e carica le sue recensioni
onEventChange(domEvent: any): void {
  const target = domEvent.target as HTMLSelectElement;
  const eventId = target.value;
  this.updateReviewsForEvent(eventId);
}

//AggiornaID recensione
updateReviewsForEvent(eventId: string): void {
  this.selectedEventId = eventId;
  this.reviewService.getReviewsByEventId(eventId).subscribe(reviews => {
    this.reviewsForSelectedEvent = reviews;
  });
}

// Elimina una recensione
deleteReview(reviewId: string): void {
  this.reviewService.deleteReview(reviewId).subscribe(() => {
    if (this.selectedEventId) {
      this.updateReviewsForEvent(this.selectedEventId);
    }
  });
}
//   *******************Sezione Recensioni*****************

}
