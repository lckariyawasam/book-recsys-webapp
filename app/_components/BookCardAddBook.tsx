import Image from 'next/image';

interface BookCardAddBooksProps {
  title: string;
  author: string;
  rating: number;
  genres: string[];
  coverUrl: string;
}

const BookCardAddBooks: React.FC<BookCardAddBooksProps> = ({ title, author, rating, genres, coverUrl }) => {
  return (
    <div className="bg-yellow-50 p-4 rounded-lg shadow-lg flex items-center">
      <div className="flex-shrink-0">
        <Image src={coverUrl} alt={title} width={100} height={150} className="rounded" />
      </div>
      
      <div className="ml-6">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <h3 className="text-lg text-gray-600">{author}</h3>
        <div className="flex items-center mt-2">
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
        </div>
        <div className="flex flex-wrap mt-2">
          {genres.map((genre) => (
            <span key={genre} className="bg-yellow-200 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-xl">
              {genre}
            </span>
          ))}
        </div>
        
      </div>
          
    </div>
  );
};

export default BookCardAddBooks;
