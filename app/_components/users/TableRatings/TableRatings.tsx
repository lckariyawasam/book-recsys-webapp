'use client'

import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './TableReviews.module.css';

type Book = {
    title: string;
    year: number;
    author: string;
    rating: number; // out of 5
    imageUrl: string;
  };

  const books: Book[] = [
    {
      title: 'Foundation',
      year: 1951,
      author: 'Isaac Asimov',
      rating: 4.5,
      imageUrl: '/images/foundation.jpg',
    },
    {
      title: 'Frankenstein',
      year: 1818,
      author: 'Mary Shelley',
      rating: 4.2,
      imageUrl: '/images/frankenstein.jpg',
    },
    {
      title: 'Solaris',
      year: 1961,
      author: 'Stanislaw Lem',
      rating: 3.5,
      imageUrl: '/images/solaris.jpg',
    },
    {
      title: 'Dune',
      year: 1965,
      author: 'Frank Herbert',
      rating: 4.8,
      imageUrl: '/images/dune.jpg',
    },
    {
      title: 'The Left Hand of Darkness',
      year: 1969,
      author: 'Ursula K. Le Guin',
      rating: 4.3,
      imageUrl: '/images/lefthand.jpg',
    },
    {
      title: 'A Scanner Darkly',
      year: 1977,
      author: 'Philip K. Dick',
      rating: 4.1,
      imageUrl: '/images/scanner.jpg',
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <svg key={index} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.973 2.89 1.518 4.673c.3.921-.755 1.688-1.54 1.113L10 14.347l-3.973 2.89c-.784.575-1.839-.192-1.54-1.113l1.518-4.674-3.973-2.89c-.783-.57-.38-1.81.588-1.81h4.911l1.518-4.674z" />
          </svg>
        ))}
        {halfStars === 1 && (
          <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.973 2.89 1.518 4.673c.3.921-.755 1.688-1.54 1.113L10 14.347v-11.42z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg key={index} className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.973 2.89 1.518 4.673c.3.921-.755 1.688-1.54 1.113L10 14.347l-3.973 2.89c-.784.575-1.839-.192-1.54-1.113l1.518-4.674-3.973-2.89c-.783-.57-.38-1.81.588-1.81h4.911l1.518-4.674z" />
          </svg>
        ))}
      </div>
    );
  };
  
  const TableRatings = () => {
    return (
      <div className="container mx-auto p-4">
        <table className="min-w-full table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              
              <th className="px-4 py-2 border-b text-left">Book title</th>
              <th className="px-4 py-2 border-b text-left">Year</th>
              <th className="px-4 py-2 border-b text-left">Author</th>
              <th className="px-4 py-2 border-b text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.title}>
                {/* <td className="px-4 py-2 border-b">
                  <Image src={book.imageUrl} alt={book.title} width={50} height={75} className="rounded-lg" />
                </td> */}
                <td className="px-4 py-2 border-b">{book.title}</td>
                <td className="px-4 py-2 border-b">{book.year}</td>
                <td className="px-4 py-2 border-b text-blue-600">{book.author}</td>
                <td className="px-4 py-2 border-b">
                  <StarRating rating={book.rating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableRatings;