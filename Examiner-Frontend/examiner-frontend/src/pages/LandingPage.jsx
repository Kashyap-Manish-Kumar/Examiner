import LandingSidebar from "../components/landing/LandingSidebar";
import HeroSection from "../components/landing/HeroSection";
import RoomSection from "../components/landing/RoomSection";
import { useState } from "react";

export default function LandingPage() {
  return (
    <div className="bg-[#EEF2F7] min-h-screen p-2">

      <div className="flex h-[98vh] rounded-[28px] overflow-hidden border border-slate-300 shadow-xl">

        {/* Left Sidebar */}
         
        <LandingSidebar />
        

        {/* Right Content */}
        <div className="flex-1 flex flex-col bg-white">

          {/* Top Hero */}
          <div className="h-[35%] border-b border-slate-200">
            <HeroSection />
          </div>

          {/* Bottom Interview Room */}
          <div className="h-[65%]">
            <RoomSection />
          </div>

        </div>

      </div>

    </div>
  );
}