import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const start = Date.now();

  const req = await request.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/Corcelio/mobius",
    {
      headers: {
        Authorization: "Bearer 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"
      },
      method: "POST",
      body: JSON.stringify(req)
    }
  );

  const blob = await response.blob();
  const headers = new Headers();
  headers.set("Content-Type", "image/*");

  const end = Date.now();
  console.log(`Request took ${end - start}ms`);

  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
