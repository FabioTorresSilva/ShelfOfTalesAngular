import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../Models/book';
import { BookService } from '../../../Services/book.service';
import { Review } from '../../../Models/review';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./bookdetail.component.html",
  styleUrls: ['./bookdetail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  reviews: Review[] = [];
  isbn: string | null = null;
  isLoggedIn: boolean = false;
  showReviewForm: boolean = false;
  reviewForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.isbn = this.route.snapshot.paramMap.get('isbn');
    if (this.isbn) {
      this.fetchBookDetails(this.isbn);
    }
  }

  fetchBookDetails(isbn: string): void {
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (bookData) => {
        this.book = bookData;
        this.fetchReviews(isbn);
      },
      error: (err) => console.error('Error fetching book details:', err)
    });
  }

  fetchReviews(isbn: string): void {
    this.bookService.getReviewsByIsbn(isbn).subscribe({
      next: (data) => this.reviews = data,
      error: (err) => console.error('Error fetching reviews:', err)
    });
  }

  submitReview(): void {
    if (this.reviewForm.valid && this.book) {
      const newReview = {
        isbn: this.book.isbn,
        review: this.reviewForm.value.review,
      };

      this.bookService.addReview(newReview).subscribe({
        next: () => {
          this.successMessage = 'Review added successfully!';
          this.errorMessage = null;
          this.showReviewForm = false;
          this.reviewForm.reset();
          this.fetchReviews(this.book!.isbn);
        },
        error: () => {
          this.successMessage = null;
          this.errorMessage = 'Failed to add review. Please try again.';
        }
      });
    }
  }
}
