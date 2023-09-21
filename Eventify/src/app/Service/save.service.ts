import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../Models/event';


@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() {
  }

  setSelectedLocation(location: Location): void {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
}

getSelectedLocation(): Location | null {
  const savedLocation = localStorage.getItem('selectedLocation');
  return savedLocation ? JSON.parse(savedLocation) : null;
}
}
