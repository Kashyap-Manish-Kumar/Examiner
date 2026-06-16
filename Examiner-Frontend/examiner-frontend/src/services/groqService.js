import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function askGroq(prompt) {
  try {
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,
      });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
}