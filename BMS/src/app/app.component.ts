import { Component, ViewChild } from '@angular/core';
import { Book } from './models/book.model';
import { BookFormComponent } from './book-form-component/book-form-component.component';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild(BookFormComponent) bookFormComponent!: BookFormComponent;

  booksToDisplay: Book[] = [];

  onBooksChanged(updatedBooks: Book[]) {
    this.booksToDisplay = updatedBooks;
  }

  
  EditBook(bookId: number) {
    this.bookFormComponent.editBook(bookId); // Call editBook from the child
  }

  RemoveBook(bookId: number) {
    this.bookFormComponent.removeBook(bookId); // Call removeBook from the child
  }
}
