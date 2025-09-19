import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  // 1. Add state to track the selected search type (defaulting to 'title')
  const [searchType, setSearchType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Pass both the query and the search type to the onSearch function
    onSearch({ query, type: searchType });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* 3. Add radio buttons for search options */}
      <div className="search-options">
        <label>
          <input
            type="radio"
            name="searchType"
            value="title"
            checked={searchType === 'title'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="author"
            checked={searchType === 'author'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Author
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="subject"
            checked={searchType === 'subject'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          Subject
        </label>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Enter a book ${searchType}...`}
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;