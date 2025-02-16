import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environement';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]  // Category name input field
    });
  }

  // Method to create a new category
  createCategory() {
    if (this.categoryForm.valid) {
      const categoryData = { name: this.categoryForm.value.name };

      this.http.post(`${environment.apiBaseUrl}/bookcategory`, categoryData).subscribe({
        next: (response) => {
          console.log('Category created successfully:', response);
          this.categoryForm.reset(); // Reset form after success
          alert('Category created successfully');
        },
        error: (error) => {
          console.error('Error creating category:', error);
          alert('Error creating category');
        }
      });
    } else {
      alert('Please enter a valid category name');
    }
  }
}
