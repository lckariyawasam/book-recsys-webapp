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
  const response = await fetch(`/api/wishlist/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "userId": userId }),
  })
  
  let wishListItems = await response.json()
  // console.log("wishlist", wishListItems)
  let books:BookListBook[] = wishListItems.map((wishListiItem:any) => {
    return {
      bookId: wishListiItem.book.bookId,
      title: wishListiItem.book.title,
      author: wishListiItem.book.author,
      genres: wishListiItem.book.genres,
      imageURL: wishListiItem.book.imageURL
    }
  })
  console.log(books)

  const ratingsResponse = await fetch(`/api/rated/get`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "userId": userId }),
  })

  let ratedItems = await ratingsResponse.json()

  let ratedBooks:BookListBook[] = ratedItems.map((ratedItem:any) => {
    return {
      bookId: ratedItem.book.bookId,
      title: ratedItem.book.title,
      author: ratedItem.book.author,
      genres: ratedItem.book.genres,
      imageURL: ratedItem.book.imageURL
    }
  })

  // Add the rated books to the books list

  const bookIds = new Set(books.map(book => book.bookId))
  ratedBooks.forEach(ratedBook => {
    if (!bookIds.has(ratedBook.bookId)) {
      books.push(ratedBook)
      bookIds.add(ratedBook.bookId)
    }
  })

  if (books.length === 0) {
    return []
  }

  return books
}

const MyListPage = () => {
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


  return (
    <div className="space-y-5">
        <div className="text-3xl font-medium text-gray-600">My Books List</div>
        <div className="border-l-2 border-t-2 p-3 rounded-md"><BooksTable books={books} userId={id} /></div>
    </div>
  )
}

export default MyListPage