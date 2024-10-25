// app/_components/BookCardAddBook.tsx
'use client'

import Image from 'next/image';
import React, { useState } from 'react';

interface BookCardAddBooksProps {
  title: string;
  author: string;
  genres: string[];
  coverUrl: string | null;
  description: string;
  previewLink: string; // New prop for the preview link
  score?: number; // Optional prop for the score
}

const BookCardAddBooks: React.FC<BookCardAddBooksProps> = ({ title, author, genres, coverUrl, description, previewLink, score }) => {
  const genreColors = [
    'bg-yellow-200 text-yellow-800',
    'bg-red-200 text-red-800',
    'bg-green-200 text-green-800',
    'bg-blue-200 text-blue-800',
    'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800',
    'bg-indigo-200 text-indigo-800',
  ];

  const getRandomColor = () => genreColors[Math.floor(Math.random() * genreColors.length)];

  // Truncate title to two lines (approximately 60 characters)
  const truncatedTitle = title.length > 60 ? title.substring(0, 60) + '...' : title;

  // Truncate description to 3 lines (approximately 180 characters)
  const truncatedDescription = description.length > 180 ? description.substring(0, 180) + '...' : description;

  return (
    <div className="p-4 shadow-lg flex flex-col sm:flex-row items-start py-5 mx-auto rounded-md max-w-2xl h-[300px] hover:shadow-2xl">
      {coverUrl && (
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <Image src={coverUrl} alt={title} width={150} height={200} className="rounded-md" unoptimized />
        </div>
      )}
      <div className="sm:ml-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{truncatedTitle}</h2>
            {score !== undefined && (
              <span className="block text-green-500 text-sm font-bold mt-1">
                {score.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <h3 className="text-lg text-gray-600 mt-2">{author}</h3>
        <div className="flex flex-wrap justify-center sm:justify-start mt-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className={`${getRandomColor()} text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-xl`}
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-700 line-clamp-3">
          {truncatedDescription}
        </p>
        {previewLink && (
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline"
          >
            Preview
          </a>
        )}
      </div>
    </div>
  );
};

export default BookCardAddBooks;
