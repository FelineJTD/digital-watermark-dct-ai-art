import generateHuggingFaceImage from "@/utils/generate-image/hugging-face";
import { sign } from "@/utils/signatures/sign";
import { NextRequest, NextResponse } from "next/server";
import { generateKeyPairSync } from "crypto";

export async function POST(request: NextRequest) {
  console.log("Generating image with the Stable Diffusion model");
  const start = Date.now();

  const req = await request.json();

  const blob = await generateHuggingFaceImage(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    JSON.stringify(req.prompt)
  );

  // // Generate RSA key pair
  // const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  //   modulusLength: 2048
  // });

  // console.log("privateKey", privateKey);
  // // Cast the public key to a string
  // const privateKeyString = privateKey.export({
  //   type: "pkcs8",
  //   format: "pem"
  // });
  // console.log("privateKeyString", privateKeyString);

  // // Get private key as
  // // const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  // // Sign the image using the RSA private key
  // const signedBlob = await sign(blob, privateKey, "rsa");
  // console.log("signedBlob", signedBlob);

  const headers = new Headers();
  headers.set("Content-Type", "image/*");

  const end = Date.now();
  console.log(`Request took ${end - start}ms`);

  return new NextResponse(blob, {
    status: 200,
    statusText: "OK",
    headers
  });
}
