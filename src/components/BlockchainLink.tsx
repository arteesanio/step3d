import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

export const BlockchainLink = () => {
  return (<>
    {/* Main blocks */}
    <Box args={[1, 1, 1]} position={[-1.5, -1.88, -1.94]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>
    <Box args={[1, 1, 1]} position={[0, -1.88, -1.94]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>
    <Box args={[1, 1, 1]} position={[1.5, -1.88, -1.94]}>
      <meshStandardMaterial color="#aaaaaa" />
    </Box>

    {/* Connecting blocks */}
    <Box args={[0.5, 0.2, 0.2]} position={[-0.75, -1.88, -1.94]}>
      <meshStandardMaterial color="#555555" />
    </Box>
    <Box args={[0.5, 0.2, 0.2]} position={[0.75, -1.88, -1.94]}>
      <meshStandardMaterial color="#555555" />
    </Box>
  </>);
};
