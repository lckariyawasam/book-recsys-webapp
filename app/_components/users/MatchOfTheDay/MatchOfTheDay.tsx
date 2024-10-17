import Image from "next/image";
import React from "react";

interface BookProps{
    bookid: string;
    title: string;
    author: string;
    genres: string;
    coverUrl: string | null;
    description: string;
    previewLink: string; // New prop for the preview link
    score?: number; // Optional prop for the score
}

const MatchOfTheDay = ({ title, author, genres, coverUrl, description, previewLink, score, bookid }:BookProps) => {

    const [showFullDescription, setShowFullDescription] = React.useState(false);
  return (
    <div className="flex justify-between px-24 py-10 border-l-2 mt-10">
        {/* content on left side */}
        <div className="flex flex-col justify-center items-start w-1/2 space-y-3">
            <p className="text-lg text-primary-300 mt-2">Match of <span className="text-gray-600">The </span>Day</p>
            <p className="text-3xl font-semibold text-gray-900">{title}</p>
            <p className="text-lg text-gray-600 mt-2">{author}</p>
            <div className="flex flex-wrap justify-center sm:justify-start mt-2">
                {/* {genres.map((genre) => ( */}
                    <span key={genres} className="bg-yellow-200 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-xl">
                        {genres}
                    </span>
                {/* ))} */}
            </div>
            <p className="text-gray-600 mt-2">
                {description.length > 150 ? `${description.substring(0, 150)}...` : description}
            </p>
            {/* score 98 */}
            <p className="">We are <span className="text-green-400 font-semibold">{score && (score*100).toFixed(2)}%</span>   sure you'll like this!</p>
            {/* preview link */}
            <a href={previewLink} target="_blank" rel="noreferrer" className="text-blue-500 mt-2">View on Google Books</a>
            <div className="flex space-x-4 mt-5">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-md">Add to Wishlist</button>
              <button className="bg-yellow-300 text-black px-4 py-2 rounded-md">Add Rating</button>
            </div>
        </div>
        {/* image on right side */}
        <div className="flex justify-end items-center w-1/2">
            {coverUrl && (
                <Image src={coverUrl} alt={title} width={300} height={450} className="rounded-md" unoptimized />
            )}
        </div>
    </div>
  )
}

export default MatchOfTheDay