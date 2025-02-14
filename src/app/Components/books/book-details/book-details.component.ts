import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../Services/book.service';
import { BookCardComponent } from "../bookcard/bookcard.component";
import { CommonModule, NgIf } from '@angular/common';
import { Book } from '../../../Models/book';
import { SearchAndFilterComponent } from "../search-and-filter/search-and-filter.component";
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [BookCardComponent, CommonModule, SearchAndFilterComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit(): void {
    // Check if the user is logged in and fetch books accordingly
    this.authService.fetchUserInfo();  // Ensure the user info is fetched (to check for logged-in status)

    if (this.authService.hasToken()) {
      // If the user is logged in, fetch books for client (available/unavailable books)
      this.bookService.getClientBooks().subscribe({
        next: (data) => {
          this.books = data;
          this.filteredBooks = data;  
        },
        error: (err) => console.error('Error fetching client books:', err)
      });
    } else {
      // If the user is not logged in, fetch regular books
      this.bookService.getBooks().subscribe({
        next: (data) => {
          this.books = data;
          this.filteredBooks = data;  
        },
        error: (err) => console.error('Error fetching books:', err)
      });
    }
  }

  // Apply filters to the books list
  applyFilters(filters: { category: string; price: string }) {
    console.log('Applying filters:', filters);
  
    this.filteredBooks = this.books.filter(book => {
      return (
        (filters.category === '' || book.category === filters.category) &&
        (filters.price === '' || this.matchPriceRange(book.price, filters.price))
      );
    });
  }

  private matchPriceRange(bookPrice: number, selectedRange: string): boolean {
    const [min, max] = selectedRange.split('-').map(val => (val === '+' ? Infinity : Number(val)));
    return bookPrice >= min && bookPrice <= max;
  }
}
