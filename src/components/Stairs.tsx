import { Box } from "@react-three/drei";

interface StairsProps {
    brightColors?: boolean;
    activatedSteps?: number[];
}

export const Stairs = ({ brightColors = true, activatedSteps = [] }: StairsProps) => {
    const brightPalette = ["#ff7700", "#FFA500", "#FFFF00", "#00FF00", "#008000"];
    const mutedPalette = ["#8B6B5D", "#8B7355", "#8B8B6B", "#7B8B70", "#6B8B85"];
    const getColor = (index: number) => {
        const basePalette = brightColors ? brightPalette : mutedPalette;
        return activatedSteps.includes(index) ? brightPalette[index] : basePalette[index];
    };
    
    return (
        <group position={[0, -2, 0]}>
            {[...Array(5)].map((_, index) => (
                <Box 
                    key={index}
                    position={[0, (0.2 + index * 0.2) / 2, index * -0.2]} 
                    args={[2, 0.2 + index * 0.2, 0.2]}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial color={getColor(index)} />
                </Box>
            ))}
        </group>
    );
}; 