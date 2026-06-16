import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import MultiAvatar from "./MultiAvatar";
import { useInterview } from "../../context/InterviewContext";
import { Text } from "@react-three/drei";


// ─── Layout constants ─────────────────────────────────────────────────────────
const FLOOR_Y  = 0;
const CHAIR_Y  = FLOOR_Y;
const AVATAR_Y = CHAIR_Y + 0.01;

// Avatars pulled much closer to camera (was -2.4 / -2.8)
const POS = {
  hr:   [-1.8,  AVATAR_Y, -1.2],
  tech: [ 0.0,  AVATAR_Y, -1.5],
  mgr:  [ 1.8,  AVATAR_Y, -1.2],
};

const ROT = {
  hr:   0.55,
  tech: 0,
  mgr:  -0.55,
};

const LOOK_TARGET = [0, 1.6, 6];

// ─── Office Chair ─────────────────────────────────────────────────────────────
function OfficeChair({ x, z, rotY = 0 }) {
  return (
    <group position={[x, CHAIR_Y, z]} rotation={[0, rotY, 0]}>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.09, 0.56]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.10, 0]} castShadow>
        <boxGeometry args={[0.54, 0.05, 0.52]} />
        <meshStandardMaterial color="#24243e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.60, -0.26]} castShadow>
        <boxGeometry args={[0.56, 0.76, 0.07]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.60, -0.23]} castShadow>
        <boxGeometry args={[0.50, 0.66, 0.05]} />
        <meshStandardMaterial color="#22223a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.04, -0.25]} castShadow>
        <boxGeometry args={[0.36, 0.20, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.033, 0.033, 1.0, 10]} />
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
      </mesh>
      {[0,1,2,3,4].map((i) => (
        <mesh key={i}
          position={[Math.sin((i/5)*Math.PI*2)*0.26, 0.06, Math.cos((i/5)*Math.PI*2)*0.26]}
          rotation={[0,(i/5)*Math.PI*2,0]}>
          <boxGeometry args={[0.30, 0.04, 0.04]} />
          <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {[0,1,2,3,4].map((i) => (
        <mesh key={i}
          position={[Math.sin((i/5)*Math.PI*2)*0.39, 0.04, Math.cos((i/5)*Math.PI*2)*0.39]}>
          <sphereGeometry args={[0.044, 8, 8]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
      ))}
      {[-1,1].map((s) => (
        <group key={s}>
          <mesh position={[s*0.34, 1.36, -0.10]}>
            <boxGeometry args={[0.05, 0.28, 0.04]} />
            <meshStandardMaterial color="#333" metalness={0.5} />
          </mesh>
          <mesh position={[s*0.34, 1.51, 0.01]}>
            <boxGeometry args={[0.05, 0.04, 0.26]} />
            <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Room + Table ─────────────────────────────────────────────────────────────
function RoomEnvironment() {
  return (
    <>

    {/* ── Back Wall — Corporate Styled ── */}
<mesh position={[0, 4, -5.2]} receiveShadow>
  <planeGeometry args={[22, 10]} />
  <meshStandardMaterial color="#e8f0f8" roughness={0.9} />
</mesh>

{/* Blue horizontal accent band across back wall */}
<mesh position={[0, 1.8, -5.18]}>
  <boxGeometry args={[22, 0.45, 0.02]} />
  <meshStandardMaterial color="#1a4a8a" roughness={0.5} emissive="#1a4a8a" emissiveIntensity={0.25} />
</mesh>

{/* Light blue band just above it */}
<mesh position={[0, 2.28, -5.18]}>
  <boxGeometry args={[22, 0.18, 0.02]} />
  <meshStandardMaterial color="#4a90d9" roughness={0.5} emissive="#4a90d9" emissiveIntensity={0.2} />
</mesh>

{/* ── Corporate Logo / Sign (center back wall) ── */}
<group position={[0, 5.2, -5.16]}>
  {/* Sign backing */}
  <mesh>
    <boxGeometry args={[3.2, 0.6, 0.04]} />
    <meshStandardMaterial color="#0d2d5e" roughness={0.4} emissive="#0d2d5e" emissiveIntensity={0.3} />
  </mesh>
  {/* Glowing dots */}
  {[-1.1, -0.6, 0, 0.6, 1.1].map((dx, i) => (
    <mesh key={i} position={[dx, 0, 0.04]}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshStandardMaterial color="#4a9eff" emissive="#4a9eff" emissiveIntensity={0.9} />
    </mesh>
  ))}
</group>

{/* ── Left side corporate panel ── */}
<group position={[-3.8, 3.8, -5.16]}>
  <mesh>
    <boxGeometry args={[1.4, 2.2, 0.03]} />
    <meshStandardMaterial color="#0d2d5e" roughness={0.6} />
  </mesh>
  {/* Top accent */}
  <mesh position={[0, 0.95, 0.02]}>
    <boxGeometry args={[1.4, 0.18, 0.02]} />
    <meshStandardMaterial color="#1e6abf" emissive="#1e6abf" emissiveIntensity={0.4} />
  </mesh>
  {/* Lines */}
  {[0.5, 0.2, -0.1, -0.4].map((ly, i) => (
    <mesh key={i} position={[0, ly, 0.02]}>
      <boxGeometry args={[1.0 - i * 0.1, 0.035, 0.01]} />
      <meshStandardMaterial color="#a0c4ff" roughness={1} />
    </mesh>
  ))}
  {/* Bottom accent */}
  <mesh position={[0, -0.95, 0.02]}>
    <boxGeometry args={[1.4, 0.18, 0.02]} />
    <meshStandardMaterial color="#1e6abf" emissive="#1e6abf" emissiveIntensity={0.4} />
  </mesh>
</group>

{/* ── Right side corporate panel ── */}
<group position={[3.8, 3.8, -5.16]}>
  <mesh>
    <boxGeometry args={[1.4, 2.2, 0.03]} />
    <meshStandardMaterial color="#0d2d5e" roughness={0.6} />
  </mesh>
  <mesh position={[0, 0.95, 0.02]}>
    <boxGeometry args={[1.4, 0.18, 0.02]} />
    <meshStandardMaterial color="#1e6abf" emissive="#1e6abf" emissiveIntensity={0.4} />
  </mesh>
  {[0.5, 0.2, -0.1, -0.4].map((ly, i) => (
    <mesh key={i} position={[0, ly, 0.02]}>
      <boxGeometry args={[1.0 - i * 0.1, 0.035, 0.01]} />
      <meshStandardMaterial color="#a0c4ff" roughness={1} />
    </mesh>
  ))}
  <mesh position={[0, -0.95, 0.02]}>
    <boxGeometry args={[1.4, 0.18, 0.02]} />
    <meshStandardMaterial color="#1e6abf" emissive="#1e6abf" emissiveIntensity={0.4} />
  </mesh>
</group>

{/* ── Whiteboard (kept, just repositioned slightly) ── */}
<group position={[0, 3.6, -5.12]}>
  <mesh castShadow>
    <boxGeometry args={[3.4, 1.9, 0.04]} />
    <meshStandardMaterial color="#f8f8f4" roughness={1} />
  </mesh>
  <mesh position={[0, 0, 0.03]}>
    <boxGeometry args={[3.54, 2.04, 0.02]} />
    <meshStandardMaterial color="#1a4a8a" metalness={0.3} roughness={0.4} />
  </mesh>
  {[0.5, 0.2, -0.15, -0.45].map((ly, i) => (
    <mesh key={i} position={[-0.7 + i * 0.06, ly, 0.04]}>
      <boxGeometry args={[1.3 - i * 0.15, 0.012, 0.005]} />
      <meshStandardMaterial color="#3388cc" roughness={1} />
    </mesh>
  ))}
</group>





      {/* Floor */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,FLOOR_Y,0]} receiveShadow>
        <planeGeometry args={[24,24]} />
        <meshStandardMaterial color="#b89a72" roughness={0.85} metalness={0.02} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 4, -5.2]} receiveShadow>
        <planeGeometry args={[22, 10]} />
        <meshStandardMaterial color="#d8d2c8" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI/2, 0]} position={[-9, 4, 0]} receiveShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial color="#d0cbc0" roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI/2, 0]} position={[9, 4, 0]} receiveShadow>
        <planeGeometry args={[24, 10]} />
        <meshStandardMaterial color="#d0cbc0" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 8.5, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#f2efea" />
      </mesh>

      {/* Ceiling light panels */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i}>
          <mesh rotation={[Math.PI/2, 0, 0]} position={[x, 8.44, -1.5]}>
            <planeGeometry args={[1.4, 0.38]} />
            <meshStandardMaterial color="#fffce0" emissive="#fffce0" emissiveIntensity={1.6} />
          </mesh>
          <pointLight position={[x, 8.0, -1.5]} intensity={5} color="#fff8e8" distance={12} decay={2} />
        </group>
      ))}

      {/* ── Interview Table — moved forward to match avatars ── */}
      <group position={[0, 0, 0.2]}>
        <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.4, 0.09, 1.6]} />
          <meshStandardMaterial color="#7a5535" roughness={0.35} metalness={0.04} />
        </mesh>
        <mesh position={[0, 1.005, 0]}>
          <boxGeometry args={[5.5, 0.03, 1.7]} />
          <meshStandardMaterial color="#5a3518" roughness={0.3} />
        </mesh>
        {[[-2.5,-0.72],[2.5,-0.72],[-2.5,0.72],[2.5,0.72]].map(([lx,lz],i) => (
          <mesh key={i} position={[lx, 0.5, lz]} castShadow>
            <boxGeometry args={[0.07, 1.0, 0.07]} />
            <meshStandardMaterial color="#4a2e10" />
          </mesh>
        ))}
        <mesh position={[0, 0.08, 0.72]}>
          <boxGeometry args={[5.1, 0.05, 0.05]} />
          <meshStandardMaterial color="#4a2e10" />
        </mesh>
        <mesh position={[0, 0.08, -0.72]}>
          <boxGeometry args={[5.1, 0.05, 0.05]} />
          <meshStandardMaterial color="#4a2e10" />
        </mesh>

        {/* Laptops */}
{[
  { lx: -1.1, rotY:  0.30 },
  { lx:  0.0, rotY:  0.00 },
  { lx:  1.1, rotY: -0.30 },
].map(({ lx, rotY }, i) => (
  <group key={i} position={[lx, 1.095, -0.18]} rotation={[0, rotY, 0]}>
    <mesh castShadow>
      <boxGeometry args={[0.50, 0.020, 0.34]} />
      <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.17, -0.14]} rotation={[-0.65, 0, 0]} castShadow>
      <boxGeometry args={[0.50, 0.32, 0.016]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.17, -0.131]} rotation={[-0.65, 0, 0]}>
      <planeGeometry args={[0.44, 0.27]} />
      <meshStandardMaterial color="#c0d8ff" emissive="#90b8ff" emissiveIntensity={0.4} />
    </mesh>
  </group>
))}

        {/* Name plates */}
        {[[-1.8, "HR"], [0, "TECH"], [1.8, "MGR"]].map(([nx, lbl], i) => (
          <mesh key={i} position={[nx, 1.095, 0.6]} castShadow>
            <boxGeometry args={[0.30, 0.056, 0.10]} />
            <meshStandardMaterial color="#c9a84c" metalness={0.6} roughness={0.3} />
          </mesh>
        ))}

        {/* Water glasses */}
        {[-2.3, 2.3].map((gx, i) => (
          <mesh key={i} position={[gx, 1.125, 0.3]} castShadow>
            <cylinderGeometry args={[0.037, 0.030, 0.13, 12]} />
            <meshStandardMaterial color="#a8d4f0" transparent opacity={0.45} roughness={0} />
          </mesh>
        ))}
      </group>

      {/* Chairs — matched to new avatar Z positions */}
    {/* Chairs — matched to ROT config */}
