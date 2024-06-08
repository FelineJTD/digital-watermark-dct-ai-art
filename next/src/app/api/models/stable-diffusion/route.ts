import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "Hello, World!" });
}

export async function POST(request: NextRequest) {
  const req = await request.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
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

  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
