import { OrthographicCamera, Text } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { useRef } from "react";
import { Mesh, MultiplyBlending } from "three";
import { GLTFLoader } from "three/addons";
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
interface IWobblyText {
  children: string;
  pos: [x: number, y: number];
}
function WobblyText({ children, pos: pos }: IWobblyText) {
  const text = useRef<Mesh>(null);
  const position: [x: number, y: number, z: number] = [-0.5, pos[1], pos[0]];

  useFrame((state, delta) => {
    if (!text.current) return;
    const t = text.current;
    const xanim =
      Math.sin(performance.now() / 800 + pos[0]) / 70 +
      Math.sin(Math.PI + performance.now() / 300 + pos[0]) / 70;

    const yanim =
      Math.sin(performance.now() / 200 + pos[1]) / 70 +
      Math.sin(Math.PI + performance.now() / 800 + pos[1]) / 70;
    t.position.z = pos[0] + xanim;
    t.position.y = pos[1] + yanim;
  });
  return (
    <Text
      position={position}
      color={"#000"}
      fontStyle="italic"
      fontWeight={600}
      fontSize={0.5}
      rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0, "YXZ"]}
      anchorX={"center"}
      anchorY={"middle"}
      fillOpacity={0.9}
      ref={text}
      onSync={(mesh) => {
        mesh.material.transparent = true;
        mesh.material.blending = MultiplyBlending;
      }}
    >
      {children}
    </Text>
  );
}

function Hero({}: HeroProp) {
  return (
    <div className="h-screen flex flex-col">
      <Canvas>
        <ambientLight intensity={3} />
        <OrthographicCamera
          makeDefault
          zoom={150}
          position={[-10, 10, 10]}
          rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0, "YXZ"]}
        />

        <WobblyText pos={[-1.5, 1]}>saeed</WobblyText>
        <WobblyText pos={[2, 1]}>farahani</WobblyText>
        <Computer />
        <EffectComposer>
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default Hero;
