import generateHuggingFaceImage from "@/utils/generate-image/hugging-face";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const start = Date.now();

  const req = await request.json();

  const blob = await generateHuggingFaceImage(
    "https://api-inference.huggingface.co/models/Corcelio/mobius",
    JSON.stringify(req.prompt)
  );

  const headers = new Headers();
  headers.set("Content-Type", "image/*");

  const end = Date.now();
  console.log(`Request took ${end - start}ms`);

  return new NextResponse(blob, { status: 200, statusText: "OK", headers });
}
