import { Routes } from '@angular/router';
import { LoginComponent } from './Components/auth/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { BookDetailsComponent } from './Components/books/book-details/book-details.component';
import { BookDetailComponent } from './Components/books/bookdetail/bookdetail.component';
import { SignUpComponent } from './Components/auth/signup/signup.component';
import { CreateBookComponent } from './Components/create-book/create-book.component';
import { CreateCategoryComponent } from './Components/create-category/create-category.component';
import { UpdateBookComponent } from './Components/update-book/update-book.component';

export const routes: Routes = [
    { path: '', component: BookDetailsComponent },
    { path: 'sign-in', component: LoginComponent , canActivate: [authGuard] },
    { path: 'book/create', component: CreateBookComponent },
    { path: 'category/create', component: CreateCategoryComponent },
    { path: 'book/:isbn', component: BookDetailComponent },
    { path: 'sign-up', component: SignUpComponent, canActivate: [authGuard] },  
    { path: 'update/book/:isbn', component: UpdateBookComponent},  
    
];


