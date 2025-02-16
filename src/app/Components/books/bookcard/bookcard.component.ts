import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { AuthService } from '../../../Services/auth.service'; // Import AuthService
import { environment } from '../../../../environments/environement'; // Import your environment
import { BookService } from '../../../Services/book.service';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css']
})
export class BookCardComponent {
  @Input() book: any;
  @Output() bookChanged = new EventEmitter<string>();  

  constructor(
    private router: Router,
    private http: HttpClient, 
    public authService: AuthService ,
    private bookService: BookService
  ) {}

  checkBook(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }

  changeBookAvailability(isbn: string): void {
    if (this.authService.isManager()) {  // Check if the user is a manager
      const url = `${environment.apiBaseUrl}/book/${isbn}/availability`;
      console.log(url);

      // Optimistic update: Assume success and immediately hide the book
      const previousAvailability = this.book.available;
      this.book.available = true;  // Assume the book will be available after the API call

      // Remove the book from the UI list optimistically
      this.bookChanged.emit(isbn);

      // Make the HTTP request to change the availability
      this.http.patch(url, {}).subscribe({
        next: (response) => {
          console.log('Book availability changed:', response);
        },
        error: (err) => {
          // Rollback if the API call fails
          console.error('Error changing book availability:', err);
          this.book.available = previousAvailability;  // Restore previous availability
          // Optionally show an error message to the user
        }
      });
    } else {
      console.error('Only managers can change book availability');
    }
  }
}