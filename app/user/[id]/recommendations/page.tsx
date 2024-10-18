"use client"

import CustomButton from "@/app/_components/Button";
import BookCardGrid from "@/app/_components/users/BookCardGrid/BookCardGrid";
import MatchOfTheDay from "@/app/_components/users/MatchOfTheDay/MatchOfTheDay";
import Link from "next/link";

import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

const mockBook = {
  title: 'Fire and Blood',
  author: 'George R. R. Martin',
  genres: ['Fantasy', 'Adventure'],
  coverUrl: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png',
  description: 'Fire and Blood begins their tale with the legendary Aegon the Conqueror, creator of the Iron Throne, and goes on to recount the generations of Targaryens who fought to hold that iconic seat, all the way up to the civil war that nearly tore their dynasty apart.',
  previewLink: 'https://www.goodreads.com/book/show/36504081-fire-blood',
  score: 4.5
}

interface BookProps {
  id: string;
  title: string;
  author: string;
  description: string;
  genres: string;
  imageURL: string;
  previewLink: string;
  publisher: string;
  publishedDate: string;
  ratingsCount: number;
  bookId: number;
  score: number;
}


const page = () => {
  
  const { id } = useParams();
  console.log("id", id)

  const [recommendations, setRecommendations] = useState<BookProps[]>([])
  
  
  useEffect(() => {
    const recommendations = async () => {
      const response = await fetch('/api/recommendations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": id, "k": 10 }),
      })
      const data = await response.json()
      console.log(data)
      setRecommendations(data)
    }
    recommendations()
  }
  , [])


  return (
    <div className="space-y-10">
      <div className="flex space-x-3">
              <Link href="/find-similar">
                <CustomButton
                  minwidth="w-30"
                  size="small"
                  is_square="rounded-sm"
                >
                  Find Similar
                </CustomButton>
              </Link>
              <Link href="/input-read-books">
                <CustomButton
                  minwidth="w-30"
                  variant="outline"
                  size="small"
                  is_square="rounded-sm"
                >
                  Add Books
                </CustomButton>
              </Link>
            </div>
      {/* Match of the day */}
      {recommendations.length > 0 &&
      <MatchOfTheDay 
      title={recommendations[0].title}
      author={recommendations[0].author}
      genres={recommendations[0].genres}
      coverUrl={recommendations[0].imageURL}
      description={recommendations[0].description}
      previewLink={recommendations[0].previewLink}
      score={recommendations[0].score}
      bookid={recommendations[0].bookId.toString()}
      />}

      {/* Books List */}
      <BookCardGrid books={recommendations.slice(1,)} />
    </div>
  );
};

export default page;
