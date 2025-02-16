import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { AuthService } from '../../../Services/auth.service'; // Import AuthService
import { environment } from '../../../../environments/environement'; // Import your environment
import { BookService } from '../../../Services/book.service'; // Import BookService

@Component({
  selector: 'app-bookcard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bookcard.component.html',
  styleUrls: ['./bookcard.component.css']
})
export class BookCardComponent {
  @Input() book: any;
  @Output() bookStatusChanged = new EventEmitter<any>();  // Output event to notify parent

  constructor(
    private router: Router,
    private http: HttpClient, 
    public authService: AuthService,
    private bookService: BookService // Inject BookService
  ) {}

  checkBook(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }

  changeBookAvailability(isbn: string): void {
    if (this.authService.isManager()) {  // Check if the user is a manager
      // Optimistic UI update: Remove the book from the list immediately
      this.removeBookOptimistically(isbn);

      // Now make the API call
      const url = `${environment.apiBaseUrl}/book/${isbn}/availability`;
      this.http.patch(url, {}).subscribe({
        next: (response) => {
          console.log('Book availability changed:', response);
          this.book.available = true;  // Update the book's availability status locally
          this.bookStatusChanged.emit(isbn);  // Emit event to parent to notify that the book availability changed
        },
        error: (err) => {
          console.error('Error changing book availability:', err);
          // If the request fails, restore the book in the list
          this.restoreBook(isbn);
        }
      });
    } else {
      console.error('Only managers can change book availability');
    }
  }

  // Optimistically remove the book from filteredBooks
  private removeBookOptimistically(isbn: string): void {
    // Emit the removal of the book to the parent component
    this.bookStatusChanged.emit(isbn);
  }

  // Restore the book if the update failed
  private restoreBook(isbn: string): void {
    this.bookService.getBookByIsbn(isbn).subscribe((restoredBook) => {
      this.bookStatusChanged.emit(isbn);
    });
  }
}
