import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Book } from '../Models/book';
import { environment } from '../../environments/environement';
import { TokenService } from './token.service';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  // Method to fetch books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBaseUrl}/book/available`).pipe(
    );
  }

  getClientBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBaseUrl}/book`).pipe(

    );
  }

  createBook(bookData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from localStorage (adjust as necessary)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${environment.apiBaseUrl}/book`, bookData, { headers });
  }


  getUnavailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBaseUrl}/book/unavailable`);
  }

  getReviewsByIsbn(isbn: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiBaseUrl}/review/${isbn}`).pipe(
      
    );
  }

  getBookByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBaseUrl}/book/${isbn}`).pipe(

    );
  }

  addReview(review: { isbn: string; review: string }) {
    return this.http.post(`${environment.apiBaseUrl}/review`, review);
  }
}

