// pages/book/[book_id].js
"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { BookCard } from '@/app/_components/users/BookCard/BookCard';

import Image from "next/image";
import { BackgroundImage } from '@mantine/core';
import { set } from 'zod';
import { use } from 'chai';
import { FaStar } from 'react-icons/fa';

interface BookProps{
    title: string;
    author: string;
    genres: string;
    imageURL: string;
    rating?: number;
    wishlist?: boolean;
    bookId: string; // Add book_id property
    description: string;
    previewLink: string; // New prop for the preview link
    score?: number; // Optional prop for the score
}

const BookDetails = () => {
  const book_id = useParams().book_id // Get the book_id from the URL
  console.log("book_id", book_id)
  const [book, setBook] = useState<BookProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarBooks, setSimilarBooks] = useState<BookProps[]>([]);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [isRatingAdded, setIsRatingAdded] = useState(false);
  const [isAddingRating, setIsAddingRating] = useState(false);
  const [isAddingWishlist, setIsAddingWishlist] = useState(false);
  const [clickedRating, setClickedRating] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const userId = useParams().id;

  const addToWishlist = async () => {
    // Add logic to add the book to the user's wishlist
    // Call the api/wishlist endpoint with the book_id

    setIsAddingWishlist(true);
  
    const response = await fetch(`/api/wishlist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "bookId": book_id, "userId": userId }),
    });

    console.log("Add to wishlist pressed")
  
    console.log("Added to wishlist")

    setIsAddingWishlist(false);
    // Alert 
    alert(isWishlisted? "Book Removed from Wishlist" : "Book added to wishlist")
    setIsWishlisted(!isWishlisted);
  }

  const handleRatingSubmit = async () => {
    setIsAddingRating(true);
    try {
      const response = await fetch(`/api/rated/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "bookId": book_id, "userId": userId, "rating": rating }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add rating');
      }
      
      setIsRatingAdded(true);
      setShowRatingPopup(false);
      // alert("Book rated successfully");
    } catch (error) {
      console.error('Error adding rating:', error);
      alert("Failed to rate the book");
    } finally {
      setIsAddingRating(false);
    }
  };

  // Wrap fetchBookDetails in useCallback
  const fetchBookDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/book/${book_id}`, {
        method: 'POST',
        body: JSON.stringify({ "userId": userId }),
      });
      const data = await response.json();
      console.log(data)
      setBook(data);
      if (data.rating) {
        setRating(data.rating);
        setIsRatingAdded(true);
      }
      if (data.wishlist) {
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  }, [book_id, userId]); // Add dependencies here

  useEffect(() => {
    if (book_id) {
      fetchBookDetails();
    }
  }, [book_id, fetchBookDetails]); // Add fetchBookDetails to the dependency array

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      if (book) {
        // Fetch similar books
        const response = await fetch(`/api/similar-books/select-book`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "id" : book_id }),
        });
        
        const data = await response.json();
        if (data.error) {
          console.error('Error fetching similar books:', data.error);
        }
        else {
          setSimilarBooks(data.slice(1, 5));
          console.log("similarBooks", data)
        }
      }
    };
    fetchSimilarBooks();
  }, [book, book_id]); // Add book_id to the dependency array

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>No book found</div>;

  return (
    book != null && 
    <div>
       <div className="flex justify-between px-24 py-10 border-l-2 mt-10">
        {/* content on left side */}
        <div className="flex flex-col justify-start items-start w-1/2 space-y-3">
            <p className="text-3xl font-semibold text-gray-900">{book.title}</p>
            <p className="text-lg text-gray-600 mt-2">{book.author}</p>
            <div className="flex flex-wrap justify-center sm:justify-start mt-2">
                  <span key={book.genres} className="bg-yellow-200 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-xl">
                        {book.genres}
                  </span>
            </div>
            <div className="text-gray-600 mt-2">
              {showFullDescription 
                ? book.description
                : book.description.split('.').slice(0, 5).join('.') + '.'}
              {!showFullDescription && book.description.split('.').length > 5 && (
                <button 
                  onClick={() => setShowFullDescription(true)}
                  className="text-blue-500 ml-2 hover:underline"
                >
                  Show more
                </button>
              )}
            </div>
            {/* preview link */}
            <a href={book.previewLink} target="_blank" rel="noreferrer" className="text-blue-500 mt-2">View on Google Books</a>
            {/* Add a button with add to wishlist */}
            <div className="flex space-x-4 mt-5">
              <button onClick={addToWishlist}
              disabled={isAddingWishlist}
              className={`px-4 py-2 rounded-md ${
                isWishlisted 
                  ? 'bg-yellow-500 text-black' 
                  : isAddingWishlist 
                    ? 'bg-primary-300 text-white' 
                    : 'bg-primary-400 text-white'
              }`}
              >
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  isRatingAdded 
                    ? 'bg-green-500 text-white' 
                    : isAddingRating 
                      ? 'bg-primary-300 text-white' 
                      : 'bg-primary-500 text-white'
                }`}
                onClick={() => setShowRatingPopup(true)}
                disabled={isAddingRating}
              >
                {isRatingAdded ? 'Rated' : isAddingRating ? 'Rating...' : 'Rate Book'}
              </button>
            </div>
        </div>
        {/* image on right side */}
        <div className="flex justify-end items-start w-1/2">
            {book.imageURL && (
                <Image src={book.imageURL} alt={book.title} width={300} height={450} className="rounded-md" unoptimized />
            )}
        </div>
    </div>

    {/* Rating Popup */}
    {showRatingPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Rate this book</h2>
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="cursor-pointer transition-colors duration-200"
                color={index < rating ? "#ffc107" : "#e4e5e9"}
                size={40}
                onClick={() => {setClickedRating(true); setRating(index + 1)}}
                onMouseEnter={() => !clickedRating && setRating(index + 1)}
                onMouseLeave={() => !clickedRating && setRating(rating)}
              />
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              onClick={() => setShowRatingPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors duration-200"
              onClick={handleRatingSubmit}
              disabled={rating === 0}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Add a section for similar books */}
    <div className="my-10 px-24">
      <h2 className="text-2xl font-semibold text-gray-900">Similar Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-5">
        {similarBooks.map((book) => (
          <BookCard title={book.title} previewLink={`/user/${userId}/book/${book.bookId}`} key={book.bookId} genre={book.genres} backgroundImage={book.imageURL} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default BookDetails;
