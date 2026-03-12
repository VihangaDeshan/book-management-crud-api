using BookManagementApi.Models;

namespace BookManagementApi.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books = new();
        private int _nextId = 1;

        public IEnumerable<Book> GetAll() => _books.AsReadOnly();

        public Book? GetById(int id) =>
            _books.FirstOrDefault(b => b.Id == id);

        public Book Add(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        public Book? Update(int id, Book book)
        {
            var existing = GetById(id);
            if (existing is null) return null;

            existing.Title = book.Title;
            existing.Author = book.Author;
            existing.Isbn = book.Isbn;
            existing.PublicationDate = book.PublicationDate;

            return existing;
        }

        public bool Delete(int id)
        {
            var existing = GetById(id);
            if (existing is null) return false;

            _books.Remove(existing);
            return true;
        }
    }
}
