import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../Services/category.service';
import { FormsModule } from '@angular/forms';

interface BookCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-filter-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {
  categories: string[] = []; // Array of category names
  priceRanges: string[] = ['0-10', '10-50', '50+'];
  selectedCategory: string = '';
  selectedPriceRange: string = '';

  @Output() filtersChanged = new EventEmitter<{ category: string; price: string }>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(category => category.name);
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  applyFilters(): void {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      price: this.selectedPriceRange
    });
  }
}
