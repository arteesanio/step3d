"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Toast } from "./dom/Toast";
import { GameLevel } from "./model/core/GameLevel";
import { LevelWin, LevelWinHeader } from "./model/level/LevelWin";
import { useSearchParams } from 'next/navigation';
// import { SecondStageLevelZero } from "./components/SecondStageLevelZero";
// import { SecondStageLevelOne } from "./components/SecondStageLevelOne";
// import { LevelZero } from "./components/LevelZero";
// import { LevelOne } from "./components/LevelOne";
// import { LevelTwo } from "./components/LevelTwo";
// import { SecondStageLevelTwo } from "./components/SecondStageLevelTwo";
import { ThirdStageLevelZero } from "./model/level/stagex/third/ThirdStageLevelZero";
import { LevelOne } from "./model/level/stage0/LevelOne";
import { LevelTwo } from "./model/level/stage0/LevelTwo";
import { LevelZero } from "./model/level/stage0/LevelZero";
// import { SecondStageLevelOne } from "./model/level/stagex/SecondStageLevelOne";
// import { SecondStageLevelTwo } from "./model/level/stagex/SecondStageLevelTwo";
import { SecondStageLevelZero } from "./model/level/stagex/second/SecondStageLevelZero";
import { SecondStageLevelThree } from "./model/level/stagex/second/SecondStageLevelThree";
import { SecondStageLevelFour } from "./model/level/stagex/second/SecondStageLevelFour";
import { SecondStageLevelFive } from "./model/level/stagex/second/SecondStageLevelFive";
import { SecondStageLevelOne } from "./model/level/stagex/second/SecondStageLevelOne";
import { SecondStageLevelTwo } from "./model/level/stagex/second/SecondStageLevelTwo";

interface SSContainerProps {
    initialLevel?: string;
    initialStage?: string;
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

export const SSContainer = ({ initialLevel = "start", initialStage = "2" }: SSContainerProps) => {
    const searchParams = useSearchParams();
    const [score, s__score] = useState(0);
    const [toast, _s__toast] = useState("");
    const [toastCount, s__toastCount] = useState(0);
    const [currentLevel, s__currentLevel] = useState("zero");
    const [currentStage, s__currentStage] = useState(initialStage);
    
    const s__toast = (v:any) => {
        s__toastCount((prev)=>prev+1)
    }

    useEffect(() => {
        const lvlParam = searchParams.get('lvl');
        const stageParam = searchParams.get('stage');
        
        if (stageParam) {
            const numStage = Number(stageParam);
            if (numStage >= 1 && numStage <= 9) { // Assuming stages 1-9
                s__currentStage(stageParam);
            }
        }

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
            <div className="tx-altfont-2 tx-xl">Stage {currentStage}</div>
            <div className="tx-altfont-1 tx-mdl">Advanced Challenges</div>
        </>)
    }

    const getLevelName = () => {
        const commonHeader = (levelText: string) => (
            <>
                <div className="tx-altfont-2 tx-lg">Stage {currentStage}</div>
                <div className="tx-altfont-1 tx-mdl">Level</div>
                <div className="tx-altfont-2 tx-xl">{levelText}</div>
            </>
        );

        const HeaderlevelMap: { [key: string]: any } = {
            "zero": <>
                <div className="tx-altfont-2 tx-xl">Stage {currentStage}</div>
                <div className="tx-altfont-1 tx-mdl">Level Zero</div>
            </>,
            "one": commonHeader("One"),
            "two": commonHeader("Two"),
            "three": commonHeader("Three"),
            "four": commonHeader("Four"),
            "five": commonHeader("Five"),
            "six": commonHeader("Six"),
            "seven": commonHeader("Seven"),
            "eight": <>
                <div className="tx-altfont-2 tx-lg">Stage {currentStage}</div>
                <div className="tx-altfont-2 tx-xl">Level Eight</div>
            </>,
            "win": <>
                <div className="tx-altfont-2 tx-xl">Stage {currentStage} Complete!</div>
            </>
        };
        
        const levelKey = lookup_levelMap[currentLevel];
        return HeaderlevelMap[levelKey] || defaultLevelHeader();
    }

    useEffect(() => {
        document.title = `Stage ${currentStage} - Lvl ${currentLevel}`;
    }, [currentLevel, currentStage]);

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
                <button className="z-100 opaci-75 opaci-chov--50" 
                    style={{ position: "absolute", bottom: "10%",  left: "25%" }}
                    onClick={()=>{window.location.href = "/"}}
                >
                    <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
                </button>
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

        // Common props for all level components
        const levelProps = {
            score,
            s__score,
            onToast: s__toast
        };

        // Dynamic import based on stage and level
        try {
            const levelKey = lookup_levelMap[currentLevel] || currentLevel;
            
            switch(currentStage) {
                case "1":
                    switch(levelKey) {
                        case "zero": return <LevelZero {...levelProps} />;
                        case "one": return <LevelOne {...levelProps} />;
                        case "two": return <LevelTwo {...levelProps} />;
                        // Add more level cases for stage 1
                        default: return <LevelZero {...levelProps} />;
                    }
                case "2":
                    switch(levelKey) {
                        case "zero": return <SecondStageLevelZero {...levelProps} />;
                        case "one": return <SecondStageLevelOne {...levelProps} />;
                        case "two": return <SecondStageLevelTwo {...levelProps} />;
                        case "three": return <SecondStageLevelThree {...levelProps} />;
                        case "four": return <SecondStageLevelFour {...levelProps} />;
                        case "five": return <SecondStageLevelFive {...levelProps} />;
                        // Add more level cases for stage 2
                        default: return <SecondStageLevelZero {...levelProps} />;
                    }
                case "3":
                    switch(levelKey) {
                        case "zero": return <ThirdStageLevelZero {...levelProps} />;
                        // case "one": return <ThirdStageLevelOne {...levelProps} />;
                        // case "two": return <ThirdStageLevelTwo {...levelProps} />;
                        // case "three": return <ThirdStageLevelThree {...levelProps} />;
                        // case "four": return <ThirdStageLevelFour {...levelProps} />;
                        // case "five": return <ThirdStageLevelFive {...levelProps} />;
                        // case "six": return <ThirdStageLevelSix {...levelProps} />;
                        // case "seven": return <ThirdStageLevelSeven {...levelProps} />;
                        // case "eight": return <ThirdStageLevelEight {...levelProps} />;
                        // Add more level cases for stage 3
                        default: return <ThirdStageLevelZero {...levelProps} />;
                    }
                // Add more stage cases here
                default:
                    return <LevelZero {...levelProps} />;
            }
        } catch (error) {
            console.error("Error loading level:", error);
            return <SecondStageLevelZero {...levelProps} />;
        }
    };

    const onStepClick = () => {
        const params = new URLSearchParams(window.location.search);
        const currentLvl = params.get('lvl');
        const currentStage = params.get('stage') || '2';
        if (!currentLvl) {
            return window.location.href = `/learn?stage=${currentStage}&lvl=1`;
        }
        const nextLevel = parseInt(currentLvl) + 1;
        return window.location.href = `/learn?stage=${currentStage}&lvl=${nextLevel}`;
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