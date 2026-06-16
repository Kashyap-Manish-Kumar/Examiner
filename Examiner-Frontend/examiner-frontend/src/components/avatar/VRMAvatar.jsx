import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin } from "@pixiv/three-vrm";

export default function VRMAvatar() {
  const { scene } = useThree();

  const vrmRef = useRef(null);
  const blinkTimer = useRef(0);

  const targetRef = useRef(
    new THREE.Object3D()
  );

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.crossOrigin = "anonymous";

    loader.register(
      (parser) => new VRMLoaderPlugin(parser)
    );

    loader.load(
      "/avatars/Technical.vrm",

      (gltf) => {
        const vrm = gltf.userData.vrm;

        if (!vrm) {
          console.error("❌ VRM not loaded");
          return;
        }

        vrmRef.current = vrm;

        console.log("VRM Object:", vrm);
        console.log(
          "Expression Manager:",
          vrm.expressionManager
        );
        console.log("Humanoid:", vrm.humanoid);
        console.log("LookAt:", vrm.lookAt);

        console.log(
          "Blink Expressions:",
          vrm.expressionManager?.blinkExpressionNames
        );

        /* Face Camera */
        vrm.scene.rotation.y = Math.PI;

        /* Medium Scale */
        vrm.scene.scale.set(
          1.4,
          1.4,
          1.4
        );

        /* Position */
        vrm.scene.position.set(
          0,
          -1.2,
          0
        );

        scene.add(vrm.scene);

        /* Debug Model Size */
        const box = new THREE.Box3().setFromObject(
          vrm.scene
        );

        const size = box.getSize(
          new THREE.Vector3()
        );

        console.log(
          "Avatar Height:",
          size.y
        );

        console.log(
          "Avatar Width:",
          size.x
        );

        console.log(
          "✅ Technical Interviewer Loaded"
        );
      },

      (progress) => {
        if (progress.total) {
          console.log(
            `Loading Avatar: ${(
              (progress.loaded /
                progress.total) *
              100
            ).toFixed(0)}%`
          );
        }
      },

      (error) => {
        console.error(
          "❌ VRM Load Error",
          error
        );
      }
    );

    return () => {
      if (
        vrmRef.current &&
        vrmRef.current.scene
      ) {
        scene.remove(
          vrmRef.current.scene
        );
      }
    };
  }, [scene]);

  useFrame((state) => {
    const vrm = vrmRef.current;

    if (!vrm) return;

    const time =
      state.clock.elapsedTime;

    /*
     * Look At Candidate
     */
    if (vrm.lookAt) {
      targetRef.current.position.set(
        0,
        1.5,
        2
      );

      vrm.lookAt.target =
        targetRef.current;
    }

    /*
     * Breathing
     */
    vrm.scene.position.y =
      -1.2 +
      Math.sin(time * 1.5) * 0.02;

    /*
     * Slight Head Movement
     */
    const neck =
      vrm.humanoid?.getNormalizedBoneNode(
        "neck"
      );

    if (neck) {
      neck.rotation.y =
        Math.sin(time * 0.5) * 0.08;

      neck.rotation.x =
        Math.sin(time * 0.7) * 0.03;
    }

    /*
     * Eye Blink
     */
    blinkTimer.current += 0.02;

    if (
      blinkTimer.current > 3 &&
      vrm.expressionManager
    ) {
      vrm.expressionManager.setValue(
        "blink",
        1
      );

      setTimeout(() => {
        vrm.expressionManager?.setValue(
          "blink",
          0
        );
      }, 150);

      blinkTimer.current = 0;
    }

    vrm.update(
      state.clock.getDelta()
    );
  });

  return null;
}