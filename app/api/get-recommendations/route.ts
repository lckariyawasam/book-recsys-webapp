// /api/get-recommendations.ts

import { NextRequest, NextResponse } from 'next/server';

const fastapi_url = process.env.FASTAPI_URL;

export async function POST(req: NextRequest) {
  const {titles} = await req.json();

  console.log(titles);

  try {
    const response = await fetch(`${fastapi_url}/recommend/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(titles),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch similar books from FastAPI' }, { status: response.status });
    }

    const data = await response.json();
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}
