import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  errorMessage = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => (this.books = data),
      error: () => (this.errorMessage = 'Failed to load books. Is the API running?')
    });
  }

  onAdd(): void {
    this.router.navigate(['/books/new']);
  }

  onEdit(book: Book): void {
    this.router.navigate(['/books/edit', book.id]);
  }

  onDelete(book: Book): void {
    if (!confirm(`Delete "${book.title}"?`)) return;

    this.bookService.delete(book.id).subscribe({
      next: () => this.loadBooks(),
      error: () => (this.errorMessage = 'Failed to delete book.')
    });
  }
}
