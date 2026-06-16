import { useEffect } from "react";

import InterviewHeader from "./InterviewHeader";
import AvatarPanel from "../avatar/AvatarPanel";

import { askGroq } from "../../services/groqService";
import { SYSTEM_PROMPT } from "../../prompts/interviewPrompt";

import { useInterview } from "../../context/InterviewContext";

export default function InterviewContent() {
  const {
  updateQuestion,
  interviewType,
  subject,
  resumeText,
    difficulty,
} = useInterview();
  useEffect(() => {
    generateFirstQuestion();
  }, []);

  const generateFirstQuestion =
    async () => {
      try {
        let prompt = "";

if (
  interviewType ===
  "resume"
) {

  prompt = `
${SYSTEM_PROMPT}

Interview Difficulty:
${difficulty}

Candidate Resume:

${resumeText}

You are an experienced interviewer Generate ${difficulty} level interview questions.
.

Analyze the resume and ask the first interview question based on:

- Skills
- Projects
- Experience
- Technologies
`;

} else {

  prompt = `
${SYSTEM_PROMPT}
Interview Difficulty:
${difficulty}

Subject:
${subject}
You are an experienced interviewer Generate ${difficulty} level interview questions.

Start interview for ${subject}.
`;

}

const response =
  await askGroq(
    prompt
  );
        await updateQuestion(
          response
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="h-full flex flex-col gap-2">
      <InterviewHeader />
      <AvatarPanel />
    </div>
  );
}