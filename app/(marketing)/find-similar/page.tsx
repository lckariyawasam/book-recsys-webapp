// FindSimilarPage.tsx
'use client'

import React, { useState } from 'react';
import SearchBar from '@/app/_components/SearchBar';

const FindSimilarPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]); // Placeholder for search results



  const handleBookSelect = async (id: string, k: number) => {
    console.log("Selected book ID:", id);
    try {
      const response = await fetch('/api/similar-books/select-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, k }),
      });
      const data = await response.json();
      console.log('Similar books:', data);
      setSearchResults(data)
    } catch (error) {
      console.error('Error fetching similar books:', error);
    }
  };

  return (
    <div className='px-5 md:px-10 mt-5 md:mt-10'>
      <section className='h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20'>
        <div className='flex flex-col justify-center items-center space-y-5'>
          <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Tell Us What You’ve Read</h1>
          <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Add books you have read and loved. The more you add, the better we can recommend.</p>
          <SearchBar handleSubmit={handleBookSelect} />
          
          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="mt-4 w-full md:w-96 border border-gray-300 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Search Results</h2>
              <ul>
                {searchResults.map((result, index) => (
                  <li key={index} className="mb-2">
                    {/* Display your search result data here */}
                    {/* <p className="text-gray-600">{result.id}</p> */}
                    <p className="text-sm text-gray-500">{result.title}</p>
                    <p className="text-sm text-gray-500">{result.author}</p>
                    <p className="text-sm text-gray-500">{result.score}</p>
                    {/* Add more details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FindSimilarPage;