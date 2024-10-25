// components/SearchBarAddBooks.tsx

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import CustomButton from '@/app/_components/Button';

interface SearchBarAddBooksProps {
  handleBookAdd: (id: string, title: string, author: string) => void;
  filterByRatings?: boolean; // Add an optional prop to control the filter
}

const SearchBarAddBooks: React.FC<SearchBarAddBooksProps> = ({ handleBookAdd, filterByRatings = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ id: string, title: string, author: string, imageURL: string }[]>([]);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) return; // Minimal length for triggering search
    try {
      const response = await fetch(`/api/search?query=${query}&filterByRatings=${filterByRatings}`);
      const data = await response.json();
      setSuggestions(data.books.map((book: { bookId: string, title: string, author: string, imageURL: string }) => ({
        id: book.bookId,
        title: book.title,
        author: book.author,
        imageURL: book.imageURL
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, [filterByRatings]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300); // 300ms delay for debouncing

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [searchTerm, fetchSuggestions]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (id: string, title: string, author: string) => {
    handleBookAdd(id, title, author); // Pass the selected book to the parent component
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
              className='p-3 hover:bg-secondary-100 cursor-pointer transition-colors duration-150 border-b border-gray-200 last:border-b-0 flex items-center'
              onClick={() => handleSuggestionClick(suggestion.id.toString(), suggestion.title, suggestion.author)}
            >
              <div className='flex-shrink-0 mr-3'>
                <Image
                  src={suggestion.imageURL || '/placeholder-book-cover.jpg'}
                  alt={`Cover of ${suggestion.title}`}
                  width={40}
                  height={60}
                  className='object-cover'
                />
              </div>
              <div>
                <div className='text-base font-semibold'>{suggestion.title}</div>
                <div className='text-sm text-gray-500'>{suggestion.author}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarAddBooks;
