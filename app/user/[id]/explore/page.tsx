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
      }, 500);
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
      <div className="shadow p-3 pb-5 rounded-md space-y-10">
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
            <div className="col-span-2 flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-300"></div>
            </div>
          ) : error ? (
            <div className="col-span-2 text-center p-10 text-red-500">{error}</div>
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
          ) : searchQuery.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center p-16 space-y-6">
              <div className="text-6xl">📚</div>
              <div className="space-y-4 text-center">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
                  Welcome to Your Book Discovery Journey
                </h3>
                <div className="space-y-2">
                  <p className="text-xl text-gray-600">
                    Ready to find your next great read?
                  </p>
                  <div className="flex flex-col items-center space-y-3 mt-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">1</span>
                      <p>Type a book title or author in the search bar</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">2</span>
                      <p>Use filters to narrow down your preferences</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">3</span>
                      <p>Discover amazing books tailored to your taste</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center p-16 space-y-6">
              <div className="text-6xl">🔍</div>
              <div className="space-y-4 text-center">
                <h3 className="text-3xl font-bold text-gray-700">
                  No Books Found
                </h3>
                <div className="space-y-4">
                  <p className="text-lg text-gray-600">
                    We couldn't find any books matching "{searchQuery}"
                  </p>
                  <div className="flex flex-col items-center space-y-2 mt-4">
                    <p className="text-gray-500">Try adjusting your search:</p>
                    <ul className="text-gray-500 list-disc text-left space-y-1">
                      <li>Check for spelling errors</li>
                      <li>Use fewer or different keywords</li>
                      <li>Try removing some filters</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
