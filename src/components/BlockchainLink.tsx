import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export const BlockchainLink = () => {
  return (<>
    {/* Main blocks */}
    <Box args={[.85, .85, .85]} position={[-1.5, -2.15, -2.82]} castShadow receiveShadow>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>
    <Box args={[.85, .85, .85]} position={[0, -2.15, -2.82]} castShadow receiveShadow>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>
    <Box args={[.85, .85, .85]} position={[1.5, -2.15, -2.82]} castShadow receiveShadow>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>

    {/* Connecting blocks */}
    <Box args={[0.75, 0.2, 0.2]} position={[-0.75, -2.15, -2.82]}>
      <meshStandardMaterial color="#555555" />
    </Box>
    <Box args={[0.75, 0.2, 0.2]} position={[0.75, -2.15, -2.82]}>
      <meshStandardMaterial color="#555555" />
    </Box>
  </>);
};
