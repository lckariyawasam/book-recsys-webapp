// pages/help-center.tsx

import React from 'react';

const HelpCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Help Center</h1>
        <p className="text-gray-600 mb-6">
          Need assistance? Below are some resources that might help you out with your queries.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Getting Started</h2>
            <p className="text-gray-600">
              Learn how to navigate and get started with BookMatch in just a few simple steps.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Managing Your Account</h2>
            <p className="text-gray-600">
              Tips on how to manage your profile, update your reading preferences, and adjust settings.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Contact Support</h2>
            <p className="text-gray-600">
              Can't find what you're looking for? Reach out to our support team for further help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
