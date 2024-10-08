// app/api/select-book/route.ts
import { NextResponse, NextRequest } from "next/server";

const fastapi_url = process.env.FASTAPI_URL;

export async function POST(request: NextRequest) {
  try {
    const { id, k } = await request.json();

    const response = await fetch(`${fastapi_url}/similar/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id" : id, "k": 15 }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch similar books from FastAPI' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
