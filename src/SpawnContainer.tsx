"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Toast } from "./dom/Toast";
import { GameLevel } from "./model/core/GameLevel";
import { LevelWin, LevelWinHeader } from "./model/level/LevelWin";
import { useSearchParams } from 'next/navigation';
import { HomeScreenGroup } from "./HomeScreenGroup";
import { LevelFive } from "./model/level/stage0/LevelFive";
import { LevelFour } from "./model/level/stage0/LevelFour";
import { LevelOne } from "./model/level/stage0/LevelOne";
import { LevelThree } from "./model/level/stage0/LevelThree";
import { LevelTwo } from "./model/level/stage0/LevelTwo";
import { LevelZero } from "./model/level/stage0/LevelZero";
import { WinContainer } from "./model/level/win/WinContainer";
import { useLocalStorage } from "usehooks-ts";
import { LevelSix } from "./model/level/stage0/LevelSix";

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
export const SpawnContainer = ({ initialLevel = "start" }: GameContainerProps) => {
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
                <div className="tx-altfont-2 tx-xl">Secret <br /> Phrase</div>
            </>,
            "four": <>
            <div className="tx-altfont-1 tx-mdl">Level Four</div>
                <div className="tx-altfont-2 tx-xl tx-center">Avoid <br /> Theft!</div>
            </>,
            "five": <>
            <div className="tx-altfont-1 tx-mdl">Level Five</div>
                <div className="tx-altfont-2 tx-xl tx-center">Blockchain <br /> Gas</div>
            </>,
            "six": <>
            <div className="tx-altfont-1 tx-mdl">Level Six</div>
                <div className="tx-altfont-2 tx-xl tx-center">Decentralization </div>
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
                <button className="z-100 opaci-75 opaci-chov--50" style={{ position: "absolute", bottom: "10%",  left: "25%" }}
                onClick={()=>{window.location.href = "/"}}
            >
                <h3 className="tx-altfont-1 tx-center">Go to Home</h3>
            </button>}
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

    
    if (initialLevel == "win") {
        return (<>
        {toast && <Toast message={toast} onClose={() => s__toast("")} />}
        <WinContainer score={score} s__score={s__score} s__toast={s__toast} />
        </>)
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

export const useQuizResults = () => {

    const [LS_level1, s__LS_level1] = useLocalStorage("level1_completion", "");
    const [LS_level2, s__LS_level2] = useLocalStorage("level2_completion", "");
    const [LS_level3, s__LS_level3] = useLocalStorage("level3_completion", "");
    const [LS_level4, s__LS_level4] = useLocalStorage("level4_completion", "");
    const [LS_level5, s__LS_level5] = useLocalStorage("level5_completion", "");
    const [LS_level6, s__LS_level6] = useLocalStorage("level6_completion", "");
    const [LS_level7, s__LS_level7] = useLocalStorage("level7_completion", "");
    const [LS_level8, s__LS_level8] = useLocalStorage("level8_completion", "");

    const [quizResults, s__quizResults] = useState("");
    const [clientLoaded, s__clientLoaded] = useState(false);
    const [allValid, s__allValid] = useState(false);
    const [someValid, s__someValid] = useState(false);
    const resetResults = () => {
        
        s__LS_level1("");
        s__LS_level2("");
        s__LS_level3("");
        s__LS_level4("");
        s__LS_level5("");
        s__LS_level6("");
        s__LS_level7("");
        s__LS_level8("");
        s__allValid(false);
        s__someValid(false);
        s__quizResults("");
        // setQuizRes();
    }
    const setQuizRes = () => {
        const level1Time = parseInt(window.localStorage.getItem('level1_completion') || '0');
        const level2Time = parseInt(window.localStorage.getItem('level2_completion') || '0');
        const level3Time = parseInt(window.localStorage.getItem('level3_completion') || '0');
        const level4Time = parseInt(window.localStorage.getItem('level4_completion') || '0');
        const level5Time = parseInt(window.localStorage.getItem('level5_completion') || '0');
        const level6Time = parseInt(window.localStorage.getItem('level6_completion') || '0');
        const level7Time = parseInt(window.localStorage.getItem('level7_completion') || '0');
        const level8Time = parseInt(window.localStorage.getItem('level8_completion') || '0');
        console.log("times", level1Time, level2Time, level3Time, level4Time, level5Time, level6Time, level7Time, level8Time)

        if (level1Time || level2Time || level3Time || level4Time || level5Time || level6Time || level7Time || level8Time) {
            s__someValid(true);
        }
        if (level1Time && level2Time && level3Time && level4Time && level5Time && level6Time && level7Time && level8Time) {
            const quiz_results = `${level1Time},${level2Time},${level3Time},${level4Time},${level5Time},${level6Time},${level7Time},${level8Time}`;
            s__quizResults(quiz_results);
            s__allValid(true);
        }
    }

    useEffect(() => {
        if (clientLoaded) {return}
        s__clientLoaded(true);
        setQuizRes();
    }, [clientLoaded]);

    return {
        quizResults, clientLoaded, allValid, someValid,
        setQuizRes, resetResults
    };
}

const HomeScreenStage = () => {
    const {quizResults, clientLoaded, allValid, setQuizRes} = useQuizResults();

    return (<>
        {!!clientLoaded && !allValid && (
            <button className="flex-col z-100" 
                onClick={()=>{window.location.href = "/?lvl=0"}}
            >
                <div className="tx-altfont-2  opaci-chov--50 hover-4 pa-2 bord-r-50"
                style={
                    {
                        background: "linear-gradient(180deg, #cccccc, #AAAAAA 30%, #0F0F0D 100%)",
                    }
                }>
                    <div 
                    className="button- 29 py-2 px-4 bord-r-50"
                    // className="px-2 py-1 bg-w-50" 
                    style={{
                        background: "linear-gradient(170deg, #C12911, #FC9419)",
                        color: "#ffffff",
                        // border: "2px solid #ffcc77",
                        textShadow: "2px 2px 1px #773300",
                        // borderRadius: "20px",
                        // textShadow: "0 0 10px #ff7700aa, -1px -1px 0 #ffcc77, 2px -2px 0 #ffcc77"
                    }}>
                        <div className="tx-xl px-4 Q_md_x">Start Game</div>
                        <div className="tx-lgx Q_xs_md">Start Game</div>
                    </div>
                </div>
            </button    >
        )}
        
        {!!clientLoaded && !!allValid && (<>
            <button className="flex-col z-100 pa-1 opaci-chov--50  tx-lgx  bord-r-50" 
                onClick={()=>{window.location.href = "/learn"}}
                style={
                    {
                        background: "linear-gradient(180deg, #cccccc, #AAAAAA 30%, #0F0F0D 100%)",
                    }
                }
            >
                
                <div 
                    className="button- 29 py-2 px-4 bord-r-50 tx-altfont-2"
                    // className="px-2 py-1 bg-w-50" 
                    style={{
                        background: "linear-gradient(170deg, #1129C1, #1994FC)",
                        color: "#ffffff",
                        // border: "2px solid #ffcc77",
                        textShadow: "2px 2px 1px #003377",
                        // borderRadius: "20px",
                        // textShadow: "0 0 10px #ff7700aa, -1px -1px 0 #ffcc77, 2px -2px 0 #ffcc77"
                }}>
                    Continue <br /> Game
                </div>
                {/* <div className="tx-altfont-2 tx-xl opaci-chov--50 hover-4">
                    <div style={{
                        color: "#3388ff",
                    textShadow: "0 0 10px #0077ff66, -1px -1px 0 #00ccff, 2px -2px 0 #00ccff"
                }}>Continue!</div>
                </div> */}
            </button>
        </>)}
        
        <div className="flex-col z-100 bg-w-90 opaci-chov--50 bg-glass-5 box-shadow-2-b pa-2 bord-r-15" 
            onClick={()=>{window.location.href = "/map"}}
        >
            <div className="tx-altfont-1 tx-lgx  ">
                <div style={{
                    // color: "#3388ff",
                // textShadow: "0 0 10px #0077ff66, -1px -1px 0 #00ccff, 2px -2px 0 #00ccff"
            }}>Open Map</div>
            </div>
        </div>
        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
            <Canvas shadows camera={{ position: [5, 5, 5] }}>
                <HomeScreenGroup  />
        </Canvas>
        </div>
    </>)
}

