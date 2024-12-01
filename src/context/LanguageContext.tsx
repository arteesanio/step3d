"use client";
import React, { createContext, useContext, useState } from 'react';
import { firstStageQuizSets, Language, QuizSet, secondStageQuizSets } from '../scripts/helpers';
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
    tierpackNames: TIERPACK_NAMES.en
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useLocalStorage<Language>('language', 'es');
    const levelZero_quizOptions = firstStageQuizSets[language][0];
    const levelOne_quizOptions = firstStageQuizSets[language][1];
    const levelTwo_quizOptions = firstStageQuizSets[language][2];
    const levelThree_quizOptions = firstStageQuizSets[language][3];
    const levelFour_quizOptions = firstStageQuizSets[language][4];
    const levelFive_quizOptions = firstStageQuizSets[language][5];
    const levelSix_quizOptions = firstStageQuizSets[language][6];


    const secondStage_levelSets = secondStageQuizSets[language]

    const tierpackNames = TIERPACK_NAMES[language];

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

            tierpackNames
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext); 