import { ArrowRightLeft } from "lucide-react";

export default function StartButton({
  onClick,
  loading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        w-full
        mt-10
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        via-blue-500
        to-cyan-500
        text-white
        py-4
        text-xl md:text-2xl
        font-semibold
        flex
        items-center
        justify-center
        gap-4
        shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      <ArrowRightLeft size={34} />

      {loading
        ? "Preparing Interview..."
        : "Enter Interview"}
    </button>
  );
}