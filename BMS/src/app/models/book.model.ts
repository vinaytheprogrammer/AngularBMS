export class Book implements book{
    id?: number = 0;
    title: string;
    author: string;
    genre: string;
    isbn: number;
    price: number | null;
    pubDate: string;
    // age: number | undefined;

  constructor(title: string, author: string, genre: string, isbn: number, price: number | null, pubDate: string, age?: number) {
      this.title = title;
      this.author = author;
      this.genre = genre;
      this.isbn = isbn;
      this.price = price;
      this.pubDate = pubDate;
    //   this.age = age;
  }
}