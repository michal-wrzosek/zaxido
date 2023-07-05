import { NextResponse } from 'next/server';

let counter = 0;

export async function GET() {
  counter++;

  return NextResponse.json({ counter });
}
