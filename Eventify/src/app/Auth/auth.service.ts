import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>('http://localhost:3001/auth/login', credentials)
      .pipe(map(response => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
        }
        return response;
      }));
  }

  register(username:String, email: string, password: string, profilePicture: string): Observable<any> {
      const newUser = { username, email, password, profilePicture};
    return this.http.post<any>('http://localhost:3001/auth/register', newUser);
  }
  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('selectedLocation');
    alert("Log out effettuato")
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
