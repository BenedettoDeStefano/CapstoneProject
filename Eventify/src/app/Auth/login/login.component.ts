import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showLoginForm: boolean = false;
  keySequence: string = '';
  isEpiCodeImageVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  redirectToSignup(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/sign-up']);
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.accessToken) {
          this.showLoginForm = false;
          this.router.navigate(['/select-location']);
        }
      },
      error => {
        this.errorMessage = 'Email o password non valide. Riprova.';
      }
    );
  }

  onKeyPressed(event: KeyboardEvent): void {
    this.keySequence += event.key.toUpperCase();
    if (this.keySequence.endsWith('EPIC')) {
      this.isEpiCodeImageVisible = true;
      this.keySequence = '';
    }
  }

  closeOverlay(): void {
    this.isEpiCodeImageVisible = false;
}
}
