import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { askGroq } from "../services/groqService";
import { SYSTEM_PROMPT } from "../prompts/interviewPrompt";

import {
  speakText,
} from "../services/ttsService";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const navigate = useNavigate();


  const [
  isSpeaking,
  setIsSpeaking,
] = useState(false);

const [
  activeInterviewer,
  setActiveInterviewer,
] = useState("technical");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [messages, setMessages] = useState([]);

  const [questionCount, setQuestionCount] =
    useState(1);

  const [report, setReport] = useState(null);
 const [interviewType,
  setInterviewType] =
  useState("");

const [subject,
  setSubject] =
  useState("");

const [difficulty, setDifficulty] =
  useState("moderate");

const [resumeText,
  setResumeText] =
  useState("");
  
  
  const updateQuestion =
  async (response) => {
    const interviewerMatch =
      response.match(
        /\[(.*?)\]/
      );

    const interviewerName =
      interviewerMatch?.[1] ||
      "Technical Interviewer";

    const questionText =
      response
        .replace(
          /\[.*?\]/,
          ""
        )
        .trim();

    setInterviewer(
      interviewerName
    );

    setQuestion(
      questionText
    );

    // Active Avatar

    let speaker = "technical";

if (
  interviewerName
    .toLowerCase()
    .includes("technical")
) {
  speaker = "technical";
}
else if (
  interviewerName
    .toLowerCase()
    .includes("hr")
) {
  speaker = "hr";
}
else {
  speaker = "manager";
}

setActiveInterviewer(
  speaker
);
    try {
  speakText(
  questionText,
  speaker,

  () => {
    setIsSpeaking(true);
  },

  () => {
    setIsSpeaking(false);
  }
);
} catch (error) {
  console.log(error);
  setIsSpeaking(false);
}
  };

  const generateFinalReport = async (
    interviewMessages
  ) => {
    const conversation =
      interviewMessages
        .map(
          (m) =>
            `${m.role}: ${m.content}`
        )
        .join("\n");

   const reportPrompt = `
Analyze this interview professionally.

Scores MUST be between 0 and 100.

Return ONLY valid JSON.

{
  "technicalScore": 85,
  "communicationScore": 80,
  "confidenceScore": 78,

  "strengths": [],

  "weaknesses": [],

  "suggestions": [],

  "recommendation": "",

  "technicalBreakdown": {
    "problemSolving": "",
    "coreKnowledge": "",
    "practicalExperience": "",
    "codingConfidence": ""
  },

  "communicationBreakdown": {
    "clarity": "",
    "fluency": "",
    "grammar": ""
  }
}

Interview Conversation:

${conversation}
`;

    try {
      const response =
        await askGroq(reportPrompt);

      const cleaned = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
        JSON.parse(cleaned);

        console.log("FINAL REPORT:");
console.log(parsed);

      setReport(parsed);

      return parsed;
    } catch (error) {
      console.error(
        "Report Generation Error:",
        error
      );

      return null;
    }
  };

  const submitAnswer = async () => {
    try {
      if (!answer.trim()) return;

      const updatedMessages = [
        ...messages,
        {
          role: "assistant",
          content: question,
        },
        {
          role: "user",
          content: answer,
        },
      ];

      setMessages(updatedMessages);

      if (questionCount >= 10) {
        const finalReport =
  await generateFinalReport(
    updatedMessages
  );

if (finalReport) {
  navigate("/report");
}

        return;
      }

      const conversation =
        updatedMessages
          .map(
            (m) =>
              `${m.role}: ${m.content}`
          )
          .join("\n");

    let prompt = "";

if (
  interviewType ===
  "resume"
) {

  prompt = `
${SYSTEM_PROMPT}

Difficulty: ${difficulty}

Candidate Resume:

${resumeText}

Interview Conversation:

${conversation}

You are an experienced interviewer.

Generate questions from:

- Skills
- Projects
- Experience
- Internships
- Technologies mentioned in the resume.

Ask ONE ${difficulty} level question at a time.
`;

}
else {

  prompt = `
${SYSTEM_PROMPT}

Difficulty: ${difficulty}

Subject: ${subject}

Interview Conversation:

${conversation}

You are an expert ${subject} interviewer.

Ask ONE ${difficulty} level interview question ONLY from ${subject}.

Rules:
- Ask only one question.
- Increase difficulty gradually.
- Do not ask questions outside ${subject}.
`;

}

const response =
await askGroq(prompt);

     await updateQuestion(
  response
);

      setQuestionCount(
        (prev) => prev + 1
      );

      setAnswer("");
    } catch (error) {
      console.error(
        "Interview Error:",
        error
      );
    }
  };

  return (
    <InterviewContext.Provider
  value={{
    question,
    setQuestion,
    difficulty,
  setDifficulty,
 
    interviewType,
setInterviewType,

subject,
setSubject,

resumeText,
setResumeText,

    answer,
    setAnswer,

    interviewer,
    setInterviewer,

    messages,
    setMessages,

    questionCount,
    setQuestionCount,

    report,
    setReport,

    // NEW
    isSpeaking,
    setIsSpeaking,

    activeInterviewer,
    setActiveInterviewer,

    updateQuestion,

    submitAnswer,
  }}
>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(
    InterviewContext
  );
}