import { useInterview } from "../context/InterviewContext";

import ReportHeader from "../components/report/ReportHeader";
import ScoreCard from "../components/report/ScoreCard";
import AnalyticsCard from "../components/report/AnalyticsCard";
import SuggestionsCard from "../components/report/SuggestionsCard";
import VerdictCard from "../components/report/VerdictCard";
import FooterStat from "../components/report/FooterStat";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const confidenceData = [
  { time: "0m", value: 65 },
  { time: "2m", value: 72 },
  { time: "4m", value: 80 },
  { time: "6m", value: 85 },
  { time: "8m", value: 88 },
];

const stressData = [
  { time: "0m", value: 40 },
  { time: "2m", value: 55 },
  { time: "4m", value: 35 },
  { time: "6m", value: 28 },
  { time: "8m", value: 20 },
];

const speakingData = [
  { time: "0m", value: 30 },
  { time: "2m", value: 60 },
  { time: "4m", value: 75 },
  { time: "6m", value: 68 },
  { time: "8m", value: 82 },
];

export default function ReportPage() {
  const { report } = useInterview();

  if (!report) {
    return (
      <div className="p-10 text-2xl">
        No Report Generated
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#c9dff6] p-3">
      {/* Header */}
      <ReportHeader />

      {/* Score Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">

        <ScoreCard
          title="Technical Score"
          score={report.technicalScore}
          color="#106EBE"
        >
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Problem Solving Ability</span>
              <span className="text-green-600 font-medium">
                {report.technicalBreakdown?.problemSolving}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Core Knowledge</span>
              <span className="text-orange-500 font-medium">
                {report.technicalBreakdown?.coreKnowledge}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Practical Experience</span>
              <span className="text-green-600 font-medium">
                {report.technicalBreakdown?.practicalExperience}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Coding Confidence</span>
              <span className="text-orange-500 font-medium">
                {report.technicalBreakdown?.codingConfidence}
              </span>
            </div>

          </div>
        </ScoreCard>

        <ScoreCard
          title="Confidence Score"
          score={report.confidenceScore}
          color="#16A34A"
        >
          <div className="space-y-3 text-sm">

            <p>✓ Maintained eye contact consistently</p>

            <p>✓ Answered without panic</p>

            <p>✓ Voice stability remained strong</p>

            <p>✓ Good facial confidence</p>

          </div>
        </ScoreCard>

        <ScoreCard
          title="Communication Score"
          score={report.communicationScore}
          color="#7C3AED"
        >
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Speaking Clarity</span>
              <span className="text-orange-500">
                {report.communicationBreakdown?.clarity}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Sentence Formation</span>
              <span className="text-green-600">
                {report.communicationBreakdown?.fluency}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Fluency</span>
              <span className="text-orange-500">
                {report.communicationBreakdown?.fluency}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Grammar Usage</span>
              <span className="text-green-600">
                {report.communicationBreakdown?.grammar}
              </span>
            </div>

          </div>
        </ScoreCard>

      </div>

      {/* Analytics */}

      <div className="mt-5 bg-blue-50 border border-slate-200 rounded-2xl p-5">

        <h2 className="text-2xl font-bold text-slate-800">
          Emotion & Activity Analytics
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Emotion Graph Components
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mt-4">

          {/* Graph 1 */}

          <AnalyticsCard title="Confidence Timeline">

            <div className="h-[220px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={confidenceData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </AnalyticsCard>

          {/* Graph 2 */}

          <AnalyticsCard title="Stress Level">

            <div className="h-[220px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={stressData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#EF4444"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </AnalyticsCard>

          {/* Graph 3 */}

          <AnalyticsCard title="Speaking Activity">

            <div className="h-[220px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={speakingData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="time" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#F97316"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </AnalyticsCard>

          {/* Right Panel */}

          <div className="bg-blue-100 border border-slate-200 rounded-xl p-4">

            <h3 className="font-semibold text-blue-700 mb-4">
              Graph Summary
            </h3>

            <p className="text-lg text-blue-700">
              The confidence graph shows a steady increase, indicating growing self-assurance. The stress levels peaked around the 4-minute mark but decreased towards the end, suggesting effective stress management. Speaking activity was consistent, with a noticeable boost in the middle, reflecting increased engagement.
            </p>

          </div>

        </div>

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">

        <div>
          <SuggestionsCard
            suggestions={report.suggestions}
          />
        </div>

        <div className="xl:col-span-2">
          <VerdictCard
            report={report}
          />
        </div>

      </div>

      {/* Footer */}

    </div>
  );
}