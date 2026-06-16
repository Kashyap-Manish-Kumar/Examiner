export function speakText(
  text,
  speaker,
  onStart,
  onEnd
) {
  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  const voices =
    speechSynthesis.getVoices();

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  // LEFT AVATAR (Female HR)
  if (speaker === "hr") {

    utterance.voice =
      voices.find(v =>
        v.name.includes("Zira") ||
        v.name.includes("Samantha") ||
        v.name.includes("Female")
      ) || voices[0];

    utterance.pitch = 1.3;
    utterance.rate = 1.0;
  }

  // MIDDLE AVATAR (Male Technical)
  else if (speaker === "technical") {

    utterance.voice =
      voices.find(v =>
        v.name.includes("David") ||
        v.name.includes("Male")
      ) || voices[0];

    utterance.pitch = 0.95;
    utterance.rate = 1.0;
  }

  // RIGHT AVATAR (Female Manager)
  else if (speaker === "manager") {

    utterance.voice =
      voices.find(v =>
        v.name.includes("Zira") ||
        v.name.includes("Samantha") ||
        v.name.includes("Female")
      ) || voices[0];

    utterance.pitch = 1.15;
    utterance.rate = 0.95;
  }

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = () => {
    onEnd?.();
  };

  speechSynthesis.speak(utterance);

  return utterance;
}