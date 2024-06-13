import { signRSA } from "./rsa";

export async function sign(
  image: Blob,
  privateKey: string,
  method: string
): Promise<Blob> {
  if (method === "rsa") {
    console.log("Signing image using RSA");
    return await signRSA(image, privateKey);
  } else {
    throw new Error(`Invalid method: ${method}`);
  }
}
