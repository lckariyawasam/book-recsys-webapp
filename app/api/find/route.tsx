import { NextResponse, NextRequest } from "next/server";
import {readFileSync} from 'fs';
import path from 'path';
import { parse } from 'csv-parse'; // Import the parse function from csv-parse



const fastapi_url = process.env.FASTAPI_URL;
const booksFilePath = path.resolve('app/_csv/books.csv');

export async function POST(request : NextRequest) {
    const { title, k} = await request.json();

    const booksData = readFileSync(booksFilePath, 'utf-8');
    const books_data = booksData.split('\n').map(line => line.split(','));


    const response = await fetch(`${fastapi_url}/find_similar_book_by_title/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, k }),
      });

    const data = await response.json();

    const matches = data['matches'];
    
    const searchResults = matches.map((match: any) => {
        const book = books_data.find((book: any) => book[0] === match['id']);
        return {
            id: book?.[0] ?? 'Unknown ID',
            title: book?.[1] ?? 'Unknown Title',
            author: book?.[2] ?? 'Unknown Author',
            score: match['score'] ?? 'Unknown Score',
        };});

    console.log('Search results:', searchResults);
    return NextResponse.json(searchResults);
 }