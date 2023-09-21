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

  faqs: { domanda: string, risposta: string }[] = [
    {
      domanda: 'Come posso effettuare l\'accesso al mio account?',
      risposta: 'Puoi accedere al tuo account cliccando su "Accedi" nella barra di navigazione e inserendo le tue credenziali.'
    },
    {
      domanda: 'Dove posso trovare la lista degli eventi disponibili?',
      risposta: 'La lista degli eventi disponibili è disponibile nella sezione "Categorie" del sito'
    },
    {
      domanda: 'Come posso prenotare un posto per un evento?',
      risposta: 'Per prenotare un posto per un evento, vai alla pagina dell\'evento desiderato e clicca su "Prenota" o segui le istruzioni indicate.'
    },
    {
      domanda: 'Posso annullare la mia prenotazione per un evento?',
      risposta: 'Sì, puoi annullare la tua prenotazione seguendo le istruzioni nella tua pagina di prenotazione o contattando il supporto'
    },
    {
      domanda: 'Come posso contattare il supporto in caso di problemi?',
      risposta: 'Puoi contattare il nostro team utilizzando l\'indirizzo mail o contattando il num. 000000000'
    }
  ];
}
