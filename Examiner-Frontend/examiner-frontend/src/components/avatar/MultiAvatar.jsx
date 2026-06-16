import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

export default function MultiAvatar({
  path,
  position = [0, 0, 0],
  rotationY = 0,
  lookAtTarget = [0, 1.5, 6],
  blinkOffset = 0,
  breatheOffset = 0,
  headSwaySpeed = 0.5,

  isSpeaking = false,
  active = false,
}) {
  const { scene } = useThree();
  const vrmRef      = useRef(null);
  const targetObj   = useRef(new THREE.Object3D());
  const blinkTimer  = useRef(blinkOffset);
  const isBlinking  = useRef(false);
  const baseY       = useRef(position[1]);

  useEffect(() => {
    targetObj.current.position.set(...lookAtTarget);
    scene.add(targetObj.current);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      path,
      (gltf) => {
        const vrm = gltf.userData.vrm;
        if (!vrm) { console.error(`[MultiAvatar] VRM not found: ${path}`); return; }

        vrmRef.current = vrm;

        // ── Scale & Position ─────────────────────────────────────────
       vrm.scene.scale.set(
          1.5,
          1.4,
          1.5
        );
        vrm.scene.position.set(position[0], position[1], position[2]);
        baseY.current = position[1];

        // VRoid avatars face +Z by default; rotate Math.PI so they face camera (-Z)
        vrm.scene.rotation.y = Math.PI + rotationY;

        // ── Safe bone getter — tries normalized first, then raw ──────
        const bone = (name) =>
          vrm.humanoid?.getNormalizedBoneNode(name)
          ?? vrm.humanoid?.getRawBoneNode?.(name)
          ?? null;

        // ── SITTING POSE ─────────────────────────────────────────────
        const lUL = bone("leftUpperLeg");
        const rUL = bone("rightUpperLeg");
        const lLL = bone("leftLowerLeg");
        const rLL = bone("rightLowerLeg");
        const lFt = bone("leftFoot");
        const rFt = bone("rightFoot");

       if (lUL) lUL.rotation.x =  1.45;   // was -1.5
if (rUL) rUL.rotation.x =  1.45;   // was -1.5

// Lower leg hangs down from knee
if (lLL) lLL.rotation.x = -1.45;   // was +1.5 (flip to match)
if (rLL) rLL.rotation.x = -1.45;   // was +1.5

// Foot stays roughly flat
if (lFt) lFt.rotation.x =  0.3;    // was -0.3
if (rFt) rFt.rotation.x =  0.3;    // was -0.3
        // ── ARMS DOWN — THE KEY FIX ───────────────────────────────────
        // VRoid humanoid normalized bones:
        //   Left  upper arm: Z = +π/2 (≈1.57) brings arm straight DOWN
        //   Right upper arm: Z = -π/2 (≈-1.57) brings arm straight DOWN
        // We use slightly less than π/2 so arms rest at sides naturally
        const lUA = bone("leftUpperArm");
        const rUA = bone("rightUpperArm");
        const lLA = bone("leftLowerArm");
        const rLA = bone("rightLowerArm");
        const lH  = bone("leftHand");
        const rH  = bone("rightHand");

        if (lUA) {
          lUA.rotation.x =  0.05;   // very slight forward tilt
          lUA.rotation.y = -0.05;
          lUA.rotation.z =  1.45;   // key: brings left arm DOWN along body
        }
        if (rUA) {
          rUA.rotation.x =  0.05;
          rUA.rotation.y =  0.05;
          rUA.rotation.z = -1.45;   // key: brings right arm DOWN along body
        }
        // Forearm — bent at elbow, resting toward lap/table naturally
        if (lLA) {
          lLA.rotation.x =  1.1;    // elbow bends forward (forearm comes forward)
          lLA.rotation.y =  0.0;
          lLA.rotation.z =  0.05;
        }
        if (rLA) {
          rLA.rotation.x =  1.1;
          rLA.rotation.y =  0.0;
          rLA.rotation.z = -0.05;
        }
        // Hands relaxed
        if (lH) {
          lH.rotation.x = -0.1;
          lH.rotation.z =  0.05;
        }
        if (rH) {
          rH.rotation.x = -0.1;
          rH.rotation.z = -0.05;
        }

        // ── Slight spine lean (attentive posture) ────────────────────
        const spine = bone("spine");
        const chest = bone("chest");
        if (spine) spine.rotation.x = 0.05;
        if (chest) chest.rotation.x = 0.03;

        // ── LookAt ───────────────────────────────────────────────────
        if (vrm.lookAt) vrm.lookAt.target = targetObj.current;

        // Flush bone transforms before first frame
        vrm.update(0);

       scene.add(vrm.scene);
       


console.log(
  `[MultiAvatar] ✅ Loaded: ${path}`
);
      },
      (p) => { if (p.total) console.log(`[${path}] Loading: ${((p.loaded/p.total)*100).toFixed(0)}%`); },
      (e) => console.error(`[MultiAvatar] ❌ Error loading ${path}:`, e)
    );

   return () => {
  if (vrmRef.current) {
    scene.remove(vrmRef.current.scene);

    vrmRef.current.scene.traverse((obj) => {
      if (obj.geometry) {
        obj.geometry.dispose();
      }

      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  }

  scene.remove(targetObj.current);
};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, path]);

  useFrame((state, delta) => {
  const vrm = vrmRef.current;
  if (!vrm) return;
  vrm.scene.scale.lerp(
  new THREE.Vector3(
    active && isSpeaking
      ? 1.53
      : 1.5,

    active && isSpeaking
      ? 1.43
      : 1.4,

    active && isSpeaking
      ? 1.53
      : 1.5
  ),
  0.1
);


  const t = state.clock.elapsedTime;

    const bone = (name) =>
      vrm.humanoid?.getNormalizedBoneNode(name)
      ?? vrm.humanoid?.getRawBoneNode?.(name)
      ?? null;

    // ── Breathing — subtle Y bob ──────────────────────────────────────
    vrm.scene.position.y = baseY.current + Math.sin(t * 1.4 + breatheOffset) * 0.008;

    // ── Idle head movement ────────────────────────────────────────────
    const neck = bone("neck");
    const head = bone("head");
   if (head) {
  head.rotation.x =
    isSpeaking
      ? Math.sin(t * 8) * 0.03
      : 0;
}
    if (neck) {
      neck.rotation.y = Math.sin(t * headSwaySpeed * 0.55) * 0.06;
      neck.rotation.x = Math.sin(t * headSwaySpeed * 0.38) * 0.020;
    }
    if (head) {
      head.rotation.z = Math.sin(t * headSwaySpeed * 0.28 + 1.1) * 0.012;
    }

    // ── Eye blink ─────────────────────────────────────────────────────
    blinkTimer.current += delta;
    const blinkInterval = 3.2 + Math.sin(blinkOffset * 6.7) * 0.8;
    if (!isBlinking.current && blinkTimer.current > blinkInterval && vrm.expressionManager) {
      isBlinking.current = true;
      blinkTimer.current = 0;
      vrm.expressionManager.setValue("blink", 1);
      setTimeout(() => {
        vrm.expressionManager?.setValue("blink", 0);
        isBlinking.current = false;
      }, 130);
    }

    // ── LookAt subtle wander ──────────────────────────────────────────
    if (vrm.lookAt) {
      const wx = Math.sin(t * 0.16 + blinkOffset * 1.8) * 0.20;
      const wy = Math.sin(t * 0.11 + breatheOffset)    * 0.06;
      targetObj.current.position.set(
        lookAtTarget[0] + wx,
        lookAtTarget[1] + wy,
        lookAtTarget[2]
      );
      vrm.lookAt.target = targetObj.current;
    }

    // ── Chest breathing ────────────────────────────────────────────────
    const chest = bone("chest");
    if (chest) chest.rotation.x = 0.03 + Math.sin(t * 1.4 + breatheOffset) * 0.008;

    if (vrm.expressionManager) {
  vrm.expressionManager.setValue(
    "aa",
    isSpeaking
      ? Math.abs(
          Math.sin(t * 8)
        ) * 0.2
      : 0
  );
} 
vrm.update(delta);
  });

  return null;
}