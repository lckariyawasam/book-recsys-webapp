import Image from 'next/image';
import React from 'react';

interface BookCardAddBooksProps {
  title: string;
  author: string;
  rating: number;
  genres: string[];
  coverUrl: string | null;
}

const BookCardAddBooks: React.FC<BookCardAddBooksProps> = ({ title, author, rating, genres, coverUrl }) => {
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

  return (
    <div className="bg-yellow-50 p-4 shadow-lg flex flex-col max-w-2xl sm:flex-row items-center py-5 mx-auto rounded-md">
      {/* {coverUrl && (
        <div className="flex-shrink-0 mb-4 sm:mb-0">
          <Image src={coverUrl} alt={title} width={100} height={150} className="rounded-md" unoptimized />
        </div>
      )} */}
      <div className="sm:ml-6 w-full text-center sm:text-left">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <h3 className="text-lg text-gray-600">{author}</h3>
        {/* {<div className="flex justify-center sm:justify-start items-center mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927a.5.5 0 01.902 0l2.034 4.118a.5.5 0 00.378.274l4.517.656a.5.5 0 01.277.852l-3.27 3.192a.5.5 0 00-.144.445l.772 4.5a.5.5 0 01-.727.527l-4.042-2.123a.5.5 0 00-.466 0l-4.042 2.123a.5.5 0 01-.727-.527l.772-4.5a.5.5 0 00-.144-.445L2.319 8.827a.5.5 0 01.277-.852l4.517-.656a.5.5 0 00.378-.274l2.034-4.118z" />
            </svg>
          ))}
        </div>} */}
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
      </div>
    </div>
  );
};

export default BookCardAddBooks;
