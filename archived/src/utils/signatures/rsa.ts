import { KeyObject, createSign, createVerify } from "crypto";

export async function signRSA(image: Blob, privKey: KeyObject): Promise<Blob> {
  const imageString = await image.text();

  const sign = createSign("RSA-SHA256");
  sign.write(imageString);
  sign.end();
  const signature = sign.sign(privKey);
  console.log("signature", signature);

  // Concatenate the signature with the image
  const encrypted = new Uint8Array();
  encrypted.set(new Uint8Array(signature), 0);
  encrypted.set(
    new Uint8Array(await image.arrayBuffer()),
    signature.byteLength
  );

  return new Blob([encrypted]);
  // return image;
}

export async function verifyRSA(image: Blob, pubKey: string): Promise<boolean> {
  // Extract the public key from the PEM string
  const key = await crypto.subtle.importKey(
    "spki",
    new TextEncoder().encode(pubKey),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["decrypt"]
  );

  // Decrypt the image using the RSA key
  const decrypted = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    await image.arrayBuffer()
  );

  // Hash the image using SHA-256
  const hashed = await crypto.subtle.digest(
    "SHA-256",
    await image.arrayBuffer()
  );

  // Compare the decrypted image with the hashed image
  return (
    hashed.byteLength === decrypted.byteLength &&
    new Uint8Array(hashed).every(
      (value, index) => value === new Uint8Array(decrypted)[index]
    )
  );
}
