export async function extractResume(
  file
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  console.log(
    "API URL:",
    import.meta.env.VITE_API_URL
  );

  console.log(
    "Request URL:",
    `${import.meta.env.VITE_API_URL}/extract-resume`
  );

  const response =
    await fetch(
      `${import.meta.env.VITE_API_URL}/extract-resume`,
      {
        method: "POST",
        body: formData,
      }
    );

  console.log(
    "Response Status:",
    response.status
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