import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bookcard.component.html',
  styleUrl: './bookcard.component.css'
})
export class BookCardComponent {
  @Input() book: any;  

  constructor(private router: Router) {}

  checkBook(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }
}

