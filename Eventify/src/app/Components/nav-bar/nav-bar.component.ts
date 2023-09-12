import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { SaveService } from 'src/app/Service/save.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private saveService: SaveService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isLoggedInAndLocationSelected(): boolean {
    return this.authService.isLoggedIn() && !!this.saveService.getSelectedLocation();
  }
}
