// components/AddBookCard.tsx
"use client";
import React, { useState } from 'react';
 

const AddBookCard: React.FC = () => {
  const [rating, setRating] = useState(4); // Initial rating of 4

  return (
    
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between space-x-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Book</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter item name"
            className="mt-1 block w-full px-3 py-2 border border-yellow-400 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">How would you rate it?</h3>
        <div className="flex items-center">
          {Array(5).fill(0).map((_, i) => (
            <svg
              key={i}
              onClick={() => setRating(i + 1)}
              className={`w-8 h-8 cursor-pointer ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C12.2622 2.00002 12.5152 2.09798 12.7071 2.29289L15.4714 5.29289L19.7605 5.68629C20.0542 5.71218 20.2972 5.89096 20.407 6.16795C20.5169 6.44494 20.4745 6.75611 20.293 6.99977L17.3186 11.169L17.9485 15.5156C17.9931 15.8044 17.8891 16.0915 17.6695 16.2748C17.45 16.4582 17.1452 16.5041 16.8773 16.3978L12.0003 14.4017L7.12266 16.3978C6.85473 16.5041 6.54992 16.4582 6.33042 16.2748C6.11093 16.0915 6.00696 15.8044 6.05151 15.5156L6.68141 11.169L3.70701 6.99977C3.52556 6.75611 3.48315 6.44494 3.59302 6.16795C3.70289 5.89096 3.94588 5.71218 4.23953 5.68629L8.52864 5.29289L11.2929 2.29289C11.4848 2.09798 11.7378 2.00002 12 2Z" />
            </svg>
          ))}
        </div>
      </div>

     <div className='flex flex-col'>
    
        </div> 

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">Cancel</button>
        <button className="bg-yellow-400 text-white py-2 px-4 rounded-md shadow hover:bg-yellow-500">Add</button>
      </div>
      
    </div>

     
  );
};

export default AddBookCard;
