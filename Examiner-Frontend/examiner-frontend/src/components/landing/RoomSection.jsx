import { useRef, useState } from "react";
import heroVideo from "../../assets/hero-video.mp4";
import { Volume2, VolumeX } from "lucide-react";

export default function RoomSection() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="w-full h-full p-0 mt-2 mb-2 ">
      <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-slate-200 bg-black">

        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Mute / Unmute Button */}

       <button
  onClick={toggleMute}
  className="
    absolute
    bottom-4
    right-4
    w-12
    h-12
    rounded-full
    bg-black/60
    text-white
    flex
    items-center
    justify-center
    hover:bg-black/80
    transition
  "
>
  {isMuted ? (
    <VolumeX size={20} />
  ) : (
    <Volume2 size={20} />
  )}
</button>

      </div>
    </div>
  );
}