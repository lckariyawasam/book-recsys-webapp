// app/api/select-book/route.ts
import { NextResponse, NextRequest } from "next/server";

const fastapi_url = process.env.FASTAPI_URL;

// Define the Book type based on the Prisma schema
type Book = {
  id: string;
  title: string;
  author: string | null;
  description: string;
  genres: string;
  imageURL: string | null;
  previewLink: string | null;
  publisher: string | null;
  publishedDate: string | null;
  ratingsCount: number;
  bookId: number;
  score: number;
};

export async function POST(request: NextRequest) {
  try {
    const { id, k } = await request.json();
    const intid = parseInt(id);

    const response = await fetch(`${fastapi_url}/similar/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": intid.toString(), "k": 15 }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch similar books from FastAPI' }, { status: response.status });
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData) || rawData.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty response from FastAPI' }, { status: 500 });
    }

    // Transform and validate the data
    const data: Book[] = rawData.map((item: any): Book => ({
      id: item._id || '',
      title: item.Title || '',
      author: item.authors || null,
      description: item.description || '',
      genres: item.categories || '',
      imageURL: item.image || null,
      previewLink: item.previewLink || null,
      publisher: item.publisher || null,
      publishedDate: item.publishedDate || null,
      ratingsCount: parseInt(item.ratings_count) || 0,
      bookId: parseInt(item.book_id) || 0,
      score: item.score || 0,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in POST /api/similar-books/select-book:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
