// app/_components/BookCardAddBook.tsx

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

  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate description to 150 characters
  const truncatedDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;

  // Expand description to 300 characters
  const expandedDescription = description.length > 300 ? description.substring(0, 300) + '...' : description;

  return (
    <div className="p-4 shadow-lg flex flex-col sm:flex-row items-start py-5 mx-auto rounded-md max-w-2xl">
      {coverUrl && (
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <Image src={coverUrl} alt={title} width={150} height={200} className="rounded-md" unoptimized />
        </div>
      )}
      <div className="sm:ml-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="flex-grow text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
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
        <p className="mt-4 text-sm text-gray-700">
          {isExpanded ? expandedDescription : truncatedDescription}
        </p>
        {description.length > 150 && (
          <button
            className="mt-2 mr-5 text-blue-400 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
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
