export async function extractResume(
  file
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/extract-resume`,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {
    throw new Error(
      "Resume extraction failed"
    );
  }

  const data =
    await response.json();

  return data.text;
}