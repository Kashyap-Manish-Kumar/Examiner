import heroBanner from "../../assets/hero-ou.png";

export default function HeroSection() {
  return (
    <div className="w-full h-full p-0">
      <div className="h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        <img
          src={heroBanner}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}