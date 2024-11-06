import { Cylinder, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface LevelWinProps {
    score: number;
    s__score: (score: number) => void;
    onToast: (message: string) => void;
}

export const LevelWin = ({ score }: LevelWinProps) => {
  const miniHdri = useTexture("./miniHdri.jpg");
  const $coin = useRef<any>(null);

    useFrame((_, delta) => {
        if (!$coin.current) return;
        // Rotate the coin continuously
        $coin.current.rotation.x += delta * 1.5;
        $coin.current.rotation.z += delta *2;
        // Make the coin bounce up and down
        $coin.current.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 1;
    });

    return (<>
        <pointLight 
            position={[3, 3, 3]} 
            intensity={100} 
            castShadow
        />
        <ambientLight intensity={0.5} />
        <group position={[0, -1.5, 0]}>
            <Cylinder 
                ref={$coin}
                args={[1, 1, 0.31]} 
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 1, 0]}
            >
                       <meshMatcapMaterial matcap={miniHdri} color={"#ffee00"} />

            </Cylinder>
        </group>
    </>);
}; 