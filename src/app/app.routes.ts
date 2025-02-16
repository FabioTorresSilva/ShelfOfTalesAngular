import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { BookDetailsComponent } from './Components/books/book-details/book-details.component';
import { BookDetailComponent } from './Components/books/bookdetail/bookdetail.component';
import { SignUpComponent } from './Components/auth/signup/signup.component';

export const routes: Routes = [
    { path: '', component: BookDetailsComponent },
    { path: 'sign-in', component: LoginComponent , canActivate: [authGuard] },
    { path: 'book/:isbn', component: BookDetailComponent },
    { path: 'sign-up', component: SignUpComponent, canActivate: [authGuard] },  
];


