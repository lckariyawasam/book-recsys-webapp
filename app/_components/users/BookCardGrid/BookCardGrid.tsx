'use client'

import { useState } from 'react';
import { Paper, Text, Title, Button } from '@mantine/core';
import { BookCard } from "../BookCard/BookCard";
import { Pagination } from '@mantine/core';
import { useSession } from 'next-auth/react';

// const mockBooks = [
//   { title: 'Best forests to visit in North America', genre: 'Nature', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/forest' },
//   { title: 'History of Ancient Civilizations', genre: 'History', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/history' },
//   { title: 'Guide to the Galaxy', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/galaxy' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
//   { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
// ];

const mockBooks = [
  { title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', genre: 'Fantasy', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book1' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book2' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book3' },
  { title: '1984', author: 'George Orwell', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book4' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book5' },
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J. K. Rowling', genre: 'Fantasy', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book6' },
  { title: 'The Catcher in the Rye', author: 'J. D. Salinger', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book7' },
  { title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book8' },
  { title: 'The Hunger Games', author: 'Suzanne Collins', genre: 'Young Adult', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book9' },
  { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Novel', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book10' },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', genre: 'Children\'s', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book11' },
  { title: 'The Three Musketeers', author: 'Alexandre Dumas', genre: 'Adventure', backgroundImage:'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book12' },
  { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Classic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book13' },
  { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Gothic', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book14' },
  { title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', genre: 'Adventure', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/book15' }
];


const ITEMS_PER_PAGE = 8;

const BookCardGrid = ({ books }: { books: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session } = useSession();

  return (
    <div className="w-full border-2 mt-3 rounded-md px-20 py-10">
      <div className="text-xl text-gray-600 font-semibold">Top Recommendations based on what you've read</div>
      <div className="flex flex-wrap justify-between my-3">
        {books.map((book, index) => (
          <div key={index} className="w-[23%] flex justify-center items-center my-3">
            <BookCard 
              backgroundImage={book.image} 
              title={book.title} 
              genre={book.genre} 
              previewLink={`/user/${session?.user?.id}/book/${book.book_id}`} 
            />
          </div>
        ))}
        {/* Empty divs to fill in the last row when it's not complete */}
        {Array.from({ length: ITEMS_PER_PAGE - books.length }).map((_, index) => (
          <div key={`empty-${index}`} className="w-[23%]"></div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        color='yellow'
        total={Math.ceil(mockBooks.length / ITEMS_PER_PAGE)}
        value={currentPage}
        onChange={setCurrentPage}
        mt="lg"
      />
    </div>
  );
};

export default BookCardGrid;
