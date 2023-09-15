import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Service/reservation.service';
import { Reservation } from 'src/app/Models/reservation';

@Component({
  selector: 'app-reservation-tab',
  templateUrl: './reservation-tab.component.html',
  styleUrls: ['./reservation-tab.component.scss']
})
export class ReservationTabComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadUserReservations();
  }
  loadUserReservations(): void {
    this.reservationService.getUserReservations().subscribe(res => {
      console.log(res);
      this.reservations = res;
    });
  }

  confirm(reservationId: string): void {
    this.reservationService.confirmReservation(reservationId).subscribe(() => {
      window.alert('Prenotazione confermata!');
      this.loadUserReservations();
    });
  }

  delete(reservationId: string): void {
    this.reservationService.deleteReservation(reservationId).subscribe(() => {
      window.alert('Prenotazione eliminata.');
      this.loadUserReservations();
    });
  }

}
