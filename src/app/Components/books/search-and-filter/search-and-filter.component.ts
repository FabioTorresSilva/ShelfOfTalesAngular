import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterMenuComponent } from '../filter-menu/filter-menu.component';
import { AuthService } from '../../../Services/auth.service'; // Inject AuthService

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, FilterMenuComponent],
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.css']
})
export class SearchAndFilterComponent {
  selectedCategory: string = '';
  selectedPrice: string = '';
  searchText: string = '';

  @Output() filtersChanged = new EventEmitter<{ category: string; price: string; search: string }>();

  constructor(public authService: AuthService) {}  // Make authService public

  // Called when FilterMenu emits its filter changes
  onFilterChanged(event: { category: string; price: string }): void {
    this.selectedCategory = event.category;
    this.selectedPrice = event.price;
    this.emitFilters();
  }

  // Called when SearchBar emits its search text
  onSearchChanged(search: string): void {
    this.searchText = search;
    this.emitFilters();
  }

  // Emit a unified filter object
  private emitFilters(): void {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      price: this.selectedPrice,
      search: this.searchText,
    });
  }

  // You can also add role-based logic for displaying different options here if necessary
  isManager(): boolean {
    return this.authService.isManager();  // This will allow you to handle manager-specific changes
  }
}
