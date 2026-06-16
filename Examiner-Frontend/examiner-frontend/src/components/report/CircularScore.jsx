export default function CircularScore({
  score,
  color = "#7C3AED",
}) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">

      {/* Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute w-36 h-36 rounded-full bg-cyan-200/30 blur-2xl" />

      <div className="relative w-44 h-44">

        {/* Decorative Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-100 via-white to-cyan-100 shadow-lg" />

        {/* Progress Ring */}
        <svg
          className="relative w-full h-full -rotate-90"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="12"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${color}40)`,
            }}
          />
        </svg>

        {/* Inner Content */}
        <div
          className="
            absolute
            inset-5
            rounded-full
            bg-gradient-to-br
            from-white
            via-violet-50
            to-cyan-50
            border
            border-white
            shadow-lg
            flex
            flex-col
            items-center
            justify-center
          "
        >

          {/* Badge */}
          <div
            className="
              absolute
              top-3
              px-3
              py-1
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-cyan-500
              text-white
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              shadow-md
            "
          >
            AI Score
          </div>

          {/* Score */}
          <div className="flex items-end gap-1 mt-3">

            <span
              className="
                text-4xl
                font-black
                leading-none
                bg-gradient-to-r
                from-violet-700
                to-cyan-600
                bg-clip-text
                text-transparent
              "
            >
              {score}
            </span>

            <span className="text-xs font-semibold text-slate-400 mb-1">
              /100
            </span>

          </div>

          {/* Label */}
          <p
            className="
              mt-1
              text-[10px]
              font-bold
              text-slate-500
              uppercase
              tracking-[0.18em]
            "
          >
            Overall Score
          </p>

        </div>

      </div>

    </div>
  );
}