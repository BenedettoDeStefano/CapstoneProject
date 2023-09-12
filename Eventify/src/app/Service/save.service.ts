import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../Models/event';


@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private selectedLocationSubject: BehaviorSubject<Location | null> = new BehaviorSubject<Location | null>(null);
  public selectedLocation$: Observable<Location | null> = this.selectedLocationSubject.asObservable();

  constructor() { }

  setSelectedLocation(location: Location): void {
    this.selectedLocationSubject.next(location);
  }

  getSelectedLocation(): Location | null {
    return this.selectedLocationSubject.value;
  }
}
