import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  profilePicture: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  register(): void {
    this.authService.register(this.username, this.email, this.password, this.profilePicture).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Errore nella registrazione. Riprova.';
      }
    );
  }

  redirectToSignin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
