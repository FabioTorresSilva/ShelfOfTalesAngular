import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { Book } from '../Models/book';
import { environment } from '../../environments/environement';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class BookService {
constructor(private http: HttpClient, private tokenService: TokenService) { }
  // Method to fetch books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBaseUrl}/book/available`).pipe(
      catchError(error => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error('Failed to fetch books. Please try again later.'));
      })
    );
  }

  getClientBooks(): Observable<Book[]> {
    const token = this.tokenService.getToken('user_token');  // Get token from token service
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Add the token to request headers
    });

    return this.http.get<Book[]>(`${environment.apiBaseUrl}/book`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching client books:', error);
        return throwError(() => new Error('Failed to fetch client books. Please try again later.'));
      })
    );
  }
}

