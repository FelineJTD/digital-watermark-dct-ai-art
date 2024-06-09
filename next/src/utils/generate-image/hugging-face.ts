export default async function generateHuggingFaceImage(
  api: string,
  body: string
) {
  const response = await fetch(api, {
    headers: {
      Authorization: "Bearer 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"
    },
    method: "POST",
    body: body
  });

  const blob = await response.blob();

  return blob;
}
