// pages/contact.tsx

import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Have questions? Feel free to contact us through the form below, and we'll get back to you as soon as possible.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your Name"
          />
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your Email"
          />
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Your Message"
          ></textarea>
          <button className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600 transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
