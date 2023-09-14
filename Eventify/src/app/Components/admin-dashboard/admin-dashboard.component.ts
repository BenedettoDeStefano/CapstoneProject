import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Service/user.service';
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Service/event.service';
import { Location } from 'src/app/Models/event';
import { Category } from 'src/app/Models/event';

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

  newEvent: Partial<Event> = {};
  selectedEvent: Event | null = null;
  Location = Location;
  Category = Category;
  newEventTime: string | null = null;

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






//   *******************Sezione Eventi*****************
// Crea un nuovo evento
createEvent(): void {
  this.newEvent.date = `${this.newEvent.date}T${this.newEventTime}:00`;
  this.eventService.createEvent(this.newEvent as Event).subscribe((createdEvent) => {
    this.events.push(createdEvent);
    this.newEvent = {};
  });
}

// Seleziona un evento per la visualizzazione o la modifica
selectEvent(id: string): void {
  this.eventService.getEventById(id).subscribe((event) => {
    this.selectedEvent = event;
  });
}

// Aggiorna un evento esistente
updateEvent(): void {
  if (!this.selectedEvent) return;
  this.selectedEvent.date = `${this.selectedEvent.date.split('T')[0]}T${this.newEventTime || this.selectedEvent.date.split('T')[1]}:00`;
  this.eventService.updateEvent(this.selectedEvent.id, this.selectedEvent).subscribe(() => {
      this.loadEvents();
  });
}

// Elimina un evento
deleteEvent(id: string): void {
  this.eventService.deleteEvent(id).subscribe(
    () => {
      this.loadEvents();
    },
    (error) => {
      if (error.status === 403) {
        alert('Non è possibile eliminare questo evento poiché ci sono prenotazioni associate.');
      } else {
        console.log('Si è verificato un errore durante l\'eliminazione dell\'evento.');
      }
    }
  );
}
//   *******************Sezione Eventi*****************

}
