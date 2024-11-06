import { Box } from "@react-three/drei";

export const Stairs = () => {
    const colors = [
        "#ff7700", "#FFA500", "#FFFF00", "#00FF00", "#008000"];
    
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
                    <meshStandardMaterial color={colors[index]} />
                </Box>
            ))}
        </group>
    );
}; 