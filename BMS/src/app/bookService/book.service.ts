import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = 'http://localhost:3000/api/books'
  
  constructor(private http : HttpClient) { }

  getBooks(){
    return this.http.get<Book[]>(this.baseUrl);
  }

  postBook(employee : Book){
    return this.http.post<Book>(this.baseUrl,employee);
  }

  deleteBook(id : string){
    return this.http.delete(this.baseUrl+'/'+id);
  }
} 
