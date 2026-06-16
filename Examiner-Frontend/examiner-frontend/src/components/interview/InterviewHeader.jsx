import {
  Ear,
  Brain,
  PencilLine,
  Clock3,
} from "lucide-react";

export default function InterviewHeader() {
  const steps = [
    {
      icon: Ear,
      label: "Listen",
    },
    {
      icon: Brain,
      label: "Understand",
    },
    {
      icon: PencilLine,
      label: "Answer",
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        px-8
        py-4
        shadow-lg
        border
        border-blue-800/20
        bg-gradient-to-r
        from-[#021B4F]
        via-[#062A7A]
        to-[#0B4ED8]
      "
    >
      <div className="flex items-center justify-between">

        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-blue-200 animate-pulse" />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
              Live Interview
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-bold text-white">
            AI Interview In Progress
          </h2>

          <div className="mt-3 flex items-center gap-2 text-blue-100">
            <Clock3 size={16} />
            <span className="text-sm">
              Stay focused and answer confidently
            </span>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="flex items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/10
                      backdrop-blur-md
                      border
                      border-white/20
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      hover:bg-white/15
                      transition-all
                    "
                  >
                    <Icon
                      size={24}
                      className="text-white"
                    />
                  </div>

                  <span className="mt-2 text-sm font-semibold text-blue-100">
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="relative w-28 mx-5">
                    <div className="h-[2px] bg-blue-300/80" />

                    <div
                      className="
                        absolute
                        right-0
                        top-1/2
                        -translate-y-1/2
                        w-0
                        h-0
                        border-t-[7px]
                        border-t-transparent
                        border-b-[7px]
                        border-b-transparent
                        border-l-[12px]
                        border-l-blue-300
                      "
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}