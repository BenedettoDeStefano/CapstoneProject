import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Service/notification.service';
import { Notification } from 'src/app/Models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];
  shownNotifications = 3;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Errore nel recupero delle notifiche:', error);
      }
    );
  }

  showMore(event: Event): void {
    event.stopPropagation();
    this.shownNotifications += 3;
  }

  deleteNotification(id: string): void {
  this.notificationService.deleteNotification(id).subscribe(() => {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
  });
}
}
