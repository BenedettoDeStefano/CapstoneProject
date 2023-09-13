import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:3001/reviews';

  constructor(private httpClient: HttpClient) { }

  getReviewsByEventId(eventId: string): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.baseUrl}/event/${eventId}`);
}

submitReview(reviewPayload: Review): Observable<Review> {
  return this.httpClient.post<Review>(this.baseUrl, reviewPayload);
}

}
