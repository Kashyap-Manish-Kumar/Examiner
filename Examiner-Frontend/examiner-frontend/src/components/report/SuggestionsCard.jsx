import { Sparkles } from "lucide-react";

export default function SuggestionsCard({
  suggestions = [],
}) {
  return (
    <div className="bg-[#1A2E63] border border-cyan-500/20 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-300" />
          <h2 className="text-white font-semibold text-lg">
            AI Suggestions
          </h2>
        </div>

        <span className="text-xs font-medium px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-200 border border-cyan-500/20">
          {suggestions.length} Suggestions
        </span>
      </div>

      {/* Table */}
      <div>
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="
              flex items-center
              gap-3
              px-5 py-3
              border-b border-white/5
              last:border-b-0
              hover:bg-white/5
              transition-colors
            "
          >
            <div className="w-6 text-emerald-400 font-semibold">
              ✓
            </div>

            <p className="text-slate-200 text-sm">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}