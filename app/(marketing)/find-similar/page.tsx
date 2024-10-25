// FindSimilarPage.tsx
'use client'

import React, { useState } from 'react';
import SearchBar from '@/app/_components/SearchBar';
import BookCardAddBooks from '@/app/_components/BookCardAddBook';

// Define the Book type
type Book = {
  id: string;
  title: string;
  author: string | null;
  description: string;
  genres: string;
  imageURL: string | null;
  previewLink: string | null;
  publisher: string | null;
  publishedDate: string | null;
  ratingsCount: number;
  bookId: number;
  score: number;  // Added score field
};

const FindSimilarPage = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBookSelect = async (id: string, k: number) => {
    console.log("Selected book ID:", id);
    setLoading(true);
    try {
      const response = await fetch('/api/similar-books/select-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, k }),
      });
      const data: Book[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching similar books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-5 md:px-10 mt-5 md:mt-10' data-testid="find-similar-page">
      <section className='h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20'>
        <div className='flex flex-col justify-center items-center space-y-5'>
          <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center' data-testid="page-title">Tell Us What You&apos;ve Read</h1>
          <p className='text-gray-500 text-lg md:text-xl font-semibold text-center' data-testid="page-description">Add books you have read and loved. The more you add, the better we can recommend.</p>
          <SearchBar handleSubmit={handleBookSelect} />
          
          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="mt-4 min-w-full md:w-96 border border-gray-300 rounded-lg p-4 px-8" data-testid="search-results">
              <h2 className="text-lg font-semibold text-gray-800 mb-2" data-testid="search-results-title">Search Results</h2>
              <ul data-testid="search-results-list">
                {searchResults.map((result, index) => {
                  // Handle genres and authors
                  const genres = result.genres !== "Unknown" ? result.genres.split(',').map((g: string) => g.trim()) : [];
                  const authors = result.author !== "Unknown" ? result.author!.split(',').map((a: string) => a.trim()) : [];

                  return (
                    <li key={index} className="mb-4" data-testid={`search-result-item-${index}`}>
                      <BookCardAddBooks
                        title={result.title}
                        author={authors.join(', ')}
                        description={result.description}
                        genres={genres}
                        coverUrl={result.imageURL || ''}
                        previewLink={result.previewLink || ''}
                        score={result.score}  // Use the score from the API
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FindSimilarPage;
