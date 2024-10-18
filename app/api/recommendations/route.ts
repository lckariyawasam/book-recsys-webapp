// app/api/select-book/route.ts
import { NextResponse, NextRequest } from "next/server";

const fastapi_url = process.env.FASTAPI_URL;

export async function POST(request: NextRequest) {
  try {
    const { id, k } = await request.json();
    console.log("id: ", id, "k: ", k);

    const response = await fetch(`${fastapi_url}/all_recommendations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "user_id" : id, "k": k }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch similar books from FastAPI' }, { status: response.status });
    }

    const data = await response.json();
    if (data.length == 0){
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
