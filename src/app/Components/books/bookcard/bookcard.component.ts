import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bookcard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bookcard.component.html',
  styleUrl: './bookcard.component.css'
})
export class BookCardComponent {
  @Input() book: any;  

  
}
