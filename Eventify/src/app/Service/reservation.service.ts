import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:3001/reservations';

  constructor(private httpClient: HttpClient) { }

  reserveTicket(payload: any): Observable<Reservation> {  // The payload can also be typed based on its structure.
    return this.httpClient.post<Reservation>(`${this.baseUrl}/reserve`, payload);
  }

  confirmReservation(reservationId: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/confirm?reservationId=${reservationId}`, null);
  }

  deleteReservation(reservationId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${reservationId}`);
  }

  getUserReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${this.baseUrl}/myReservations`);
}

}
