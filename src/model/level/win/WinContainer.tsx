import { GameLevel } from "@/model/core/GameLevel"
import { Canvas } from "@react-three/fiber"
import { LevelWinHeader, LevelWin } from "../LevelWin"
import { useRef } from "react";

export const WinContainer = ({ score, s__score, s__toast }: { score: number, s__score: any, s__toast: any }) => {
    const winRef = useRef<any>(null);




    return (<>
    <div className="flex-col">
                <LevelWinHeader score={score} />
            </div>
            {!winRef.current?.isVerified && (
                <button className="flex-col pos-abs bottom-0 opaci-chov--50 z-10"
                onClick={() => winRef.current.handleBoxClick()}
                >
                <div className="bg-b-50 px-4 py-2 mb-8 bord-r-50 tx-white tx-altfont-2 tx-lx "
                 >Claim</div>
            </button>
            )}
            
            {!!winRef.current?.isVerified && (
                <button className="flex-col pos-abs bottom-0 opaci-chov--50 z-10"
                onClick={() => window.location.href = "/learn"}
                >
                <div className="bg-b-50 px-4 py-2 mb-8 bord-r-50 tx-white tx-altfont-2 tx-lx "
                 >Continue</div>
            </button>
            )}
            
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
            <Canvas shadows>
                <GameLevel score={score}>
                    <LevelWin ref={winRef} score={score} s__score={s__score} onToast={s__toast} />
                </GameLevel>
            </Canvas>
        </div>
        </>)
}
