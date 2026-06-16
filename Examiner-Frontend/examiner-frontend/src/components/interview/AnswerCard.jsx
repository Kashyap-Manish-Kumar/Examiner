import {
  User,
  Check,
  Mic,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

import {
  transcribeAudio,
} from "../../services/whisperService";

export default function AnswerCard({
  answer,
  setAnswer,
  onSubmit,
}) {
  const mediaRecorderRef =
    useRef(null);

  const chunksRef = useRef([]);

  const [isListening, setIsListening] =
    useState(false);

  const [isProcessing, setIsProcessing] =
    useState(false);

  const startRecording =
    async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        const mediaRecorder =
          new MediaRecorder(
            stream
          );

        mediaRecorderRef.current =
          mediaRecorder;

        chunksRef.current = [];

        mediaRecorder.ondataavailable =
          (event) => {
            console.log(
              "Chunk size:",
              event.data.size
            );

            if (event.data.size > 0) {
              chunksRef.current.push(
                event.data
              );
            }
          };

        mediaRecorder.start(1000);

        setIsListening(true);

        console.log(
          "Recording Started"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const stopRecording =
    async () => {
      if (
        !mediaRecorderRef.current
      )
        return;

      console.log(
        "Stopping..."
      );

      return new Promise(
        (resolve) => {
          mediaRecorderRef.current.onstop =
            async () => {
              try {
                console.log(
                  "Recorder stopped"
                );

                console.log(
                  "Chunks:",
                  chunksRef.current.length
                );

                const audioBlob =
                  new Blob(
                    chunksRef.current,
                    {
                      type:
                        "audio/webm",
                    }
                  );

                console.log(
                  "Blob size:",
                  audioBlob.size
                );

                setIsListening(false);
                setIsProcessing(true);

                console.log(
                  "Sending audio to backend..."
                );

                const text =
                  await transcribeAudio(
                    audioBlob
                  );

                console.log(
                  "Whisper Output:",
                  text
                );

                setAnswer(text);

                setIsProcessing(false);

                mediaRecorderRef.current.stream
                  .getTracks()
                  .forEach((track) =>
                    track.stop()
                  );

                resolve();
              } catch (
                error
              ) {
                console.log(
                  error
                );

                setIsListening(false);
                setIsProcessing(false);
              }
            };

          mediaRecorderRef.current.stop();
        }
      );
    };

  return (
    <div
      className="
        rounded-lg
        border
        border-emerald-400/10
        bg-gradient-to-br
        from-[#0C2458]
        via-[#081B45]
        to-[#05132F]
        px-5
        py-4
        shadow-md
        transition-all
        duration-300
        hover:border-emerald-400/20
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className="
              h-10
              w-10
              rounded-md
              bg-gradient-to-br
              from-emerald-500
              to-green-600
              flex
              items-center
              justify-center
              shrink-0
              shadow-md
            "
          >
            <User
              size={18}
              className="text-white"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white leading-none">
              Answer
            </h3>

            <p className="text-sm text-slate-400 mt-1.5">
              Voice Response
            </p>
          </div>
        </div>

        {/* Mic Status */}
        <div className="flex flex-col items-center gap-2">
          <Mic
            size={18}
            onClick={() => {
              if (isProcessing)
                return;

              if (isListening) {
                stopRecording();
              } else {
                startRecording();
              }
            }}
            className={`
              cursor-pointer
              ${
                isListening
                  ? "text-red-400 animate-pulse"
                  : isProcessing
                  ? "text-yellow-400 animate-spin"
                  : "text-green-400"
              }
            `}
          />

          <div
            className="
              flex
              items-center
              gap-1
              px-2
              py-1
              rounded-md
              bg-emerald-500/10
              border
              border-emerald-400/10
            "
          >
            <Check
              size={10}
              className="text-emerald-400"
            />

            <span
              className="
                text-[11px]
                font-medium
                text-emerald-300
              "
            >
              {isListening
                ? "Recording"
                : isProcessing
                ? "Processing..."
                : "Ready"}
            </span>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Click the mic to start/stop recording
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 my-4" />

      {/* Answer Content */}
      <textarea
        value={answer}
        onChange={(e) =>
          setAnswer(
            e.target.value
          )
        }
        placeholder="Type your answer..."
        className="
          w-full
          h-24
          bg-transparent
          text-white
          outline-none
          resize-none
        "
      />

      <button
        type="button"
        onClick={() => {
          onSubmit?.();
          setAnswer("");
        }}
        className="
          mx-auto
          mt-0
          flex
          items-center
          justify-center
          px-2
          py-1
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-green-600
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-emerald-500/30
          hover:from-emerald-400
          hover:to-green-500
          active:scale-95
        "
      >
        Submit Answer
      </button>
    </div>
  );
}