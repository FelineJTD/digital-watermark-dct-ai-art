export async function signRsa(image: Blob, key: string): Promise<Blob> {
  // Convert the image to a Uint8Array
  const imageArray = new Uint8Array(await image.arrayBuffer());

  // Create a new TextEncoder
  const encoder = new TextEncoder();

  // Encode the key as Uint8Array
  const keyArray = encoder.encode(key);

  // Create a new CryptoKey object from the keyArray
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyArray,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );

  // Encrypt the image using the cryptoKey
  const encryptedArrayBuffer = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    cryptoKey,
    imageArray
  );

  // Convert the encryptedArrayBuffer to a Blob
  const encryptedBlob = new Blob([encryptedArrayBuffer], { type: image.type });

  return encryptedBlob;
}

export async function verifyRsa(image: Blob, key: string): Promise<Blob> {
  // Convert the image to a Uint8Array
  const imageArray = new Uint8Array(await image.arrayBuffer());

  // Create a new TextEncoder
  const encoder = new TextEncoder();

  // Encode the key as Uint8Array
  const keyArray = encoder.encode(key);

  // Create a new CryptoKey object from the keyArray
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyArray,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );

  // Decrypt the image using the cryptoKey
  const decryptedArrayBuffer = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    cryptoKey,
    imageArray
  );

  // Convert the decryptedArrayBuffer to a Blob
  const decryptedBlob = new Blob([decryptedArrayBuffer], { type: image.type });

  return decryptedBlob;
}
