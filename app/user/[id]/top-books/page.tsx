'use client'

import { BooksTable } from "@/app/_components/users/BooksTable/BooksTable";
import { TableReviews } from "@/app/_components/users/TableReviews/TableReviews"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const TopBooksPage = () => {

  // Get the top rated books

  const [books, setBooks] = useState<any[]>([]);
  const { data: session } = useSession()
  const userid = session?.user?.id || ''

  console.log(userid)

  useEffect(() => {
    const fetchBooks = async () => {
      // Load the books from the API

      fetch('/api/top-rated')
        .then((response) => response.json())
        .then((data) => {
          data = data.map((book: any) => {
            return {
              bookId: book.bookId,
              title: book.title,
              author: book.author,
              genres: book.genres,
              year: book.publishedDate,
              review_count: book.ratingsCount,
              imageURL: book.imageURL
            }})
          console.log(data)
          setBooks(data);
        })
        .catch((error) => {
          console.error('Error fetching top books:', error);
        });

    };

    fetchBooks();
  }, [])
  




  return (
    <div className="space-y-5">
    <div className="text-3xl font-medium text-gray-600">Top Books</div>
    <div className="border-l-2 border-t-2 p-3 rounded-md">
      {/* <TableReviews books={books} />
       */}
       <BooksTable books={books} userId={userid} deleteCallback={null} />
    </div>
</div>
  )
}

export default TopBooksPage