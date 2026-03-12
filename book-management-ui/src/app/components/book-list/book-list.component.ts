import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';
  bookToDelete: Book | null = null;
  private toastTimer: any;

  constructor(
    private bookService: BookService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Read success toast passed via router state from the form
    const navigationState = history.state;
    if (navigationState?.toast) {
      console.log('Toast received:', navigationState.toast);
      this.successMessage = navigationState.toast;
      this.toastTimer = setTimeout(() => {
        console.log('Auto-dismissing toast');
        this.successMessage = '';
        this.cdr.detectChanges();
      }, 2000);
    }
    // Always clear navigation state to prevent persistence
    this.router.navigate([], { replaceUrl: true, state: {} });
    this.loadBooks();
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }

  loadBooks(): void {
    console.log('loadBooks() called');
    this.loading = true;
    this.errorMessage = ''; // Clear any previous errors
    this.bookService.getAll().subscribe({
      next: (data) => { 
        console.log('Books received:', data); 
        this.books = data; 
        this.loading = false; 
        console.log('After setting - loading:', this.loading, 'books.length:', this.books.length);
        this.cdr.detectChanges(); // Force change detection
      },
      error: (err) => { 
        console.error('Error loading books:', err); 
        this.errorMessage = 'Failed to load books. Is the API running?'; 
        this.loading = false; 
        this.cdr.detectChanges(); // Force change detection
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }

  onAdd(): void {
    this.router.navigate(['/books/new']);
  }

  onEdit(book: Book): void {
    this.router.navigate(['/books/edit', book.id]);
  }

  onDelete(book: Book): void {
    this.bookToDelete = book;
  }

  confirmDelete(): void {
    if (!this.bookToDelete) return;
    
    const bookTitle = this.bookToDelete.title;
    this.bookService.delete(this.bookToDelete.id).subscribe({
      next: () => {
        this.successMessage = `"${bookTitle}" deleted successfully!`;
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 2000);
        this.bookToDelete = null;
        this.loadBooks();
      },
      error: () => {
        this.errorMessage = 'Failed to delete book.';
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 2000);
        this.bookToDelete = null;
      }
    });
  }

  cancelDelete(): void {
    this.bookToDelete = null;
  }

  dismissToast(): void {
    this.successMessage = '';
    this.errorMessage = '';
    clearTimeout(this.toastTimer);
  }
}
