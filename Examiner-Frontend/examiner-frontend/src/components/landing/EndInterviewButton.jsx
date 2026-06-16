import { LogOut } from "lucide-react";

export default function EndInterviewButton() {
  return (
    <button
      className="
        w-full
        h-[55px]
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        text-white
        font-semibold
        text-xl
        flex
        items-center
        justify-center
        gap-3
        shadow-lg
      "
    >
      <LogOut size={24} />
      End Interview
    </button>
  );
}