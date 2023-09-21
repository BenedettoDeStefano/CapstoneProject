import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Service/user.service';
import { Review } from 'src/app/Models/review';
import { ReviewService } from 'src/app/Service/review.service';
import { Event } from 'src/app/Models/event';
import { EventService } from 'src/app/Service/event.service';
import { Location } from 'src/app/Models/event';
import { Category } from 'src/app/Models/event';
import { Reservation } from 'src/app/Models/reservation';
import { ReservationService } from 'src/app/Service/reservation.service';
import { Notification } from 'src/app/Models/notification';
import { NotificationService } from 'src/app/Service/notification.service';

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

  reservations: Reservation[] = [];
  notifications: Notification[] = [];
  newNotification: Partial<Notification> = {};

  showAdmin: boolean = false;

  constructor(private userService:UserService, private reviewService: ReviewService, private eventService: EventService, private reservationService: ReservationService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadEvents();
    this.loadNotifications();
    if (this.userService.getRole() === 'ADMIN') {
      this.showAdmin = true;
    } else {
      this.showAdmin = false;
    }
  }

  changeSection(section: string): void {
    this.currentSection = section;
}






//Sezione "Utenti"

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









//Sezione "Recensioni"

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
  this.loadReservationsForEvent(eventId);
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






//Sezione "Eventi"

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







//Sezione "Notificv"

//Carica notifiche
loadNotifications(): void {
  this.notificationService.getAllNotifications().subscribe(notifications => {
    this.notifications = notifications;
  });
}

//Crea Notifica
createNotification(): void {
  const currentDate = new Date();
  this.newNotification.date = currentDate;
  this.notificationService.createGlobalNotification(this.newNotification as Notification).subscribe((createdNotification) => {
    this.notifications.push(createdNotification);
    this.newNotification = {};
  });
}

formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Intl.DateTimeFormat('it-IT', options).format(date);
}

//Elimina Notifica
deleteNotification(id: string): void {
  this.notificationService.deleteNotification(id).subscribe(() => {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  });
}


//

//Scegli
onEventChangeForReservations(domEvent: any): void {
  const target = domEvent.target as HTMLSelectElement;
  const eventId = target.value;
  this.loadReservationsForEvent(eventId);
}

//Carica Prenotazioni
loadReservationsForEvent(eventId: string): void {
  this.reservationService.getReservationsByEvent(eventId).subscribe(reservations => {
    this.reservations = reservations;
  });
}

//Elimina prenotazioni
deleteReservation(reservationId: string): void {
  this.reservationService.deleteReservation(reservationId).subscribe(() => {
    this.reservations = this.reservations.filter(reservation => reservation.id !== reservationId);
  });
}

}
