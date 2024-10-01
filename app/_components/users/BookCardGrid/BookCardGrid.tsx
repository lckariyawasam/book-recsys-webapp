'use client'

import { useState } from 'react';
import { Paper, Text, Title, Button } from '@mantine/core';
import { BookCard } from "../BookCard/BookCard";
import { Pagination } from '@mantine/core';

const mockBooks = [
  { title: 'Best forests to visit in North America', genre: 'Nature', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/forest' },
  { title: 'History of Ancient Civilizations', genre: 'History', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/history' },
  { title: 'Guide to the Galaxy', genre: 'Science Fiction', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/galaxy' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
  { title: 'The Art of Cooking', genre: 'Cooking', backgroundImage: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png', previewLink: 'https://example.com/cooking' },
];

const ITEMS_PER_PAGE = 8;

const BookCardGrid = () => {

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate books to display based on current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBooks = mockBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    
    <div className="w-full border-2 mt-3 rounded-md px-20 py-10">
      <div className="text-xl text-gray-600 font-semibold">Top Recommendations</div>
      <div className="flex flex-wrap justify-between my-3">
        {paginatedBooks.map((book, index) => (
          <div key={index} className="w-[23%] flex justify-center items-center my-3">
            <BookCard 
              backgroundImage={book.backgroundImage} 
              title={book.title} 
              genre={book.genre} 
              previewLink={book.previewLink} 
            />
          </div>
        ))}
        {/* Empty divs to fill in the last row when it's not complete */}
        {Array.from({ length: ITEMS_PER_PAGE - paginatedBooks.length }).map((_, index) => (
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
