import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrthographicCamera, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { useRef } from "react";
import { GLTFLoader } from "three/addons";
import Navbar from "./navigation-bar";
interface HeroProp {}
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
function Computer() {
  const computer = useRef<Mesh>(null);
  const gltf = useLoader(GLTFLoader, "/assets/3D/computer.glb");

  useFrame((state, delta) => {
    if (!computer.current) return;
    const cp = computer.current;
    cp.rotation.y += delta;
  });

  return <primitive object={gltf.scene} ref={computer} />;
}

function Hero({}: HeroProp) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Canvas>
        <ambientLight intensity={3} />
        <OrthographicCamera
          makeDefault
          zoom={100}
          position={[-10, 10, 10]}
          rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0, "YXZ"]}
        />
        <Computer />
        <EffectComposer>
          <ToneMapping/>
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default Hero;
