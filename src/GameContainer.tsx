"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { LevelOne } from "./components/LevelOne";
import { Toast } from "./components/Toast";
import { GameLevel } from "./components/GameLevel";
import { LevelZero } from "./components/LevelZero";
import { LevelWin } from "./components/LevelWin";
import { useSearchParams } from 'next/navigation';
import { LevelFour } from "./components/LevelFour";
import { LevelThree } from "./components/LevelThree";
import { LevelTwo } from "./components/LevelTwo";
import { LevelEight } from "./components/LevelEight";
import { LevelFive } from "./components/LevelFive";
import { LevelSeven } from "./components/LevelSeven";
import { LevelSix } from "./components/LevelSix";

interface GameContainerProps {
    initialLevel?: string;
}

export const GameContainer = ({ initialLevel = "start" }: GameContainerProps) => {
    const searchParams = useSearchParams();
    const [score, s__score] = useState(0);
    const [toast, _s__toast] = useState("");
    const [toastCount, s__toastCount] = useState(0);
    const [currentLevel, s__currentLevel] = useState("zero");
    
    const s__toast = (v:any) => {
        s__toastCount((prev)=>prev+1)
    }

    useEffect(() => {
        const lvlParam = searchParams.get('lvl');
        if (!lvlParam) return;

        // Handle numeric level
        if (!isNaN(Number(lvlParam))) {
            const numLevel = Number(lvlParam);
            if (numLevel >= 0 && numLevel <= 255) {
                s__currentLevel(numLevel.toString());
            }
            return;
        }

        // Handle string level
        const validLevels = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "win"];
        if (validLevels.includes(lvlParam)) {
            s__currentLevel(lvlParam);
        }
    }, [searchParams]);

    const renderHeader = () => {
        if (initialLevel === "win" || currentLevel === "win") {
            return (
                <h1 className="flex-col">
                    <div className="tx-altfont-2 tx-xxl">Congrats!</div>
                    <div className="tx-altfont-1">You&apos;ve Won!</div>
                </h1>
            );
        }

        if (toastCount == 0) {
            return (
                <h1 className="flex-col">
                    <div className="tx-altfont-2 tx-xl">Tap</div>
                    <div className="tx-altfont-1 tx-mdl">the Coin!</div>
                </h1>
            );
        }

        // if (toastCount > 0 && score < -1) {
        //     return <h1 className="tx-altfont-2">You Win!</h1>;
        // }

        if (toastCount > 0 && score == -1) {
            return <h1 className="tx-altfont-1 tx-center z-10 opaci-chov--50" onClick={()=>{window.location.reload()}}>You missed! <br /> <div className="tx-md">Tap to try again</div></h1>;
        }
    }

    const renderLevel = () => {
        if (currentLevel === "win" || initialLevel === "win") {
            return <LevelWin score={score} s__score={s__score} onToast={s__toast} />;
        }
        // Convert string numbers to their word equivalent
        const levelMap: { [key: string]: string } = {
            "0": "zero",
            "1": "one", 
            "2": "two",
            "3": "three",
            "4": "four",
            "5": "five",
            "6": "six",
            "7": "seven",
            "8": "eight"
        };

        const levelKey = levelMap[currentLevel] || currentLevel;

        switch(levelKey) {
            case "zero":
                return <LevelZero score={score} s__score={s__score} onToast={s__toast} />;
            case "one":
                return <LevelOne score={score} s__score={s__score} onToast={s__toast} />;
            case "two":
                return <LevelTwo score={score} s__score={s__score} onToast={s__toast} />;
            case "three":
                return <LevelThree score={score} s__score={s__score} onToast={s__toast} />;
            case "four":
                return <LevelFour score={score} s__score={s__score} onToast={s__toast} />;
            case "five":
                return <LevelFive score={score} s__score={s__score} onToast={s__toast} />;
            case "six":
                return <LevelSix score={score} s__score={s__score} onToast={s__toast} />;
            case "seven":
                return <LevelSeven score={score} s__score={s__score} onToast={s__toast} />;
            case "eight":
                return <LevelEight score={score} s__score={s__score} onToast={s__toast} />;
            default:
                return <LevelZero score={score} s__score={s__score} onToast={s__toast} />;
        }
    };

    return (<>
        <div className="flex-col">
            {renderHeader()}
        </div>
        {(currentLevel === "win" || initialLevel === "win") && (
            <div className="z-100 opaci-chov--50" style={{ position: "absolute", bottom: "10%" }}
                onClick={()=>{window.location.href = "/"}}
            >
                <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
            </div>
        )}
        {toast && <Toast message={toast} onClose={() => s__toast("")} />}
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
            <Canvas shadows>
                <GameLevel score={score}>
                    {renderLevel()}
                </GameLevel>
            </Canvas>
        </div>
    </>)
}
