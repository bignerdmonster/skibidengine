import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { karmaLoad } from '~/server/queries';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const data = await karmaLoad(userId);
    return NextResponse.json(data);
  } catch (error: unknown) { // Use `unknown` for error type safety
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}