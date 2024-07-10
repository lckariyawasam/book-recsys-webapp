'use client'

import { useState } from 'react';
import CustomButton from './Button';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Implement search functionality here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} className='space-x-5 flex justify-center items-center'>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className='w-full md:w-96 px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition ease-in-out duration-150'
      />
      <CustomButton type="submit" size='medium' minwidth='68'>Search</CustomButton>
    </form>
  );
};

export default SearchBar;