import { NextResponse, NextRequest } from "next/server";

const fastapi_url = process.env.FASTAPI_URL;

export async function POST(request : NextRequest) {
    const { title, k} = await request.json();


    const response = await fetch(`${fastapi_url}/find_similar_book_by_title/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, k }),
      });

    const data = await response.json();

    const matches = data['matches'];

    const searchResults = [''];
    return NextResponse.json(searchResults);
 }