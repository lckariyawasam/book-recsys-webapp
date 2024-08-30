"use client";
import React, { useState } from 'react';

const fastapi_url = 'http://localhost:8000';

interface Book {
  title: string;
  bookId: string;
  author: string;
  avgRating?: number; // Optional, as it's not in the current API response
  genres?: string;    // Optional, as it's not in the current API response
  coverUrl?: string; // Optional, as it's not in the current API response
}

const AddBookCard: React.FC<{ onAddBook: (book: Book) => void }> = ({ onAddBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;

    try {
      const response = await fetch(`${fastapi_url}/search?title=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      console.log(data);

      // Map API response to Book interface
      const books: Book[] = data.map((item: any) => ({
        title: item['Book-Title'],
        bookId: item['Book-ID'],
        author: item['Book-Author'],
        // Optional fields
        avgRating: undefined, // or provide default value
        genres: undefined,    // or provide default value
        coverUrl: undefined, // or provide default value
      }));

      setSearchResults(books);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = (book: Book) => {
    onAddBook(book);
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 2) {
      handleSearch();
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (book: Book) => {
    handleAddBook(book);
  };

  return (
    <div className="min-w-md bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 relative">
      <div className='w-full'>
        <h2 className="text-xl font-semibold mb-4">Add Book</h2>
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search for a Book</label>
          <input
            type="text"
            id="search"
            placeholder="Enter book title"
            className="mt-1 block w-full px-3 py-2 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay hiding to allow selection
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && searchResults.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-60 overflow-auto">
          {searchResults.map((book) => (
            <li
              key={book.bookId}
              className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(book)}
            >
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddBookCard;
