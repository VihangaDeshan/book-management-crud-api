# 📚 Book Management CRUD Application

A full-stack web application for managing books with Create, Read, Update, and Delete (CRUD) operations. Built with modern technologies and following industry best practices.

## 🚀 Tech Stack

### Frontend
- **Angular 21.2** - Latest standalone components architecture
- **TypeScript 5.9** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **Vite** - Fast build tooling

### Backend
- **.NET 9.0** - Latest ASP.NET Core Web API
- **C# 12** - Modern language features
- **RESTful API** - Industry-standard architecture

## ✨ Features

### Core Functionality
- ✅ Create new books with validation
- ✅ View all books in a responsive table
- ✅ Update existing book details
- ✅ Delete books with confirmation
- ✅ Real-time form validation (client & server)
- ✅ Toast notifications for user feedback
- ✅ Custom confirmation dialogs
- ✅ Loading states and error handling

### Technical Highlights
- 🎯 Clean Architecture with separation of concerns
- 🔒 Dual validation (Frontend + Backend)
- 🎨 Modern UI with smooth animations
- 📱 Responsive design
- 🔄 Reactive forms with Angular FormBuilder
- 🌐 CORS configured for development
- 🎭 Professional UX patterns

## 📋 Book Entity

Each book contains:
- **ID** - Auto-generated integer
- **Title** - Required, max 200 characters
- **Author** - Required, max 150 characters  
- **ISBN** - Required, ISBN-10 or ISBN-13 format
- **Publication Date** - Required, date field

## 🔗 API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| `GET` | `/api/books` | Get all books | 200 OK |
| `GET` | `/api/books/{id}` | Get book by ID | 200 OK, 404 Not Found |
| `POST` | `/api/books` | Create new book | 201 Created, 400 Bad Request |
| `PUT` | `/api/books/{id}` | Update book | 200 OK, 404 Not Found, 400 Bad Request |
| `DELETE` | `/api/books/{id}` | Delete book | 204 No Content, 404 Not Found |

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ with npm
- .NET 9.0 SDK
- Git

### Backend Setup

1. Navigate to the API directory:
```powershell
cd book-management-crud-api/BookManagementApi
```

2. Restore dependencies:
```powershell
dotnet restore
```

3. Run the API:
```powershell
dotnet run --launch-profile http
```

The API will start at `http://localhost:5246`

### Frontend Setup

1. Navigate to the UI directory:
```powershell
cd book-management-crud-api/book-management-ui
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm start
```

The application will open at `http://localhost:4200`

## 📂 Project Structure

```
book-management-crud-api/
├── BookManagementApi/           # .NET Backend
│   ├── Controllers/
│   │   └── BooksController.cs   # REST API endpoints
│   ├── Models/
│   │   └── Book.cs              # Book entity with validation
│   ├── Services/
│   │   ├── IBookService.cs      # Service interface
│   │   └── BookService.cs       # Business logic
│   ├── Program.cs               # API configuration
│   └── appsettings.json         # Configuration
│
└── book-management-ui/          # Angular Frontend
    └── src/
        └── app/
            ├── components/
            │   ├── book-list/   # List & delete books
            │   └── book-form/   # Create & update books
            ├── models/
            │   └── book.model.ts
            ├── services/
            │   └── book.service.ts  # HTTP client
            └── app.routes.ts    # Routing configuration
```

## 🎯 Architecture

### Backend Architecture
```
Controller Layer (BooksController)
    ↓
Service Layer (BookService)
    ↓
Data Layer (In-Memory List)
```

### Frontend Architecture
```
Components (Presentation)
    ↓
Services (HTTP Client)
    ↓
Models (TypeScript Interfaces)
```

## 🔐 Validation Rules

### Title
- Required field
- Minimum: 1 character
- Maximum: 200 characters

### Author
- Required field
- Minimum: 1 character
- Maximum: 150 characters

### ISBN
- Required field
- Format: Valid ISBN-10 (10 digits, last can be X) or ISBN-13 (13 digits)
- No hyphens allowed

### Publication Date
- Required field
- Must be a valid date

## 🎨 UI Features

- **Responsive Table** - Clean display of all books
- **Smart Forms** - Single form component for create/edit
- **Toast Notifications** - 2-second auto-dismiss with click-to-close
- **Custom Modal** - Beautiful delete confirmation dialog
- **Loading States** - Clear feedback during data operations
- **Empty States** - Helpful messages when no data exists
- **Smooth Animations** - Professional fade/slide transitions

## 🧪 Testing the Application

### Manual Testing

1. **Create a Book:**
   - Click "+ Add Book"
   - Fill in all fields
   - Submit and verify success toast

2. **View Books:**
   - See books displayed in table
   - Verify all fields are shown correctly

3. **Edit a Book:**
   - Click "Edit" on any book
   - Modify fields
   - Submit and verify changes

4. **Delete a Book:**
   - Click "Delete" on any book
   - Confirm in modal dialog
   - Verify book is removed

### API Testing with Postman/curl

```bash
# Get all books
curl http://localhost:5246/api/books

# Get single book
curl http://localhost:5246/api/books/1

# Create book
curl -X POST http://localhost:5246/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "publicationDate": "1925-04-10"
  }'

# Update book
curl -X PUT http://localhost:5246/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Updated Title",
    "author": "Updated Author",
    "isbn": "9780743273565",
    "publicationDate": "1925-04-10"
  }'

# Delete book
curl -X DELETE http://localhost:5246/api/books/1
```

## 🚀 Development Notes

### Data Persistence
- Currently uses **in-memory storage** for simplicity
- Data is lost when the API restarts
- Perfect for demo/development purposes

### CORS Configuration
- Configured to allow requests from `http://localhost:4200`
- Modify in `Program.cs` for production deployment

### Ports
- Backend API: `http://localhost:5246`
- Frontend App: `http://localhost:4200`
- Proxy configured in `proxy.conf.json`

## 📝 Best Practices Demonstrated

- ✅ RESTful API design with proper HTTP verbs and status codes
- ✅ Dependency Injection for loose coupling
- ✅ Interface-based programming (IBookService)
- ✅ Single Responsibility Principle
- ✅ Reactive Forms with validation
- ✅ Error handling and user feedback
- ✅ TypeScript for type safety
- ✅ Async/await patterns with Observables
- ✅ Component modularity
- ✅ Clean code with meaningful names

## 🔮 Future Enhancements

- [ ] Add database persistence (Entity Framework Core + SQL Server)
- [ ] Implement authentication & authorization (JWT)
- [ ] Add search and filtering capabilities
- [ ] Implement pagination for large datasets
- [ ] Add unit and integration tests
- [ ] Add Swagger/OpenAPI documentation
- [ ] Implement caching strategy
- [ ] Add logging infrastructure
- [ ] Containerize with Docker
- [ ] Add CI/CD pipeline

## 📄 License

This project is for educational/interview purposes.

## 👨‍💻 Author

Interview Assignment - March 2026

---

**Built with ❤️ using Angular & .NET**