// SearchBar.tsx

import React, { useState } from 'react';
import CustomButton from '@/app/_components/Button';

interface SearchBarProps {
  handleSubmit: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(searchTerm); // Pass searchTerm to parent component
  };

  return (
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
  );
};

export default SearchBar;
