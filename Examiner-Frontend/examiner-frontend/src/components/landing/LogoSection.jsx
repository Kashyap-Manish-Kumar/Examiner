import logo from "../../assets/logo.png";

export default function LogoSection() {
  return (
    <div className=" flex justify-center">
      <img
        src={logo}
        alt="Examiner Logo"
        className="
          w-full
          max-w-[70%]
          object-contain
          select-none

        "
        draggable="false"
      />
    </div>
  );
}