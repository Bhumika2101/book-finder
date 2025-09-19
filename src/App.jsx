// src/App.jsx
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './App.css'; // make sure this is included

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async ({ query, type }) => { // The function now accepts an object
    if (!query) {
      setBooks([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setBooks([]);

    // Base URL for the API
    const baseUrl = 'https://openlibrary.org/search.json';
    let searchUrl = '';

    // Build the URL based on the search type
    switch (type) {
      case 'author':
        searchUrl = `${baseUrl}?author=${query}`;
        break;
      case 'subject':
        searchUrl = `${baseUrl}?subject=${query}`;
        break;
      case 'title':
      default:
        searchUrl = `${baseUrl}?title=${query}`;
        break;
    }

    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error('Something went wrong with the network request.');
      }
      const data = await response.json();
      
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
        <h1>📚 Query-Library</h1>
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
