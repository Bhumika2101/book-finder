import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (query) => {
    if (!query) {
      setBooks([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setBooks([]);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      if (!response.ok) {
        throw new Error('Something went wrong with the network request.');
      }
      const data = await response.json();
      
      // The API returns an empty array in `docs` if no results are found
      if (data.docs.length === 0) {
        setError('No books found for your query.');
        setBooks([]);
      } else {
        setBooks(data.docs);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>📚 Book Finder</h1>
        <p>Search for any book and discover new reads.</p>
      </header>
      <main>
        <SearchBar onSearch={fetchBooks} />
        <BookList books={books} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
}

export default App;