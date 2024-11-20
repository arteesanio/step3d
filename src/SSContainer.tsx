"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Toast } from "./components/Toast";
import { GameLevel } from "./components/GameLevel";
import { LevelWin, LevelWinHeader } from "./components/LevelWin";
import { useSearchParams } from 'next/navigation';
import { SecondStageLevelZero } from "./components/SecondStageLevelZero";
import { SecondStageLevelOne } from "./components/SecondStageLevelOne";

interface SSContainerProps {
    initialLevel?: string;
}

const lookup_levelMap: { [key: string]: string } = {
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

export const SSContainer = ({ initialLevel = "start" }: SSContainerProps) => {
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

    const defaultLevelHeader = () => {
        return (<>
            <div className="tx-altfont-2 tx-xl">Stage 2</div>
            <div className="tx-altfont-1 tx-mdl">Advanced Challenges</div>
        </>)
    }

    const getLevelName = () => {
        const HeaderlevelMap: { [key: string]: any } = {
            "zero": <>
                <div className="tx-altfont-2 tx-xl">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level Zero</div>
            </>,
            "one": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">One</div>
            </>,
            "two": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Two</div>
            </>,
            "three": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Three</div>
            </>,
            "four": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Four</div>
            </>,
            "five": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Five</div>
            </>,
            "six": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Six</div>
            </>,
            "seven": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">Seven</div>
            </>,
            "eight": <>
                <div className="tx-altfont-2 tx-lg">Stage 2</div>
                <div className="tx-altfont-2 tx-xl">Level Eight</div>
            </>,
            "win": <>
                <div className="tx-altfont-2 tx-xl">Stage 2 Complete!</div>
            </>
        };
        
        const levelKey = lookup_levelMap[currentLevel];
        return HeaderlevelMap[levelKey] || defaultLevelHeader();
    }

    useEffect(() => {
        document.title = `Stage 2 - Lvl ${currentLevel}`;
    }, [currentLevel]);

    const renderHeader = () => {
        if (initialLevel === "win" || currentLevel === "win") {
            return (
                <LevelWinHeader score={score} />
            );
        }

        if (toastCount == 0 && score == 0) {
            return (<>
                <h1 className="flex-col">
                    {getLevelName()}
                </h1>
                <div className="z-100 opaci-75 opaci-chov--50" 
                    style={{ position: "absolute", bottom: "10%",  left: "25%" }}
                    onClick={()=>{window.location.href = "/"}}
                >
                    <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
                </div>
            </>);
        }

        if (toastCount > 0 && score == -1) {
            return <h1 className="tx-altfont-1 tx-center z-10 opaci-chov--50" 
                onClick={()=>{window.location.reload()}}>
                You missed! <br /> 
                <div className="tx-md">Tap to try again</div>
            </h1>;
        }
    }

    const renderLevel = () => {
        if (currentLevel === "win" || initialLevel === "win") {
            return <LevelWin score={score} s__score={s__score} onToast={s__toast} />;
        }

        const levelKey = lookup_levelMap[currentLevel] || currentLevel;

        switch(levelKey) {
            case "zero":
                return <SecondStageLevelZero score={score} s__score={s__score} onToast={s__toast} />;
            case "one":
                return <SecondStageLevelOne score={score} s__score={s__score} onToast={s__toast} />;
            default:
                return <SecondStageLevelZero score={score} s__score={s__score} onToast={s__toast} />;
        }
    };

    const onStepClick = () => {
        const params = new URLSearchParams(window.location.search);
        const currentLvl = params.get('lvl');
        if (!currentLvl) {
            return window.location.href = "/learn?lvl=1";
        }
        const nextLevel = parseInt(currentLvl) + 1;
        return window.location.href = `/learn?lvl=${nextLevel}`;
    }

    return (<>
        <div className="flex-col">
            {renderHeader()}
        </div>
        {(currentLevel === "win" || initialLevel === "win") && (
            <div className="z-100 opaci-chov--50" 
                style={{ position: "absolute", bottom: "10%" }}
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