const BookCard = ({ book }) => {
  // 1. Construct the Cover Image URL
  // The API provides a cover ID (`cover_i`). We use it to build a full URL.
  // If `book.cover_i` does not exist, we provide a fallback placeholder image.
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/180x240?text=No+Cover';

  return (
    <div className="book-card">
      <img src={coverUrl} alt={`Cover of ${book.title}`} />
      <div className="book-info">
        {/* 2. Display Book Title */}
        <h3>{book.title}</h3>

        {/* 3. Display Author Name */}
        {/* The API returns authors in an array (`author_name`). We safely access the first author. */}
        {/* `?.` (Optional Chaining) prevents an error if `author_name` is missing. */}
        {/* `|| 'Unknown Author'` provides a default value if the name is not found. */}
        <p>{book.author_name?.[0] || 'Unknown Author'}</p>

        {/* 4. Display Publication Year */}
        <p>
          <small>First Published: {book.first_publish_year || 'N/A'}</small>
        </p>
      </div>
    </div>
  );
};

export default BookCard;