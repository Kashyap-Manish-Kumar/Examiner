export default function AnalyticsCard({
  title,
  children,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-gradient-to-br
        from-slate-50
        via-white
        to-indigo-50
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
      "
    >
      {/* Decorative Blur */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sky-200/30 blur-3xl" />

      {/* Header */}
      <div className="relative mb-5 flex items-center gap-3">
        <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-indigo-600 to-sky-500" />

        <div>
          <h3
            className="
              text-lg
              font-bold
              text-slate-900
              tracking-tight
            "
          >
            {title}
          </h3>

          <p className="text-sm text-slate-600">
            AI-generated analysis insights
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}