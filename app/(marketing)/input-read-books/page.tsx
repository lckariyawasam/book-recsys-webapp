'use client'

import React, { useState } from "react";
import AddBookCard from "@/app/_components/AddBookCard";
import BookCard from "@/app/_components/BookCard";

import { redirectWithParams } from '@/utils/redirectWithParams';

interface Book {
  title: string;
  bookId: string;
  author: string;
  avgRating?: number; // Optional
  genres?: string;    // Optional
  coverUrl?: string; // Optional
}

const InputReadBookPage: React.FC = () => {
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);
  const [showAddBookCard, setShowAddBookCard] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = (book: Book) => {
    setAddedBooks((prevBooks) => [...prevBooks, book]);
    setShowAddBookCard(false); // Hide the AddBookCard component after a book is added
  };

  const handleAddAnotherBook = () => {
    setShowAddBookCard(true); // Show the AddBookCard component when "Add Another Book" is clicked
  };

  const handleRemoveLastBook = () => {
    setAddedBooks((prevBooks) => prevBooks.slice(0, -1));
    if (addedBooks.length <= 1) {
      setShowAddBookCard(true); // Show the AddBookCard if all books are removed
    }
  };


const handleGetRecommendations = async () => {
  const bookTitles = addedBooks.map(book => book.title);

  try {
    const response = await fetch('/api/get-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titles: bookTitles }),
    });

    if (response.ok) {
      const recommendations = await response.json();
      console.log('Recommendations:', recommendations);
      // Redirect to the recommendations page with the results
      redirectWithParams('/recommendations', { recommendations });
    } else {
      console.error('Failed to get recommendations');
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
  }
};

  

  return (
    <div className="px-5 md:px-10 mt-5 md:mt-10">
      <section className="h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h1 className="text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Tell Us What You've Read
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-semibold text-center">
            Add books you have read and loved. The more you add, the better we can recommend.
          </p>
        </div>

        {/* Display Added Books */}
        <div className="flex flex-col gap-8 items-center justify-center">
          {addedBooks.map((book, index) => {
            return (
              <BookCard
                key={book.bookId}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
              />
            );
          })}
        </div>

        {/* Conditionally Render AddBookCard Component */}
        {showAddBookCard && <AddBookCard onAddBook={handleAddBook} />}

        {/* Display Buttons */}
        {addedBooks.length > 0 && !showAddBookCard && (
          <div className="flex flex-row space-x-4 mt-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full shadow-md"
              onClick={handleAddAnotherBook}
            >
              Add Another Book
            </button>

            <button
              className="bg-yellow-100 text-yellow-700 font-medium py-2 px-4 rounded-full shadow-md"
              onClick={handleRemoveLastBook}
            >
              Remove Last Book
            </button>
          </div>
        )}

        {/* Get Recommendation Button */}
        {addedBooks.length > 0 && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full shadow-md mt-6"
            onClick={handleGetRecommendations}
          >
            Get Recommendations
          </button>
        )}
      </section>
    </div>
  );
};

export default InputReadBookPage;
