import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookListComponent } from './book-list-component/book-list-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, // Redirect to BookListComponent
  { path: 'books', component: BookListComponent }, // Main book list page
  { path: '**', component: PageNotFoundComponent } // Catch-all for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