<OfficeChair x={-1.8} z={-1.38} rotY={ 0.55} />
<OfficeChair x={ 0.0} z={-1.68} rotY={ 0.00} />
<OfficeChair x={ 1.8} z={-1.38} rotY={-0.55} />
      {/* Whiteboard */}
     

      {/* Company sign */}
      <mesh position={[-3.6, 5.3, -5.1]}>
        <boxGeometry args={[1.7, 0.42, 0.02]} />
        <meshStandardMaterial color="#1a3a8a" roughness={0.5} emissive="#1a3a8a" emissiveIntensity={0.25} />
      </mesh>

      

      {/* Bookshelf */}
      <group position={[-8.7, 1.8, -2.5]} rotation={[0, Math.PI/2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 2.2, 0.28]} />
          <meshStandardMaterial color="#5a3e28" roughness={0.8} />
        </mesh>
        {["#c0392b","#2980b9","#27ae60","#f39c12","#8e44ad","#e67e22"].map((c,i) => (
          <mesh key={i} position={[(i-2.5)*0.3, 0.38+(i%2)*0.28, 0.12]} castShadow>
            <boxGeometry args={[0.22, 0.30, 0.04]} />
            <meshStandardMaterial color={c} roughness={0.8} />
          </mesh>
        ))}
      </group>

     
      {/* Baseboard */}
      <mesh position={[0, 0.06, -5.14]}>
        <boxGeometry args={[18, 0.12, 0.06]} />
        <meshStandardMaterial color="#c0b49a" roughness={0.8} />
      </mesh>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function InterviewRoom() {
  const {
    activeInterviewer,
    isSpeaking,
  } = useInterview();

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 1.95, 1.8],   // pulled very close to avatars
        fov: 50,
      }}
      style={{ background: "#1a1510" }}
    >
      <ambientLight intensity={1.0} />

      <directionalLight
        castShadow
        position={[0, 8, 5]}
        intensity={2.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />

      <pointLight position={[-3, 3.5, 5]} intensity={4} color="#fff0d8" distance={14} decay={2} />
      <pointLight position={[ 3, 3.5, 5]} intensity={3.5} color="#fff0d8" distance={14} decay={2} />
      <pointLight position={[0, 5, -3]} intensity={2.5} color="#ffe0b0" distance={10} decay={2} />

      <Environment preset="apartment" />

      <Suspense fallback={null}>
        <RoomEnvironment />

        <MultiAvatar
  path="/avatars/Hr.vrm"
  position={POS.hr}
  rotationY={ROT.hr}
  lookAtTarget={LOOK_TARGET}
  blinkOffset={0}
  breatheOffset={0}
  headSwaySpeed={0.44}
  active={
    activeInterviewer === "hr"
  }
  isSpeaking={
    activeInterviewer === "hr" &&
    isSpeaking
  }
/>


       <MultiAvatar
  path="/avatars/Technical.vrm"
  position={POS.tech}
  rotationY={ROT.tech}
  lookAtTarget={LOOK_TARGET}
  blinkOffset={1.3}
  breatheOffset={0.9}
  headSwaySpeed={0.38}
  active={
    activeInterviewer ===
    "technical"
  }
  isSpeaking={
    activeInterviewer ===
      "technical" &&
    isSpeaking
  }
/>

        <MultiAvatar
  path="/avatars/Manager.vrm"
  position={POS.mgr}
  rotationY={ROT.mgr}
  lookAtTarget={LOOK_TARGET}
  blinkOffset={2.2}
  breatheOffset={1.6}
  headSwaySpeed={0.51}
  active={
    activeInterviewer ===
    "manager"
  }
  isSpeaking={
    activeInterviewer ===
      "manager" &&
    isSpeaking
  }
/>
      </Suspense>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.45}
        scale={18}
        blur={2.5}
        far={5}
      />

      {/*
        Camera at Z=1.8, avatars at Z=-1.2 to -1.5
        Distance = ~3 units — avatars fill frame
        Target Y=1.5 = chest/face level of seated avatar
        Target Z=-1.3 = roughly where avatars are
      */}
      <OrbitControls
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        target={[0, 1.5, -1.3]}
      />
    </Canvas>
  );
}