import ResumeUpload from "./ResumeUpload";
import SubjectInput from "./SubjectInput";

export default function DynamicInputBox({
  mode,
  resumeFile,
  setResumeFile,
  selectedSubject,
  setSelectedSubject,
}) {
  return (
    <>
      {mode === "resume" ? (
        <ResumeUpload
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
        />
      ) : (
        <SubjectInput
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      )}
    </>
  );
}