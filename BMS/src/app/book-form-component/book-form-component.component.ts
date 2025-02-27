import { Component, ViewChild, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookService } from '../bookService/book.service';

@Component({
  selector: 'app-book-form-component',
  templateUrl: './book-form-component.component.html',
  styleUrls: ['./book-form-component.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  @Output() booksChanged = new EventEmitter<Book[]>();

  bookForm: FormGroup;
  books$ = new BehaviorSubject<Book[]>([]); // Store book list reactively
  private unsubscribe$ = new Subject<void>(); // For unsubscribing Observables

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.bookForm = this.fb.group({
      title: [''],
      author: [''],
      isbn: [''],
      price: [''],
      pubDate: [''],
      genre: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks(); // Initial load
  }

  loadBooks() {
    this.bookService.getBooks()
      .pipe(
        tap(books => {this.books$.next(books);  this.booksChanged.emit(books);}), // Update BehaviorSubject
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  addBook() {
    const book: Book = this.bookForm.value;

    this.bookService.postBook(book)
      .pipe(
        switchMap(() => this.bookService.getBooks()), // Refresh list after adding
        tap(books => {
          this.books$.next(books);
          this.booksChanged.emit(books);
          this.clearForm();
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  removeBook(bookId: any) {
    this.bookService.deleteBook(bookId.toString())
      .pipe(
        switchMap(() => this.bookService.getBooks()), // Refresh list after deletion
        tap(books => {
          this.books$.next(books);
          this.booksChanged.emit(books);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  editBook(book: Book) {
    this.bookForm.setValue({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      pubDate: book.pubDate,
      genre: book.genre
    });

    //instead of creating a put request we can remove the book and add it again
    this.removeBook(book.id); // Remove the book from the list
    this.toggleModal(); // open the addBook form and after inserting call the addBook method  
  }

  clearForm() {
    this.bookForm.reset();
  }

  toggleModal() {
    document.getElementById('exampleModal')?.classList.toggle('hidden');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); // Prevent memory leaks
  }
}
