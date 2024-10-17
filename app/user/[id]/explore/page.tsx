// pages/user/[id]/explore/page.tsx

import BookCardAddBook from "@/app/_components/BookCardAddBook"
import { InputSearchBar } from "@/app/_components/users/InputSearchBar/InputSearchBar"
import { SelectGenres } from "@/app/_components/users/selectGenres/SelectGenres"
import { SelectSort } from "@/app/_components/users/SelectSort/SelectSort"

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

const ExplorePage = () => {
  return (
    <div className="space-y-5">
        <div className="text-3xl font-semibold text-gray-600">Explore <span className="text-primary-300">Books</span></div>
        <div className="border-l-2 border-t-2 p-3 rounded-md space-y-10">
            {/* options */}
            <div className="flex justify-between border-b-2 p-3">
                {/* search bar */}
                <div className="w-2/5"><InputSearchBar /></div>
                {/* filters */}
                <div className="flex w-3/5 justify-end items-center space-x-3">
                    <div className='min-w-56'><SelectGenres /></div>
                    <div className='min-w-56'><SelectSort /></div>
                </div>
            </div>

            {/* Books Result */}
            <div className="grid grid-cols-2 gap-4">
              {mockBooks.map((book) => (
                <div className="w-full" key={book.title}><BookCardAddBook title={book.title} author={book.author} genres={[book.genre]} coverUrl={book.backgroundImage} description={""} previewLink={book.previewLink} /></div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default ExplorePage