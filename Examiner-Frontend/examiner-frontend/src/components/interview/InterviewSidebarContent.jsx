import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";

export default function InterviewSidebarContent({
  question,
  answer,
  interviewer,
  setAnswer,
  onSubmit,
}) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <QuestionCard
        question={question}
        interviewer={interviewer}
      />

      <AnswerCard
        answer={answer}
        setAnswer={setAnswer}
        onSubmit={onSubmit}
      />
    </div>
  );
}