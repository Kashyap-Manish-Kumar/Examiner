export default function ModeSelector({
  mode,
  setMode,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">

      <button
        onClick={() => setMode("resume")}
        className={`
          py-4
          text-lg
          rounded-2xl
          border
          border-blue-500
          flex
          items-center
          justify-center
          gap-1
          text-white
          transition
          ${mode === "resume"
            ? "bg-blue-900/40"
            : "bg-transparent"}
        `}
      >
        <div
          className={`
            w-5 h-5 rounded-full border-4
            ${mode === "resume"
              ? "border-blue-400 bg-white"
              : "border-slate-400"}
          `}
        />
        Resume Based
      </button>

      <button
        onClick={() => setMode("subject")}
        className={`
          py-4
          text-lg
          rounded-2xl
          border
          border-blue-500
          flex
          items-center
          justify-center
          gap-1
          text-white
          transition
          ${mode === "subject"
            ? "bg-blue-900/40"
            : "bg-transparent"}
        `}
      >
        <div
          className={`
            w-5 h-5 rounded-full border-4
            ${mode === "subject"
              ? "border-blue-400 bg-white"
              : "border-slate-400"}
          `}
        />
        Subject Based
      </button>

    </div>
  );
}