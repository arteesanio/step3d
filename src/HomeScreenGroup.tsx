"use client";
import { Box, RoundedBox } from "@react-three/drei";
import { Stairs } from "./components/Stairs";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const HomeScreenGroup = () => {
  const groupRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += Math.sin(state.clock.elapsedTime) * 0.005
    }
  });

  return (<>
    <ambientLight intensity={0.75} />
    <pointLight position={[-3, 5, 4]} distance={25} intensity={100} castShadow />

    <group 
      ref={groupRef}
      onClick={()=>{window.location.href = "/?lvl=0"}}
      position={[0, 2.5, 0]}
    >
      <RoundedBox args={[5, 1, 5]} position={[0, -4.52, 0]} receiveShadow>
        <meshStandardMaterial color="#ffffff" />
      </RoundedBox>
      <Box args={[0.1, 2.25, 2]} position={[-1.31, -3.15, 0.16]} castShadow>
        <meshStandardMaterial color="#14B7E7" />
      </Box>
      <group scale={2}>
        <group rotation={[0, 0, 0]} position={[0, 0, 0.5]}>
          <Stairs />
        </group>
      </group>
    </group>
  </>);
};
