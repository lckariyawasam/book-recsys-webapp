// components/BookList.tsx
import React from 'react';
import BookListItem from '@/app/_components/BookListItem';

interface BookListProps {
  books: { id: string; title: string; author: string }[];
  onRemove: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onRemove }) => {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookListItem
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default BookList;
