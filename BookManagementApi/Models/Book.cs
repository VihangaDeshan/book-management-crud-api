using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BookManagementApi.Models
{
    public class Book
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Title must be between 1 and 200 characters.")]
        public string Title { get; set; } = string.Empty;

        [JsonPropertyName("author")]
        [Required(ErrorMessage = "Author is required.")]
        [StringLength(150, MinimumLength = 1, ErrorMessage = "Author must be between 1 and 150 characters.")]
        public string Author { get; set; } = string.Empty;

        [JsonPropertyName("isbn")]
        [Required(ErrorMessage = "ISBN is required.")]
        [RegularExpression(@"^(?:\d{9}[\dX]|\d{13})$",
            ErrorMessage = "ISBN must be a valid 10-digit (ISBN-10) or 13-digit (ISBN-13) number. Hyphens are not allowed.")]
        public string Isbn { get; set; } = string.Empty;

        [JsonPropertyName("publicationDate")]
        [Required(ErrorMessage = "Publication date is required.")]
        public DateTime PublicationDate { get; set; }
    }
}
