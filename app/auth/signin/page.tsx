'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result?.error) {
      console.log('success', result);

    } else {
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:priamry-500"
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-primary hover:text-primary-400"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  );
}
