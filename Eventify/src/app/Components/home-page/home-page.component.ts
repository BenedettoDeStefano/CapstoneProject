import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';
import { SaveService } from 'src/app/Service/save.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  events: any[] = [];
  fetchedEvents?: { content: any[] };
  selectedEventId: string = "";
  selectedEventImageURL: string = "";
  filterTitle: string = '';
  startDate: string = '';
  endDate: string = '';
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private eventService: EventService, private saveService: SaveService) {}

  ngOnInit(): void {
    this.loadEvents();
}

loadEvents(page: number = 0): void {
  const selectedLocation = this.saveService.getSelectedLocation();
  if (selectedLocation) {
      const pageable = { page: page, size: 12 };
      this.eventService.getEventsByLocation(selectedLocation, pageable).subscribe((fetchedEvents: any) => {
          this.fetchedEvents = fetchedEvents;
          this.events = fetchedEvents.content;
          this.totalPages = fetchedEvents.totalPages;
          this.currentPage = page;
      });
  }
}

filterEvents(): void {
  if (this.filterTitle) {
      this.eventService.getEventsByTitle(this.filterTitle).subscribe((fetchedEvents: any) => {
          this.events = fetchedEvents;});
  } else if (this.startDate && this.endDate) {
      let adjustedStartDate = `${this.startDate}T00:00:00`;
      let adjustedEndDate = `${this.endDate}T23:59:59`;
      this.eventService.getEventsByDateRange(adjustedStartDate, adjustedEndDate).subscribe((fetchedEvents: any) => {
          this.events = fetchedEvents;});
  } else {
      this.loadEvents();
  }
}

openShareModal(eventId: string, imageURL: string): void {
  this.selectedEventId = eventId;
  this.selectedEventImageURL = imageURL;
}

nextPage(): void {
  if (this.currentPage < this.totalPages - 1) {
      this.loadEvents(this.currentPage + 1);
  }
}

prevPage(): void {
  if (this.currentPage > 0) {
      this.loadEvents(this.currentPage - 1);
  }
}
}
