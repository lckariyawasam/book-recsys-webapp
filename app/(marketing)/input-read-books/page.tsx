// app/input-read-books/page.tsx
'use client'

import React, { useState } from 'react';
import SearchBarAddBooks from '@/app/_components/SearchBarAddBooks';
import BookList from '@/app/_components/BookList';
import CustomButton from '@/app/_components/Button';
import BookCardAddBooks from '@/app/_components/BookCardAddBook';

const InputReadBooksPage = () => {
  const [addedBooks, setAddedBooks] = useState<{ id: string, title: string, author: string }[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]); // New state for recommendations

  const handleBookAdd = (id: string, title: string, author: string) => {
    setAddedBooks((prevBooks) => [...prevBooks, { id, title, author }]);
  };

  const handleBookRemove = (id: string) => {
    setAddedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleGetRecommendations = async () => {
    const bookIds = addedBooks.map(book => book.id);
    try {
      const response = await fetch('/api/similar-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: bookIds }),
      });
      const data = await response.json();
      setRecommendations(data); // Store the recommendations in state
      // console.log('Recommendations:', data);
    } catch (error) {
      // console.log('Error fetching recommendations:', error);
    }
  };

  return (
    <div className='px-5 md:px-10 mt-5 md:mt-10'>
      <section className='h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20'>
        <div className='flex flex-col justify-center items-center space-y-5'>
          <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Tell Us What You’ve Read</h1>
          <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Add books you have read and loved. The more you add, the better we can recommend.</p>
          <SearchBarAddBooks handleBookAdd={handleBookAdd} />
          
          {/* Display added books */}
          {addedBooks.length > 0 && (
            <div className="mt-4 min-w-full md:w-96">
              <BookList books={addedBooks} onRemove={handleBookRemove} />
            </div>
          )}

          {/* Get Recommendations button */}
          {addedBooks.length > 0 && (
            <CustomButton type="button" onClick={handleGetRecommendations} variant='secondary' size='small' minwidth='68'>Get Recommendations</CustomButton>
          )}
        </div>

        {/* Display Recommendations */}
        {recommendations.length > 0 && (
          <div className='mt-8 space-y-4'>
            <h2 className='text-gray-700 text-2xl font-bold'>Recommendations</h2>
            <ul>
              {recommendations.map((result, index) => {
                // Handle genres and authors as strings
                const genres = result.categories !== "Unknown" ? result.categories.split(',').map((g: string) => g.trim()) : [];
                const authors = result.authors !== "Unknown" ? result.authors.split(',').map((a: string) => a.trim()) : [];

                return (
                  <li key={index} className="mb-4">
                    <BookCardAddBooks
                      title={result["Title"]}
                      author={authors}
                      description={result.description}
                      genres={genres}
                      coverUrl={result.image}
                      previewLink={result.previewLink}
                      score={result.score}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default InputReadBooksPage;
