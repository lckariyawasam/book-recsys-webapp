'use client'

import Image from "next/image";
import React, { useState } from "react";
// Add this new import
import { FaStar } from 'react-icons/fa';


interface BookProps{
    bookid: string;
    title: string;
    author: string;
    genres: string;
    coverUrl: string | null;
    description: string;
    previewLink: string; // New prop for the preview link
    score?: number; // Optional prop for the score
    userId: string; // Add userId prop
}

const MatchOfTheDay = ({ title, author, genres, coverUrl, description, previewLink, score, bookid, userId }:BookProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    // Add these new state variables
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [rating, setRating] = useState(0);

    const [isAddingRating, setIsAddingRating] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddingWishlist, setIsAddingWishlist] = useState(false);
    const [isRatingAdded, setIsRatingAdded] = useState(false);
    const [clickedRating, setClickedRating] = useState(false);

    const addToWishlist = async () => {
        // Add logic to add the book to the user's wishlist
        // Call the api/wishlist endpoint with the book_id
    
        setIsAddingWishlist(true);
      
        const response = await fetch(`/api/wishlist/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "bookId": bookid, "userId": userId }),
        });
    
        console.log("Add to wishlist pressed")
      
        console.log("Added to wishlist")
    
        setIsAddingWishlist(false);
        // Alert 
        alert(isWishlisted? "Book Removed from Wishlist" : "Book added to wishlist")
        setIsWishlisted(!isWishlisted);
      }
    
      const handleRatingSubmit = async () => {
        setIsAddingRating(true);
        try {
          const response = await fetch(`/api/rated/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "bookId": bookid, "userId": userId, "rating": rating }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to add rating');
          }
          
          setIsRatingAdded(true);
          setShowRatingPopup(false);
          // alert("Book rated successfully");
        } catch (error) {
          console.error('Error adding rating:', error);
          alert("Failed to rate the book");
        } finally {
          setIsAddingRating(false);
        }
      };
    return (
        <div className="flex flex-col md:flex-row justify-between px-4 md:px-24 py-10 border-l-2 mt-10">
            {/* content on left side */}
            <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-3">
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
                {
                  (score ?? 0) > 0 && 
                  <p className="">
                    We are <span className="text-green-400 font-semibold">{score && (score*100).toFixed(2)}%</span> sure you&apos;ll like this!
                  </p>
                }
                {/* preview link */}
                {
                  (score ?? 0) > 0 &&
                  <>
                    <a href={`/user/${userId}/book/${bookid}`} target="_blank" rel="noreferrer" className="text-blue-500 mt-2">Read More</a>
                    <div className="flex space-x-4 mt-5">
                    <button onClick={addToWishlist}
                        disabled={isAddingWishlist}
                        className={`px-4 py-2 rounded-md ${
                            isWishlisted 
                            ? 'bg-yellow-500 text-black' 
                            : isAddingWishlist 
                                ? 'bg-primary-300 text-white' 
                                : 'bg-primary-400 text-white'}`}>
                            {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                      <button
                        className={`${
                            isAdded 
                                ? 'bg-green-500 text-white' 
                                : isLoading 
                                    ? 'bg-yellow-300 text-black' 
                                    : 'bg-yellow-300 text-black'
                        } px-4 py-2 rounded-md`}
                        onClick={() => !isAdded && setShowRatingPopup(true)}
                        disabled={isLoading || isAdded}
                      >
                        {isAdded ? 'Added' : isLoading ? 'Adding...' : 'Add Rating'}
                      </button>
                    </div>
                  </>
                }
              </div>
            {/* image on right side */}
            <div className="flex justify-center md:justify-end items-center w-full md:w-1/2 mt-6 md:mt-0">
                {coverUrl && (
                    <Image src={coverUrl} alt={title} width={300} height={450} className="rounded-md" unoptimized />
                )}
            </div>

            {/* Updated rating popup */}
            {showRatingPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Rate this book</h2>
                        <div className="flex justify-center mb-6">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className="cursor-pointer transition-colors duration-200"
                                    color={index < rating ? "#ffc107" : "#e4e5e9"}
                                    size={40}
                                    onClick={() => {setClickedRating(true); setRating(index + 1)}}
                                    onMouseEnter={() => !clickedRating && setRating(index + 1)}
                                    onMouseLeave={() => !clickedRating && setRating(rating)}
                                />
                            ))}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                onClick={() => setShowRatingPopup(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200"
                                onClick={handleRatingSubmit}
                                disabled={rating === 0}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MatchOfTheDay
