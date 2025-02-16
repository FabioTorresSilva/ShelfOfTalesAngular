import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  updateBookForm: FormGroup;
  book: Book | null = null;
  isbn: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
    this.updateBookForm = this.fb.group({
      isbn: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      cover: ['', [Validators.required, Validators.pattern('https?://.+')]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('isbn');
    if (this.isbn) {
      this.fetchBookDetails(this.isbn);
    }
  }

  fetchBookDetails(isbn: string): void {
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (bookData) => {
        this.book = bookData;
        this.updateBookForm.patchValue(this.book);
      },
      error: (err) => {
        console.error('Error fetching book details:', err);
        this.errorMessage = 'Failed to load book details';
      }
    });
  }

  submitUpdate(): void {
    if (this.updateBookForm.valid && this.book) {
      const updatedBook = this.updateBookForm.value;
      this.bookService.updateBook(this.book.isbn, updatedBook).subscribe({
        next: () => {
          this.successMessage = 'Book updated successfully!';
          this.errorMessage = null;
          this.router.navigate(['/']);  // Redirect to homepage or book details page
        },
        error: () => {
          this.successMessage = null;
          this.errorMessage = 'Failed to update the book. Please try again.';
        }
      });
    }
  }
}
