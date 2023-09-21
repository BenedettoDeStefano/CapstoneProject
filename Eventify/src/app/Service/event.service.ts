import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../Models/event';
import { Location } from '../Models/event';
import { Category } from '../Models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = 'http://localhost:3001/events';

  constructor(private http: HttpClient) { }

  // Crea un nuovo evento
   createEvent(eventPayload: Event): Observable<Event> {
    return this.http.post<Event>(this.baseURL, eventPayload);
  }

 // Ottieni tutti gli eventi
 getAllEvents(): Observable<Event[]> {
  return this.http.get<Event[]>(this.baseURL);
}

 // Ottieni un evento per ID
 getEventById(id: string): Observable<Event> {
  return this.http.get<Event>(`${this.baseURL}/${id}`);
}

  // Aggiorna un evento per ID
  updateEvent(id: string, eventPayload: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseURL}/${id}`, eventPayload);
  }

 // Elimina un evento per ID
 deleteEvent(id: string): Observable<void> {
  return this.http.delete<void>(`${this.baseURL}/${id}`);
}

  // Ottieni tutti gli eventi per una località specifica
  getEventsByLocation(location: Location, pageable: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}/paginatedByLocation`, {
      params: { ...pageable, location: location.toString() }
    });
  }

  // Ottieni eventi per titolo
  getEventsByTitle(title: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}/byTitle?title=${title}`);
  }

  // Ottieni eventi per intervallo di date
  getEventsByDateRange(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/byDateRange?startDateStr=${startDate}&endDateStr=${endDate}`);
  }

 // Ottieni eventi per categoria ordinati per data decrescente
 getEventsByCategoryOrderByDateDesc(category: Category): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseURL}/byCategoryOrderByDateDesc?category=${category.toString()}`);
}

  // Ottieni eventi paginati per titolo
  getPaginatedEventsByTitle(title: string, pageable: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/paginatedByTitle?title=${title}`, { params: pageable });
  }

  // Ottieni eventi paginati per località e categoria
  getEventsByLocationAndCategory(location: string, category: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}/events/byLocationAndCategory`, {
        params: { location, category }
    });
}

  // Ottieni le location disponibili
  getAvailableLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/locations`);
  }

  // Ottieni le categorie disponibili
  getAvailableCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/categories`);
  }

  // Condivisione social network
  getEventShareInfo(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/share/${eventId}`);
  }

}
