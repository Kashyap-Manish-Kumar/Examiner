import {
  Bot,
  Clock3,
} from "lucide-react";

export default function QuestionCard({
  question,
  interviewer,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-blue-400/15
        bg-gradient-to-br
        from-[#0D255F]
        via-[#081D4A]
        to-[#041537]
        px-5
        py-4
        shadow-md
      "
    >
      {/* Header */}
      <div className="flex items-start gap-4">

        {/* Icon */}
        <div
          className="
            h-11
            w-11
            rounded-lg
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            shrink-0
            shadow-md
          "
        >
          <Bot
            size={18}
            className="text-white"
          />
        </div>

        {/* Title */}
        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-semibold text-white">
              Question
            </h3>

            <div
              className="
                flex
                items-center
                gap-1
                px-2
                py-1
                rounded-md
                bg-blue-500/10
                border
                border-blue-400/10
              "
            >
              <Clock3
                size={12}
                className="text-blue-300"
              />

              <span className="text-xs text-blue-200">
                Just Now
              </span>
            </div>

          </div>

          <p className="text-sm text-slate-400 mt-1">
            {interviewer}
          </p>

        </div>

      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 my-4" />

      {/* Question */}
      <p className="text-slate-100 text-lg leading-relaxed">
        {question}
      </p>
    </div>
  );
}