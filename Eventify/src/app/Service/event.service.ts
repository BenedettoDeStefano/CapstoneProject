import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = 'http://localhost:3001/events';

  constructor(private http: HttpClient) { }

  // Ottieni le location disponibili
  getAvailableLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/locations`);
  }
}
