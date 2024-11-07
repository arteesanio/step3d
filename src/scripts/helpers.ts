export interface QuizOption {
    text: string;
    correct: boolean;
}

export interface QuizSet {
    question: string;
    options: QuizOption[];
}

export const quizSets: QuizSet[] = [
    {
        question: "What is blockchain?",
        options: [
            { text: "Type of cryptocurrency", correct: false },
            { text: "Trading system", correct: false },
            { text: "Decentralized notebook", correct: true },
            { text: "Social media", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "Why use cryptocurrencies?",
        options: [
            { text: "Fast global transfers", correct: true },
            { text: "Only for trading", correct: false },
            { text: "To play games", correct: true },
            { text: "Store photos", correct: true },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What is a wallet secret phrase?",
        options: [
            { text: "Bank account", correct: false },
            { text: "Password manager", correct: true },
            { text: "Keys to access funds", correct: true },
            { text: "Social media account", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "How to avoid crypto scams?",
        options: [
            { text: "Trust all links", correct: false },
            { text: "Share secret phrase or keys", correct: false },
            { text: "Verify all links sources", correct: true },
            { text: "Avoid clicking all popups", correct: true },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "How to earn rewards?",
        options: [
            { text: "Staking assets", correct: true },
            { text: "Share links", correct: false },
            { text: "Community Engagement", correct: true },
            { text: "Send emails", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a liquidity pool?",
        options: [
            { text: "Trading reserve funds", correct: true },
            { text: "Water storage", correct: false },
            { text: "Crypto mining pool", correct: false },
            { text: "Savings account", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What does a smart contract do?",
        options: [
            { text: "Legal document", correct: false },
            { text: "Auto-executing code", correct: false },
            { text: "Blockchain mini apps", correct: true },
            { text: "Send emails", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "How to avoid crypto scams (Advanced)?",
        options: [
            { text: "Check contract code", correct: true },
            { text: "Trust influencers links", correct: false },
            { text: "Google and research source", correct: true },
            { text: "Invest for quick returns", correct: false },
            { text: "Protect secret wallet info", correct: false },
        ]
    },
    {
        question: "What is Solana?",
        options: [
            { text: "High-speed blockchain", correct: true },
            { text: "Social media platform", correct: false },
            { text: "Low-cost tx blockchain", correct: true },
            { text: "Gaming console", correct: false },
            { text: "Cryptocurrency", correct: false },
        ]
    },
];

// Quiz options for each level
export const levelZero_quizOptions = quizSets[0];
export const levelOne_quizOptions = quizSets[1];
export const levelTwo_quizOptions = quizSets[2];
export const levelThree_quizOptions = quizSets[3];
export const levelFour_quizOptions = quizSets[4];
export const levelFive_quizOptions = quizSets[5];
export const levelSix_quizOptions = quizSets[6];
export const levelSeven_quizOptions = quizSets[7];
export const levelEight_quizOptions = quizSets[8]

export const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    
    // Find "All of the above" option if it exists
    const allOfAboveIndex = shuffled.findIndex((item: any) => 
        item.text?.toLowerCase().includes("all") && 
        (item.text?.toLowerCase().includes("option") || item.text?.toLowerCase().includes("above"))
    );

    if (allOfAboveIndex !== -1) {
        // Remove "All of the above" and store it
        const allOfAbove = shuffled.splice(allOfAboveIndex, 1)[0];
        
        // Shuffle remaining items
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Add "All of the above" back at the end
        shuffled.push(allOfAbove);
    } else {
        // Regular shuffle if no "All of the above" option
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
    }
    
    return shuffled;
};

export const getQuizByIndex = (index: number): QuizSet => {
    return quizSets[index % quizSets.length];
};

// Helper to get quiz options by level name
export const getQuizByLevel = (level: string): QuizSet => {
    switch(level) {
        case "zero": return levelZero_quizOptions;
        case "one": return levelOne_quizOptions;
        case "two": return levelTwo_quizOptions;
        case "three": return levelThree_quizOptions;
        case "four": return levelFour_quizOptions;
        case "five": return levelFive_quizOptions;
        case "six": return levelSix_quizOptions;
        case "seven": return levelSeven_quizOptions;
        default: return levelZero_quizOptions;
    }
}; 