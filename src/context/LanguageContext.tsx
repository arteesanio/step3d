"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { firstStageQuizSets, Language, QuizSet, secondStageQuizSets, thirdStageQuizSets } from '../scripts/helpers';
import { useLocalStorage } from 'usehooks-ts';
import { TIERPACK_NAMES } from '../../script/constant/DEFAULT_PACKS';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    levelZero_quizOptions: QuizSet;
    levelOne_quizOptions: QuizSet;
    levelTwo_quizOptions: QuizSet;
    levelThree_quizOptions: QuizSet;
    levelFour_quizOptions: QuizSet;
    levelFive_quizOptions: QuizSet;
    levelSix_quizOptions: QuizSet;
    secondStage_levelSets: QuizSet[];
    thirdStage_levelSets: QuizSet[];
    tierpackNames: string[];
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'es',
    setLanguage: () => {},
    levelZero_quizOptions: firstStageQuizSets.en[0],
    levelOne_quizOptions: firstStageQuizSets.en[1],
    levelTwo_quizOptions: firstStageQuizSets.en[2],
    levelThree_quizOptions: firstStageQuizSets.en[3],
    levelFour_quizOptions: firstStageQuizSets.en[4],
    levelFive_quizOptions: firstStageQuizSets.en[5],
    levelSix_quizOptions: firstStageQuizSets.en[6],
    secondStage_levelSets: secondStageQuizSets.en,
    thirdStage_levelSets: thirdStageQuizSets.en,
    tierpackNames: TIERPACK_NAMES.en
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useLocalStorage<Language>('lang', 'es');

    // make all these use memo
    const levelZero_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[0] || [], [language]);
    const levelOne_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[1] || [], [language]);
    const levelTwo_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[2] || [], [language]);
    const levelThree_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[3] || [], [language]);
    const levelFour_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[4] || [], [language]);
    const levelFive_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[5] || [], [language]);
    const levelSix_quizOptions = useMemo(() => firstStageQuizSets?.[language]?.[6] || [], [language]);    
    const secondStage_levelSets = useMemo(() => secondStageQuizSets[language], [language]);    
    const thirdStage_levelSets = useMemo(() => thirdStageQuizSets[language], [language]);    
    const tierpackNames = useMemo(() => TIERPACK_NAMES[language], [language]);



    // console.log("tierpackNames", tierpackNames, TIERPACK_NAMES, language);
    // const [isClientReady, s__isClientReady] = useState(false);
    // useEffect(() => {
    //     if (!isClientReady) {
    //         s__isClientReady(true)
    //         // setLanguage(window.localStorage.getItem('language') as Language)
    //         return
    //     }
    // }, [])

    return (
        <LanguageContext.Provider value={{
            language, setLanguage,
            levelZero_quizOptions,
            levelOne_quizOptions,
            levelTwo_quizOptions,
            levelThree_quizOptions,
            levelFour_quizOptions,
            levelFive_quizOptions,
            levelSix_quizOptions,

            secondStage_levelSets,
            thirdStage_levelSets,
            tierpackNames
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext); 