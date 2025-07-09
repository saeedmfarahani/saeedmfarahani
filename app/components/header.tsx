import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sky, OrthographicCamera, useGLTF } from "@react-three/drei";
import { Mesh } from "three";
import { Suspense, useRef } from "react";
import { GLTFLoader } from "three/addons";
import { ParkingMeter } from "lucide-react";
import Navbar from "./navigation-bar";
interface HeroProp {}

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
      </Canvas>
    </div>
  );
}

export default Hero;
