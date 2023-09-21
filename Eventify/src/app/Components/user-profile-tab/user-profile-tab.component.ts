import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { EventService } from 'src/app/Service/event.service';
import { SaveService } from 'src/app/Service/save.service';
import { Router } from '@angular/router';
import { Location } from 'src/app/Models/event';

@Component({
  selector: 'app-user-profile-tab',
  templateUrl: './user-profile-tab.component.html',
  styleUrls: ['./user-profile-tab.component.scss']
})
export class UserProfileTabComponent implements OnInit {

  locations: string[] = [];

  currentUserInfo!: { username: string, email: string, profilePicture:string};

  constructor(private userService: UserService, private saveService:SaveService, private eventService:EventService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUserInfo = userInfo;
      console.log(this.currentUserInfo);
    });
    this.fetchLocations();
  }

  fetchLocations(): void {
    this.eventService.getAvailableLocations().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  onLocationSelect(event: any): void {
    const selectedLocationName = event.target.value;
    const selectedLocation: Location = Location[selectedLocationName as keyof typeof Location];
    console.log('Selected Location:', selectedLocationName);
    this.saveService.setSelectedLocation(selectedLocation);
    this.router.navigate(['/home'], { queryParams: { location: selectedLocationName } });
  }
}
