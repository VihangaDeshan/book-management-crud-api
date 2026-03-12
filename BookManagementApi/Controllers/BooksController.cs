using BookManagementApi.Models;
using BookManagementApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookManagementApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET api/books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll()
        {
            return Ok(_bookService.GetAll());
        }

        // GET api/books/5
        [HttpGet("{id:int}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = _bookService.GetById(id);
            if (book is null) return NotFound();
            return Ok(book);
        }

        // POST api/books
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = _bookService.Add(book);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT api/books/5
        [HttpPut("{id:int}")]
        public ActionResult<Book> Update(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = _bookService.Update(id, book);
            if (updated is null) return NotFound();
            return Ok(updated);
        }

        // DELETE api/books/5
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var deleted = _bookService.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
