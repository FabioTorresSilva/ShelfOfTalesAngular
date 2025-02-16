// src/app/Models/review.ts
export interface Review {
  isbn: string;
  review: string;
  reviewer: string;  // Add this property to hold the reviewer's name
  date?: string;     // Optionally, you can add a date property
}
