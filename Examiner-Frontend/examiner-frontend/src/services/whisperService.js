export async function transcribeAudio(audioBlob) {
  try {
    const formData = new FormData();

    formData.append(
      "file",
      audioBlob,
      "audio.webm"
    );

    const API_URL =
      import.meta.env.VITE_API_URL ||
      "http://127.0.0.1:8000";

    console.log(
      "Sending request to:",
      `${API_URL}/transcribe`
    );

    const response = await fetch(
      `${API_URL}/transcribe`,
      {
        method: "POST",
        body: formData,
      }
    );

    console.log(
      "Response status:",
      response.status
    );

    const data =
      await response.json();

    console.log(
      "Backend response:",
      data
    );

    return data.text || "";
  } catch (error) {
    console.error(
      "Whisper Error:",
      error
    );

    return "";
  }
}