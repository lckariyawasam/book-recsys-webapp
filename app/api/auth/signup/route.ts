import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/utils/password';
import { createUser, getUserByEmail } from '@/utils/db';
import { signUpSchema } from '@/lib/zod';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = await signUpSchema.parseAsync(body);

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 }); // Conflict
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = await createUser({ email, password: hashedPassword, name });

    return NextResponse.json(user, { status: 201 }); // Created
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 }); // Bad Request
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 }); // Internal Server Error
  }
}
