import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Book } from './models/book.model';
import { BookService } from './bookService/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('addBookButton') addBookButton: any;
  title = 'BMS';
  bookForm : FormGroup;
  books: Book[];
  booksToDisplay: Book[];

  constructor(private fb: FormBuilder,  private bookService: BookService) {
    this.bookForm = this.fb.group({});
    this.books = [];
    this.booksToDisplay = this.books;
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: this.fb.control(''),
      author: this.fb.control(''),
      isbn: this.fb.control(''),
      price: this.fb.control(''),
      pubDate: this.fb.control(''),
      genre: this.fb.control('')
    });

    this.bookService.getBooks().subscribe((res) => {
      for (let book of res) {
        this.books.unshift(book);
      }
      this.booksToDisplay = this.books;
    });
  } 

  addBook() {
    let book: Book = {
      title: this.Title.value,
      author: this.Author.value,
      isbn: this.Isbn.value,
      price: this.Price.value,
      pubDate: this.PubDate.value,
      genre: this.Genre.value
    };

    this.bookService.postBook(book).subscribe((res) => {
      this.books.unshift(res);
      this.clearForm();
    });
  }


  toggleModal() {
    document.getElementById('exampleModal')?.classList.toggle('hidden');
  }


  removeBook(event: any) {
    this.books.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.bookService.deleteBook(event).subscribe((res) => {
          this.books.splice(index, 1);
        });
      }
    });
  }

  editBook(event: any) {
    this.books.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeBook(event);
    this.addBookButton.nativeElement.click();
  }

  setForm(book: Book) {
    this.Title.setValue(book.title);
    this.Author.setValue(book.author);
    this.Isbn.setValue(book.isbn);
    this.Price.setValue(book.price);
    this.PubDate.setValue(book.pubDate);
    this.Genre.setValue(book.genre);
  }

  clearForm() {
    this.Title.setValue('');
    this.Author.setValue('');
    this.Isbn.setValue('');
    this.Price.setValue('');
    this.PubDate.setValue('');
    this.Genre.setValue('');
  }

  public get Title(): FormControl {
    return this.bookForm.get('title') as FormControl;
  }
  public get Author(): FormControl {
    return this.bookForm.get('author') as FormControl;
  }
  public get Isbn(): FormControl {
    return this.bookForm.get('isbn') as FormControl;
  }
  public get Price(): FormControl {
    return this.bookForm.get('price') as FormControl;
  }
  public get PubDate(): FormControl {
    return this.bookForm.get('pubDate') as FormControl;
  }
  public get Genre(): FormControl {
    return this.bookForm.get('genre') as FormControl;
  }

}
