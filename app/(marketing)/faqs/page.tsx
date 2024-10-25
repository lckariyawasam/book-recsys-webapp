// pages/faqs.tsx

import React from 'react';

const FAQs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">How do I get personalized recommendations?</h2>
            <p className="text-gray-600">
              You can get personalized recommendations by adding books you've read or by using the "Find Similar" option.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Is BookMatch free to use?</h2>
            <p className="text-gray-600">
              Yes, BookMatch is completely free to use. Simply sign up and start finding your next favorite book.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Can I share my recommendations with others?</h2>
            <p className="text-gray-600">
              Yes! You can easily share your favorite books and recommendations with your friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
