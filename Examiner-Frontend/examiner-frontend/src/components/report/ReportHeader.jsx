import {
  CalendarDays,
  UserCircle2,
} from "lucide-react";

import symbol from "../../assets/symbol.png";

export default function ReportHeader() {
  return (
    <div className="bg-gradient-to-r from-[#050B5B] to-[#0A146B] text-white rounded-xl p-6 flex justify-between items-center">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 bg-transparent  flex items-center justify-center overflow-hidden">
  <img
    src={symbol}
    alt="AI Assistant"
    className="w-16 h-16 object-contain"
  />
</div>
        <div>

          <h1 className="text-4xl font-bold">
            Examiner Report
          </h1>

          <p className="text-blue-100">
            Comprehensive Candidate Evaluation
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-8">

        <div className="flex items-center gap-3">

          <UserCircle2 size={42} />

          <div>

            <p className="text-blue-100 text-sm">
              Candidate Name
            </p>

            <p className="font-semibold">
                Prospects
            </p>

          </div>

        </div>

        <div className="w-px h-12 bg-white/20" />

        <div className="flex items-center gap-3">

          <CalendarDays size={35} />

          <div>

            <p className="text-blue-100 text-sm">
              Interview Date
            </p>

            <p className="font-semibold">
              May 20, 2025
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}