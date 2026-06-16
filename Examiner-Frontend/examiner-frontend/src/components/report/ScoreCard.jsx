import CircularScore from "./CircularScore";

export default function ScoreCard({
  title,
  score,
  color,
  children,
}) {
  return (
    <div
      className="
        bg-blue-50
        border
        border-slate-200
        rounded-lg
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}
     {/* Header */}
{/* Header */}
<div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-300  to-blue-50">

        <div className="flex items-center justify-between">

          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
              tracking-tight
            "
          >
            {title}
          </h2>

          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />

        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="flex items-center gap-8">

          {/* Score */}
          <div className="shrink-0">
            <CircularScore
              score={score}
              color={color}
            />
          </div>

          {/* Analysis */}
          <div
            className="
              flex-1
              pl-6
              border-l
              border-slate-100
              text-slate-700
              leading-7
            "
          >
            {children}
          </div>

        </div>

      </div>
    </div>
  );
}