export default function SubjectInput({
  selectedSubject,
  setSelectedSubject,
}) {
  return (
    <div className="border border-blue-700 rounded-2xl p-6 mt-8">

      <select
        value={selectedSubject}
        onChange={(e) =>
          setSelectedSubject(
            e.target.value
          )
        }
        className="
          w-full
          p-4
          rounded-xl
          bg-slate-900
          border
          border-blue-700
          text-white
          outline-none
        "
      >
        <option value="">
          Select Subject
        </option>

        <option value="React">
          React
        </option>

        <option value="Java">
          Java
        </option>

        <option value="Python">
          Python
        </option>

        <option value="DBMS">
          DBMS
        </option>

        <option value="DSA">
          DSA
        </option>

        <option value="OOP">
          OOP
        </option>
      </select>

      <p className="text-gray-400 mt-6 text-center">
        Choose a subject for interview
      </p>
    </div>
  );
}