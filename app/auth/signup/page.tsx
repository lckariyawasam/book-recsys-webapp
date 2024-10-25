import SignUpPageComponent from "@/app/_components/SignUp";
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div>
      <Link href="/" className="absolute top-4 left-4 flex items-center">
        <div className='text-2xl text-secondary-400 font-semibold'>Book<span className='text-primary'>Match</span></div>
      </Link>
      <SignUpPageComponent />
    </div>
  );
}
