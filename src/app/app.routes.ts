import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { BookDetailsComponent } from './Components/books/book-details/book-details.component';

export const routes: Routes = [
    { path: '', component: BookDetailsComponent },
    { path: 'sign-in', component: LoginComponent , canActivate: [authGuard] },
];
