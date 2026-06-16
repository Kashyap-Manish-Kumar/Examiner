import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";

import VRMAvatar from "./VRMAvatar";

export default function AvatarScene() {
  return (
    <Canvas
      shadows
    camera={{
  position: [0, 2.5, 4.8],
  fov: 35,
}}
    >
      {/* Ambient Fill Light */}
      <ambientLight intensity={2.5} />

      {/* Main Key Light */}
      <directionalLight
        castShadow
        position={[5, 8, 5]}
        intensity={3}
      />

      {/* Left Fill Light */}
      <directionalLight
        position={[-5, 5, 5]}
        intensity={2}
      />

      {/* Front Face Light */}
      <pointLight
        position={[0, 3, 3]}
        intensity={2}
      />

      {/* HDR Environment */}
      <Environment preset="city" />

      {/* Avatar */}
      <VRMAvatar />

      {/* Ground Shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={8}
        blur={2}
        far={4}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
         enableRotate={true}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />

      
    </Canvas>
  );
}