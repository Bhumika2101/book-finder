import BookCard from './BookCard';

const BookList = ({ books, isLoading, error }) => {
  if (isLoading) {
    return <div className="feedback-message">Loading books...</div>;
  }

  if (error) {
    return <div className="feedback-message error">{error}</div>;
  }

  if (books.length === 0) {
    return <div className="feedback-message">Start by searching for a book.</div>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;