import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../Models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHomePage: boolean = false;
  isUserLoggedIn: boolean = false;
  private routerSubscription!: Subscription;
  private authSubscription!: Subscription;
  showDropdown: boolean = false;
  userInfo: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Debug: Log current route
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Current route:', this.router.url);  // Debugging
        this.isHomePage = this.router.url === '/' || this.router.url === ''; // ✅ Ensure correct detection
      }
    });

    // ✅ Track login status
    this.authSubscription = this.authService.user.subscribe((user) => {
      this.isUserLoggedIn = !!user;
      this.userInfo = user; 
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
  }

  logout(): void {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.showDropdown = false;
    this.router.navigate(['/']); // Redirect to home after logout
    window.location.reload();
  }
}
