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
      this.reservations = res;
    });
  }
}
