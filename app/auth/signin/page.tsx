"use client";

import SignInPageComponent from "@/app/_components/SignIn";
import { useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (session && session.user) {
      console.log("user", session.user);
      router.push(`/user/${session.user.id}/recommendations`);
    } else {
      console.log(session)
    }
  }, [session, router])
  return (
    <div>
      <Link href="/" className="absolute top-4 left-4 flex items-center">
        <div className='text-2xl text-secondary-400 font-semibold'>Book<span className='text-primary'>Match</span></div>
      </Link>
      <SignInPageComponent />
    </div>
  );
}