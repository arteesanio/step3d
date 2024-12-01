"use client"
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import PickBookStage from "./PickBookStage";
import { LanguageSelector } from "@/components/LanguageSelector";

export const GameMapContainer = () => {
    return (<div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
        <div className="pos-abs pa-2 z-10">
        <LanguageSelector />
        </div>
        <button className="z-100 opaci-75 opaci-chov--50 pa-2"  
                    style={{ position: "absolute", right: "0", top: 0 }}
                    onClick={()=>{window.location.href = "/"}}
                >
                    <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
                </button>
        {/* <Canvas shadows> */}
            {/* <ambientLight intensity={0.5} /> */}

            <PickBookStage />
        {/* </Canvas> */}
    </div>)
}