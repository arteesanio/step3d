"use client"
import { createContext, useEffect, useMemo, useState } from "react";
import { verifyLevelProgression } from "@/scripts/helpers";
import { useLocalStorage } from "usehooks-ts";


export const GameContext = createContext<any>({
});

export function GameProvider({ children }: any) {
    const [toast, _s__toast] = useState("");

    const [LS_stageStorage, s__LS_stageStorage] = useLocalStorage<any>("stageStorage", "");
    const [live_stageStorage, s__live_stageStorage] = useState<any>(null);

    const addToStageStorage = (lvl:number) => {
        const newString = LS_stageStorage + (!LS_stageStorage ? "" : ",") + lvl
        const newArray = newString.split(",").sort().filter((v, i, self) => self.indexOf(v) === i)
        setStageStorage(newArray.join(","))
    }
    const setStageStorage = (arg:any) => {
        s__live_stageStorage(arg)
        s__LS_stageStorage(arg)
    }
    const stageStorage = useMemo(()=>{
        if(!LS_stageStorage && !live_stageStorage) return {}
        const levels = LS_stageStorage?.toString()?.split(",")
        if (!levels) { return {} }
        const obj:any = {}
        levels.forEach((lvl:string)=>{
            obj[lvl] = true
        })
        return obj
    }, [LS_stageStorage, live_stageStorage])
    const [sessionData, s__sessionData] = useState<any>({});
    const [hasCompletedAllLevels, s__hasCompletedAllLevels] = useState(false);

    useEffect(() => {
        const isComplete = verifyLevelProgression();
        s__hasCompletedAllLevels(isComplete);
      }, []);
    
    useEffect(() => {
        let sessionData:any = {}
        const localStorageData = localStorage.getItem('sessionData');
        if (localStorageData) {
            s__sessionData((prev:any) => ({ ...prev, ...JSON.parse(localStorageData) }))
        }
    }, []);

    return <GameContext.Provider value={{
        hasCompletedAllLevels,
        s__hasCompletedAllLevels,
        sessionData,
        s__sessionData,
        stageStorage,
        setStageStorage,
        addToStageStorage
    }}>
        {children}
    </GameContext.Provider>
}

