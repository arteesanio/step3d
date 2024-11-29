import { Box, OrbitControls } from "@react-three/drei";
import { Stairs } from "./Stairs";

interface GameLevelProps {
    score: number;
    children: React.ReactNode;
}

export const GameLevel = ({ score, children }: GameLevelProps) => {
    return (
        <>
            <OrbitControls  maxPolarAngle={Math.PI / 1.69} />
            {/* <pointLight position={[0, 3, 2]} distance={20} intensity={100} /> */}
            {/* <ambientLight intensity={0.75} /> */}
            {/* <group position={[0, -0.5, 0]}>
                <Stairs />
            </group> */}
            {/* <Box position={[0, -2, 0]}><meshStandardMaterial wireframe /></Box> */}
            {children}
        </>
    );
}; 