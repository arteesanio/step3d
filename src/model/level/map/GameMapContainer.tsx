"use client"
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import PickBookStage from "./PickBookStage";

export const GameMapContainer = () => {
    return (<div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
        {/* <Canvas shadows> */}
            {/* <ambientLight intensity={0.5} /> */}

            <PickBookStage />
        {/* </Canvas> */}
    </div>)
}