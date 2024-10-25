'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { signUpSchema } from '../../lib/zod';
import { ZodError } from 'zod';

export default function SignUpPageComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsCreating(true);

    try {
      // Validate the form data
      signUpSchema.parse({ email, password, name });

      const response = await axios.post('/api/auth/signup', { email, password, name });
      console.log('Sign up response:', response.data);
      
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl:'/auth/signin'
      });
  
      if (!result?.error) {
        console.log('success', result);
      } else {
        console.log('error', result.error);
        setError(result.error);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </label>
          </div>
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
                  
        <div className="text-sm text-gray-600">
          <p className="font-medium">Password requirements:</p>
          <ul className="list-disc list-inside">
            <li>At least 8 characters long</li>
            <li>Contains at least one uppercase letter</li>
            <li>Contains at least one lowercase letter</li>
            <li>Contains at least one number</li>
            <li>Contains at least one special character</li>
            </ul>
          </div>
          <div>
            <button
              type="submit"
              disabled={isCreating}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isCreating ? 'Creating...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-primary hover:text-primary-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
