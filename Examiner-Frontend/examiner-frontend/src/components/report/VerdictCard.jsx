import CircularScore from "./CircularScore";

export default function VerdictCard({
  report,
}) {
  return (
    <div className="bg-blue-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm">

      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4">

        <h2 className="text-2xl font-bold">
          Final AI Verdict
        </h2>

      </div>

      <div className="p-6">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Score */}

          <div className="flex flex-col items-center">

            <CircularScore
              score={
                Math.round(
                  (
                    report.technicalScore +
                    report.communicationScore +
                    report.confidenceScore
                  ) / 3
                )
              }
              color="#7C3AED"
            />

            <p className="mt-3 font-medium text-slate-700">
              Overall Performance
            </p>

          </div>

          {/* Results */}

          <div className="border border-slate-200 bg-violet-200 rounded-lg p-4">

            <h3 className="font-bold text-lg mb-4 text-center">
              Interview Result
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Technical Knowledge</span>
                <span className="text-green-600 font-semibold">
                  Good
                </span>
              </div>

              <div className="flex justify-between">
                <span>Confidence Level</span>
                <span className="text-green-600 font-semibold">
                  Excellent
                </span>
              </div>

              <div className="flex justify-between">
                <span>Communication Skills</span>
                <span className="text-orange-500 font-semibold">
                  Moderate
                </span>
              </div>

              <div className="flex justify-between">
                <span>Behavioral Analysis</span>
                <span className="text-green-600 font-semibold">
                  Positive
                </span>
              </div>

            </div>

          </div>

          {/* Recommendation */}

          <div className="bg-blue-900 border border-slate-200 rounded-xl p-4">

            <h3 className="font-bold text-lg text-white mb-3">
              Final Recommendation
            </h3>

            <p className="text-white text-sm leading-7">
              {report.recommendation}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}