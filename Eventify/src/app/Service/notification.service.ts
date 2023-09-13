import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../Models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:3001/notifications';

  constructor(private http: HttpClient) {}

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  // createNotification(notificationPayload: Notification): Observable<Notification> {
  //   return this.http.post<Notification>(`${this.baseUrl}`, notificationPayload);
  // }

  createGlobalNotification(notificationPayload: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/global`, notificationPayload);
  }

  // updateNotification(id: string, notificationPayload: Notification): Observable<Notification> {
  //   return this.http.put<Notification>(`${this.baseUrl}/${id}`, notificationPayload);
  // }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
