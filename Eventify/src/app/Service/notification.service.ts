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

  createGlobalNotification(notificationPayload: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/global`, notificationPayload);
  }


  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
