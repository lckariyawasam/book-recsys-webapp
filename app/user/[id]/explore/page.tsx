'use client'

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import BookCardAddBook from "@/app/_components/BookCardAddBook";
import { InputSearchBar } from "@/app/_components/users/InputSearchBar/InputSearchBar";
import { SelectGenres } from "@/app/_components/users/selectGenres/SelectGenres";
import { SelectSort } from "@/app/_components/users/SelectSort/SelectSort";
import Link from 'next/link';

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

  const fetchBooks = useCallback(async () => {
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
  }, [searchQuery, selectedGenre, selectedSort]);

  const debouncedFetchBooks = useCallback(() => {
    let timeout: NodeJS.Timeout;

    const fetchBooksHandler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (searchQuery.length >= 2) {
          fetchBooks();
        }
      }, 2000);
    };

    fetchBooksHandler.cancel = () => clearTimeout(timeout);

    return fetchBooksHandler;
  }, [searchQuery, fetchBooks]);

  useEffect(() => {
    const fetchBooksHandler = debouncedFetchBooks();
    fetchBooksHandler();
    return () => {
      fetchBooksHandler.cancel();
    };
  }, [debouncedFetchBooks]);

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
                <Link href={`/user/${session?.user?.id}/book/${book.bookId}`}>
                <BookCardAddBook
                  title={book.title}
                  author={book.author || ''}
                  genres={book.genres.split(",")}
                  coverUrl={book.imageURL || ''}
                  description={book.description}
                  previewLink={`/user/${session?.user?.id}/book/${book.bookId}`}
                />
                </Link>
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

export default ExplorePage;
