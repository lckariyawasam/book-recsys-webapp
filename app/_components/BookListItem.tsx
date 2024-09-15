// components/BookListItem.tsx
import React from 'react';

interface BookListItemProps {
  id: string;
  title: string;
  author: string;
  onRemove: (id: string) => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ id, title, author, onRemove }) => {
  return (
    <div className="bg-yellow-50 p-4 shadow-lg flex items-center py-5 mx-auto rounded-md max-w-2xl">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <h3 className="text-lg text-gray-600 mt-2">{author}</h3>
      </div>
      <button
        className="ml-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
};

export default BookListItem;
