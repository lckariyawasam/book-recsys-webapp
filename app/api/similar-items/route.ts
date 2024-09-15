// app/api/get-recommendations/route.ts

import { NextRequest, NextResponse } from 'next/server';

const fastapi_url = process.env.FASTAPI_URL;

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: 'Invalid input, expected an array of IDs' }, { status: 400 });
  }

  try {
    const response = await fetch(`${fastapi_url}/item_recommendations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json({ error: 'Error fetching recommendations' }, { status: 500 });
  }
}
