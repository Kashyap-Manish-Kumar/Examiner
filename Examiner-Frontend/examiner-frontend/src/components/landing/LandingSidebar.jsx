import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoSection from "./LogoSection";
import ModeSelector from "./ModeSelector";
import DynamicInputBox from "./DynamicInputBox";
import DifficultySelector from "./DifficultySelector";
import StartButton from "./StartButton";
import EndInterviewButton from "./EndInterviewButton";
import InterviewSidebarContent from "../interview/InterviewSidebarContent";
import { useInterview } from "../../context/InterviewContext";

import {
  extractResume,
} from "../../services/resumeService";

export default function LandingSidebar({
  interviewMode = false,
}) {
  const [mode, setMode] = useState("resume");

  const [resumeFile, setResumeFile] =
    useState(null);

  const [selectedSubject, setSelectedSubject] =
    useState("");
    const [loading, setLoading] =
  useState(false);

  const navigate = useNavigate();

  const {
    question,
    answer,
    interviewer,
    setAnswer,
    submitAnswer,

    setInterviewType,
    setSubject,
    setResumeText,
    difficulty,
  setDifficulty,
  } = useInterview();

  const startInterview = async () => {
    if (mode === "resume" && !resumeFile) {
      alert("Please upload your resume first.");
      return;
    }

    if (
      mode === "subject" &&
      !selectedSubject
    ) {
      alert("Please select a subject.");
      return;
    }

    setInterviewType(mode);

    if (mode === "subject") {
      setSubject(selectedSubject);
    }

   if (mode === "resume") {

  setLoading(true);

  const extractedText =
    await extractResume(
      resumeFile
    );

  setResumeText(
    extractedText
  );

  setLoading(false);
}

    navigate("/interview");
  };

  return (
    <div className="p-0 mr-2 h-full">
      <div
        className="
          w-full
          max-w-[520px]
          h-full
          bg-gradient-to-b
          from-[#021B4F]
          to-[#031339]
          p-7
          rounded-3xl
          border
          border-slate-200
          flex
          flex-col
        "
      >
        <LogoSection />

        <div className="flex flex-col flex-1 justify-evenly">
          {interviewMode ? (
            <InterviewSidebarContent
              question={question}
              answer={answer}
              interviewer={interviewer}
              setAnswer={setAnswer}
              onSubmit={submitAnswer}
            />
          ) : (
            <>
              <ModeSelector
                mode={mode}
                setMode={setMode}
              />

              <DynamicInputBox
                mode={mode}
                resumeFile={resumeFile}
                setResumeFile={setResumeFile}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
              />

             <DifficultySelector
  difficulty={difficulty}
  setDifficulty={setDifficulty}
/>
            </>
          )}

          <div className="flex-1"></div>

          <div className="mt-auto">
            {interviewMode ? (
              <EndInterviewButton />
            ) : (
              <StartButton
                onClick={startInterview}
                 loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}