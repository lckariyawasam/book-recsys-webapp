// components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import CustomButton from '@/app/_components/Button';

interface SearchBarProps {
  handleSubmit: (id: string, k: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string, title: string, author: string }[]>([]);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) return; // Minimal length for triggering search
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setSuggestions(data.books.map((book: { bookId: string, title: string, author: string }) => ({
        id: book.bookId,
        title: book.title,
        author: book.author
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300); // 300ms delay for debouncing

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (id: string) => {
    const k = 5; // Example value for k, can be dynamic
    handleSubmit(id, k); // Pass the selected book ID and k to the parent component
    setSearchTerm(''); // Clear search term
    setSuggestions([]); // Clear suggestions
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You can add a default behavior here if necessary
  };

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className='space-x-5 flex justify-center items-center'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='w-full md:w-96 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition ease-in-out duration-150'
        />
        <CustomButton type="submit" size='medium' minwidth='68'>Search</CustomButton>
      </form>
      {suggestions.length > 0 && (
        <ul className='absolute z-10 bg-white border border-gray-300 rounded-lg mt-2 max-w-md mx-auto shadow-lg'>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className='p-3 hover:bg-secondary-100 cursor-pointer transition-colors duration-150 border-b border-gray-200 last:border-b-0'
              onClick={() => handleSuggestionClick(suggestion.id.toString())}
            >
              <div className='text-base font-semibold'>{suggestion.title}</div>
              <div className='text-sm text-gray-500'>{suggestion.author}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
