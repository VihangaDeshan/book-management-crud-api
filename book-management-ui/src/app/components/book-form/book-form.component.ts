import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit, OnDestroy {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  errorMessage = '';
  successMessage = '';
  private navTimer: any;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    clearTimeout(this.navTimer);
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.maxLength(150)]],
      isbn: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:\d{9}[\dX]|\d{13})$/)
        ]
      ],
      publicationDate: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.bookId = +idParam;
      this.bookService.getById(this.bookId).subscribe({
        next: (book) => {
          this.bookForm.patchValue({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publicationDate: book.publicationDate.substring(0, 10) // date input needs YYYY-MM-DD
          });
        },
        error: () => (this.errorMessage = 'Could not load book details.')
      });
    }
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formValue = this.bookForm.value;
    const payload = {
      ...formValue,
      publicationDate: new Date(formValue.publicationDate).toISOString()
    };

    if (this.isEditMode && this.bookId !== null) {
      this.bookService.update(this.bookId, { id: this.bookId, ...payload }).subscribe({
        next: () => {
          this.successMessage = 'Book updated successfully!';
          this.navTimer = setTimeout(() => this.router.navigate(['/books'], { state: { toast: 'Book updated successfully!' } }), 1500);
        },
        error: () => (this.errorMessage = 'Failed to update book.')
      });
    } else {
      this.bookService.create(payload).subscribe({
        next: () => {
          this.successMessage = 'Book added successfully!';
          this.navTimer = setTimeout(() => this.router.navigate(['/books'], { state: { toast: 'Book added successfully!' } }), 1500);
        },
        error: () => (this.errorMessage = 'Failed to create book.')
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}
