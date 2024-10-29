"use client"
import { BooksTable } from "@/app/_components/users/BooksTable/BooksTable"
import { auth } from "@/auth";
import prisma from "@/prisma/prisma_client"
import { use } from "chai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


// const wishlist = await prisma.wishlist.findMany()

interface BookListBook {
  bookId: string,
  title: string,
  author: string,
  genres: string,
  imageURL?: string
}

const getBooks = async (userId: string) => {

  const ratingsResponse = await fetch(`/api/rated/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "userId": userId }),
  })

  let ratedItems = await ratingsResponse.json()

  let books:BookListBook[] = ratedItems.map((ratedItem:any) => {
    return {
      bookId: ratedItem.book.bookId,
      title: ratedItem.book.title,
      author: ratedItem.book.author,
      genres: ratedItem.book.genres,
      imageURL: ratedItem.book.imageURL
    }
  })

  if (books.length === 0) {
    return []
  }

  return books
}

const FinishedListPage = () => {
  // Get the users id
  const { id } = useParams() as { id: string }

  const [books, setBooks] = useState<BookListBook[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRetrieved = await getBooks(id as string)
      setBooks(booksRetrieved)
    }
    fetchBooks()
  }, [id])


  const handleRemoveRating = async (bookId: string, userId: string) => {
    const response = await fetch(`/api/rated/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "bookId": bookId, "userId": userId }),
    });

    // Remove the book from the list
    const newBooks = books.filter(book => book.bookId !== bookId)
    setBooks(newBooks)
  
    console.log("Removed from finished list")
  }


  return (
    <div className="space-y-5">
        <div className="text-3xl font-medium text-gray-600">My Finished List</div>
        <div className="border-l-2 border-t-2 p-3 rounded-md"><BooksTable books={books} userId={id} deleteCallback={handleRemoveRating} /></div>
    </div>
  )
}

export default FinishedListPage