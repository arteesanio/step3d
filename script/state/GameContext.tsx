"use client"
import { createContext, useEffect, useState } from "react";
import { verifyLevelProgression } from "@/scripts/helpers";


export const GameContext = createContext<any>({
});

export function GameProvider({ children }: any) {
    const [toast, _s__toast] = useState("");

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
        s__sessionData
    }}>
        {children}
    </GameContext.Provider>
}

