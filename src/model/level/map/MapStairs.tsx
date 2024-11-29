"use client";
import { Stairs } from "@/model/core/Stairs";
import { Box } from "@react-three/drei";


export const MapStairs = () => {
  return <group rotation={[0, 0, 0]} >
    <Box args={[0.05, 1.125, 1]} position={[-0.62, -1.58, -0.41]} castShadow>
      <meshStandardMaterial color="#14B7E7" />
    </Box>
    <Stairs />
  </group>;
};
