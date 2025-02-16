import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environement';
import { CommonModule } from '@angular/common';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      isbn: ['', [Validators.required]],
      title: ['', Validators.required],
      authors: this.fb.array([this.fb.control('', Validators.required)]), // Array of authors
      category: ['', Validators.required],
      cover: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get authors() {
    return (this.bookForm.get('authors') as FormArray);
  }

  addAuthor() {
    this.authors.push(this.fb.control('', Validators.required));
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = {
        isbn: this.bookForm.value.isbn,
        title: this.bookForm.value.title,
        author: this.bookForm.value.authors,  // Send authors array directly
        category: this.bookForm.value.category,
        cover: this.bookForm.value.cover,
        price: this.bookForm.value.price,
      };
  
      console.log('Form Data being sent:', formData);  // Log the data
  
      // Call the createBook method from BookService
      this.bookService.createBook(formData).subscribe({
        next: (response) => {
          console.log('Book created successfully:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          alert(`Error: ${error.message || error.error.message}`);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}