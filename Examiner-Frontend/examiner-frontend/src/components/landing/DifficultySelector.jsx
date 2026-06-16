export default function DifficultySelector({
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="flex justify-center gap-10 text-white mt-8">

      <label className="flex items-center gap-3 cursor-pointer text-large font-semibold">
        <input
          type="radio"
          name="difficulty"
          className="w-5 h-5"
          checked={difficulty === "hard"}
          onChange={() =>
            setDifficulty("hard")
          }
        />
        Hard
      </label>

      <label className="flex items-center gap-3 cursor-pointer text-large font-semibold">
        <input
          type="radio"
          name="difficulty"
          className="w-5 h-5"
          checked={difficulty === "moderate"}
          onChange={() =>
            setDifficulty("moderate")
          }
        />
        Moderate
      </label>

      <label className="flex items-center gap-3 cursor-pointer text-large font-semibold">
        <input
          type="radio"
          name="difficulty"
          className="w-5 h-5"
          checked={difficulty === "easy"}
          onChange={() =>
            setDifficulty("easy")
          }
        />
        Easy
      </label>

    </div>
  );
}