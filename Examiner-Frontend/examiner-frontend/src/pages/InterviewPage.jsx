import LandingSidebar from "../components/landing/LandingSidebar";
import InterviewContent from "../components/interview/InterviewContent";

export default function InterviewPage() {
  return (
    <div className="bg-[#EEF2F7] min-h-screen p-2">
      <div className="flex h-[98vh] rounded-[28px] overflow-hidden  ">

        {/* Left Sidebar - 30% */}
        <div className="w-[30%] min-w-[380px]">
          <LandingSidebar interviewMode={true} />
        </div>

        {/* Right Interview Area - 70% */}
        <div className="w-[70%] p-0 p">
          <InterviewContent />
        </div>

      </div>
    </div>
  );
}