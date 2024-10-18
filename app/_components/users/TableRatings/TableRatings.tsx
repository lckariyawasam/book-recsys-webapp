'use client'

import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import classes from '../TableReviews/TableReviews.module.css';

type Book = {
    title: string;
    year: number;
    author: string;
    rating: number; // out of 5
    imageUrl: string;
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <svg key={index} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.973 2.89 1.518 4.673c.3.921-.755 1.688-1.54 1.113L10 14.347l-3.973 2.89c-.784.575-1.839-.192-1.54-1.113l1.518-4.674z" />
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
  
  // New type for RatedListItem
  type RatedListItem = {
    id: string;
    userId: number;
    bookId: number;
    rating: number;
    ratedAt: string;
    book: {
      title: string;
      publishedDate: string;
      author: string;
      bookId: number;
      ratingsCount: number;
    };
  };

  const TableRatings = () => {
    const [ratedBooks, setRatedBooks] = useState<RatedListItem[]>([]);
    const { id: userId } = useParams();

    useEffect(() => {
      const fetchRatedBooks = async () => {
        try {
          const response = await fetch(`/api/user/rated-books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });
          if (response.ok) {
            const data = await response.json();
            setRatedBooks(data);
          } else {
            console.error('Failed to fetch rated books');
          }
        } catch (error) {
          console.error('Error fetching rated books:', error);
        }
      };

      fetchRatedBooks();
    }, [userId]);

    return (
      <div className="container mx-auto p-4">
        <table className="min-w-full table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Book title</th>
              <th className="px-4 py-2 border-b text-left">Year</th>
              <th className="px-4 py-2 border-b text-left">Author</th>
              <th className="px-4 py-2 border-b text-left">Rating</th>
              <th className="px-4 py-2 border-b text-left">Preview</th>
            </tr>
          </thead>
          <tbody>
            {ratedBooks.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border-b">{item.book.title}</td>
                {/* let's get the first 4 digits of the publishedDate */}
                <td className="px-4 py-2 border-b">{item.book.publishedDate.slice(0, 4)}</td>
                <td className="px-4 py-2 border-b text-blue-600">{item.book.author}</td>
                {/* if rating is greater than 3, then display the rating in green, if less than 3, then display the rating in red, else display the rating in yellow */}
                <td className="px-4 py-2 border-b">
                  {item.rating > 3 ? <span className="text-green-500  ">{item.rating}/5</span> : item.rating < 3 ? <span className="text-red-600 font-semibold">{item.rating}/5</span> : <span className="text-yellow-600 font-semibold">{item.rating}/5</span>}  
                </td>
                <td className="px-4 py-2 border-b">
                  <Link href={`/user/${userId}/book/${item.bookId}`} className="text-blue-600 hover:underline">
                    Preview
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TableRatings;
