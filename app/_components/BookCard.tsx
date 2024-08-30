// BookCard.tsx
import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, coverUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-4 max-w-xs md:max-w-md w-full mx-auto">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="w-32 h-48 object-cover rounded-md"
        />
      )}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{author}</p>
    </div>
  );
};

export default BookCard;
