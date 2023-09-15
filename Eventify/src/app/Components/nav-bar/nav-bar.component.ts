import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { SaveService } from 'src/app/Service/save.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isNotificationMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router, private saveService: SaveService, private userService: UserService) { }
  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isLoggedInAndLocationSelected(): boolean {
    return this.authService.isLoggedIn() && !!this.saveService.getSelectedLocation();
  }

  toggleNotificationMenu(): void {
    this.isNotificationMenuOpen = !this.isNotificationMenuOpen;
  }

  get isAdmin(): boolean {
    return this.userService.getRole() === 'ADMIN';
}
}
