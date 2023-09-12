import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../Models/event';


@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private selectedLocationSubject: BehaviorSubject<Location | null>;
  public selectedLocation$: Observable<Location | null>;

  constructor() {
    const savedLocation = localStorage.getItem('selectedLocation');
    const initialLocation: Location | null = savedLocation ? JSON.parse(savedLocation) : null;
    this.selectedLocationSubject = new BehaviorSubject<Location | null>(initialLocation);
    this.selectedLocation$ = this.selectedLocationSubject.asObservable();
  }

  setSelectedLocation(location: Location): void {
    localStorage.setItem('selectedLocation', JSON.stringify(location));
    this.selectedLocationSubject.next(location);
  }

  getSelectedLocation(): Location | null {
    return this.selectedLocationSubject.value;
  }
}
