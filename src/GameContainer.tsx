"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { LevelOne } from "./components/LevelOne";
import { Toast } from "./components/Toast";
import { GameLevel } from "./components/GameLevel";
import { LevelZero } from "./components/LevelZero";
import { LevelWin, LevelWinHeader } from "./components/LevelWin";
import { useSearchParams } from 'next/navigation';
import { LevelFour } from "./components/LevelFour";
import { LevelThree } from "./components/LevelThree";
import { LevelTwo } from "./components/LevelTwo";
import { LevelEight } from "./components/LevelEight";
import { LevelFive } from "./components/LevelFive";
import { LevelSeven } from "./components/LevelSeven";
import { LevelSix } from "./components/LevelSix";
import { HomeScreenGroup } from "./HomeScreenGroup";

interface GameContainerProps {
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
export const GameContainer = ({ initialLevel = "start" }: GameContainerProps) => {
    const searchParams = useSearchParams();
    const [score, s__score] = useState(0);
    const [toast, _s__toast] = useState("");
    const [toastCount, s__toastCount] = useState(0);
    const [currentLevel, s__currentLevel] = useState("");
    
    const s__toast = (v:any) => {
        s__toastCount((prev)=>prev+1)
        _s__toast(v);
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
        <div className="tx-altfont-2 tx-xl">Tap</div>
        <div className="tx-altfont-1 tx-mdl">the Coin!</div>
    </>)
}
    const getLevelName = () => {
        if (!currentLevel) {
            return "Welcome!"
        }

        const HeaderlevelMap: { [key: string]: any } = {
            "zero": <>
                <div className="tx-altfont-2 tx-xl" style={{color: "#ff5500"}}>Tap</div>
                <div className="tx-altfont-1 tx-mdl">the Coin!</div>
            </>,
            "one": <>
                <div className="tx-altfont-2 tx-xl" style={{color: "#ff5500"}}>Tap</div>
                <div className="tx-altfont-2 tx-lg">Twice!</div>
            </>,
            "two": <>
                <div className="tx-altfont-2 tx-xl" style={{color: "#ff5500"}}>Tap</div>
                <div className="tx-altfont-2 tx-lg">3 Times!</div>
                {/* <div className="tx-altfont-1 tx-mdl">Level</div> */}
                {/* <div className="tx-altfont-2 tx-xl">Two</div> */}
            </>,
            "three": <>
            <div className="tx-altfont-1 tx-mdl">Level Three</div>
                <div className="tx-altfont-2 tx-xl">Avoid <br /> Theft</div>
            </>,
            "four": <>
            <div className="tx-altfont-1 tx-mdl">Level Four</div>
                <div className="tx-altfont-2 tx-xl tx-center">Earn <br /> Rewards!</div>
            </>,
            "five": <>
            <div className="tx-altfont-1 tx-mdl">Level Five</div>
                <div className="tx-altfont-2 tx-xl tx-center">Liquidity <br /> Pools!</div>
            </>,
            "six": <>
            <div className="tx-altfont-1 tx-mdl">Level Six</div>
                <div className="tx-altfont-2 tx-xl tx-center">Smart <br /> Contracts!</div>
            </>,
            "seven": <>
            <div className="tx-altfont-1 tx-mdl">Level Seven</div>
                <div className="tx-altfont-2 tx-xl tx-center">Blockchain <br /> Gas!</div>
            </>,
            "eight": <>
                <div className="tx-altfont-2 tx-xl tx-center">What is <br /> Solana?</div>
            </>,
            "win": <>
                <div className="tx-altfont-2 tx-xl tx-center">Victory!</div>
            </>,
        };
        
        const levelKey = lookup_levelMap[currentLevel]
        console.log("levelKey", levelKey)
        console.log("HeaderlevelMap[levelKey]", HeaderlevelMap[levelKey])
        return HeaderlevelMap[levelKey] || defaultLevelHeader();
    }

    useEffect(() => {
        document.title = `Lvl ${currentLevel}`;
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
            {currentLevel != "zero" && 
                <div className="z-100 opaci-75 opaci-chov--50" style={{ position: "absolute", bottom: "10%",  left: "25%" }}
                onClick={()=>{window.location.href = "/"}}
            >
                <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
            </div>}
            </>);
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

        const levelKey = lookup_levelMap[currentLevel] || currentLevel;

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

    // const onStepClick = () => {
    //     const params = new URLSearchParams(window.location.search);
    //     const currentLvl = params.get('lvl');
        
    //     // If completed all levels of stage 1, go to stage 2
    //     if (verifyLevelProgression()) {
    //         return window.location.href = "/learn?lvl=0";
    //     }
        
    //     // Otherwise continue with stage 1 progression
    //     if (!currentLvl) {
    //         return window.location.href = "/?lvl=1";
    //     }
    //     const nextLevel = parseInt(currentLvl) + 1;
    //     return window.location.href = `/?lvl=${nextLevel}`;
    // }

    if (!currentLevel && initialLevel !== "win") {
        return <HomeScreenStage />;
    }

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
        {/* {true && <Toast message={"toast"} onClose={() => s__toast("")} />} */}
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
            <Canvas shadows>
                <GameLevel score={score}>
                    {renderLevel()}
                </GameLevel>
            </Canvas>
        </div>
    </>)
}

const HomeScreenStage = () => {
    return (<>
    
        <div className="flex-col z-100" 
            onClick={()=>{window.location.href = "/?lvl=0"}}
        >
            <div className="tx-altfont-1 tx-xl opaci-chov--50 hover-4">
                <div style={{
                    color: "#ff3300",
                    textShadow: "0 0 10px #ff7700aa, -1px -1px 0 #ffcc77, 2px -2px 0 #ffcc77"
                }}>Start Game!</div>
            </div>
        </div>
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
            <Canvas shadows camera={{ position: [5, 5, 5] }}>
                <HomeScreenGroup  />
        </Canvas>
        </div>
    </>)
}

