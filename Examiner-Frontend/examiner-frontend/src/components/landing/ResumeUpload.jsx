import { Upload } from "lucide-react";

export default function ResumeUpload({
  resumeFile,
  setResumeFile,
}) {
  return (
    <div className="border border-blue-700 rounded-2xl p-4 mt-6">

      <div className="border-2 border-dashed border-blue-500 rounded-xl p-4 text-center">

        <Upload
          size={50}
          className="mx-auto text-blue-400"
        />

        <p className="text-gray-300 mt-4">
          Upload PDF Resume
        </p>

        <input
          type="file"
          accept=".pdf"
          className="hidden"
          id="resume-upload"
          onChange={(e) => {
            if (e.target.files[0]) {
              setResumeFile(
                e.target.files[0]
              );
            }
          }}
        />

        <label
          htmlFor="resume-upload"
          className="
            mt-6
            inline-block
            bg-blue-600
            px-4
            py-2
            rounded-lg
            text-white
            cursor-pointer
          "
        >
          Choose File
        </label>

        {resumeFile && (
          <p className="text-green-400 mt-4">
            ✓ {resumeFile.name}
          </p>
        )}

      </div>

    </div>
  );
}