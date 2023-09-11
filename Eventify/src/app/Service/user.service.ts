import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUserById(id: string, userPayload: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, userPayload);
  }

  deleteUserById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/by-email/${email}`);
  }

  getCurrentUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/current`);
  }
}
