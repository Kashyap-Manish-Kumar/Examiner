export default function FooterStat({
  title,
  value,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">

      <p className="text-slate-500 text-sm">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-slate-800 mt-2">
        {value}
      </h3>

    </div>
  );
}