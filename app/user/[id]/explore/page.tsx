'use client'

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import BookCardAddBook from "@/app/_components/BookCardAddBook";
import { InputSearchBar } from "@/app/_components/users/InputSearchBar/InputSearchBar";
import { SelectGenres } from "@/app/_components/users/selectGenres/SelectGenres";
import { SelectSort } from "@/app/_components/users/SelectSort/SelectSort";

// Update this type definition
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
};

const ExplorePage = () => {
  const { data: session } = useSession();
  // States for managing API responses
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState('ratingsCount');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedGenre.join(','))}&sortby=${encodeURIComponent(selectedSort)}&sortorder=desc`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data.books || []);
      console.log(data.books);
    } catch (err) {
      setError('Error fetching books.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch function
  const debouncedFetchBooks = useCallback(
    debounce(() => {
      if (searchQuery.length >= 2) {
        fetchBooks();
      }
    }, 2000),
    [searchQuery, selectedGenre, selectedSort]
  );

  // Trigger the debounced API call whenever search, genre, or sort options change
  useEffect(() => {
    debouncedFetchBooks();
    // Cleanup function to cancel the debounce on unmount
    return () => debouncedFetchBooks.cancel();
  }, [searchQuery, selectedGenre, selectedSort, debouncedFetchBooks]);

  return (
    <div className="space-y-5">
      <div className="text-3xl font-semibold text-gray-600">Explore <span className="text-primary-300">Books</span></div>
      <div className="border-l-2 border-t-2 p-3 rounded-md space-y-10">
        {/* Options */}
        <div className="flex justify-between border-b-2 p-3">
          {/* Search bar */}
          <div className="w-2/5">
            <InputSearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          {/* Filters */}
          <div className="flex w-3/5 justify-end items-center space-x-3">
            <div className='min-w-56'>
              <SelectGenres value={selectedGenre} onChange={setSelectedGenre} />
            </div>
            <div className='min-w-56'>
              <SelectSort value={selectedSort} onChange={setSelectedSort} />
            </div>
          </div>
        </div>

        {/* Books Result */}
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : books.length > 0 ? (
            books.map((book) => (
              <div className="w-full" key={book.id}>
                <BookCardAddBook
                  title={book.title}
                  author={book.author || ''}
                  genres={book.genres}
                  coverUrl={book.imageURL || ''}
                  description={book.description}
                  previewLink={`/user/${session?.user?.id}/book/${book.bookId}`}
                />
              </div>
            ))
          ) : searchQuery.length === 0 ? <div>Start Typing to see results</div> : (
            <div>No books found</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add this debounce function at the end of the file
function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return debounced;
}

export default ExplorePage;
