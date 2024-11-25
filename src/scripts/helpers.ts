export interface QuizOption {
    text: string;
    correct: boolean;
}

export interface QuizSet {
    question: string;
    options: QuizOption[];
}

export const firstStageQuizSets: QuizSet[] = [
    {
        question: "What is a blockchain?",
        options: [
            { text: "Type of token", correct: false },
            { text: "Trading system", correct: false },
            { text: "Decentralized bank", correct: true },
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
        question: "How to avoid theft?",
        options: [
            { text: "Trust all links", correct: false },
            { text: "Share keys / secret phrase", correct: false },
            { text: "Check for official urls", correct: true },
            { text: "Click any wallet popups", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "How to earn rewards?",
        options: [
            { text: "Staking assets", correct: true },
            { text: "Sharing links", correct: false },
            { text: "Community Engagement", correct: true },
            { text: "Send private messages", correct: false },
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
            { text: "Upload legal document", correct: false },
            { text: "Auto-execute code", correct: false },
            { text: "Run decentralized apps", correct: true },
            { text: "Send emails", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is blockchain gas?",
        options: [
            { text: "Transaction processing fee", correct: true },
            { text: "Bribe for trading", correct: false },
            { text: "Network computation cost", correct: true },
            { text: "Cryptocurrency mining", correct: false },
            { text: "All of the above", correct: false },
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

export const secondStageQuizSets: QuizSet[] = [
    {
        question: "What is a Layer 2 blockchain solution?",
        options: [
            { text: "Secondary processing network", correct: true },
            { text: "Backup blockchain", correct: false },
            { text: "Scaling solution", correct: true },
            { text: "New cryptocurrency", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a blockchain oracle?",
        options: [
            { text: "Price predictor", correct: false },
            { text: "External data provider", correct: true },
            { text: "Smart contract helper", correct: true },
            { text: "Network validator", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is DeFi (Decentralized Finance)?",
        options: [
            { text: "Financial services on blockchain", correct: true },
            { text: "Cryptocurrency trading", correct: false },
            { text: "No intermediaries needed", correct: true },
            { text: "Digital banking", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a DAO?",
        options: [
            { text: "Decentralized organization", correct: true },
            { text: "Blockchain company", correct: false },
            { text: "Community governance", correct: true },
            { text: "Investment group", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What are NFTs used for?",
        options: [
            { text: "Digital ownership proof", correct: true },
            { text: "Just digital art", correct: false },
            { text: "Access rights", correct: true },
            { text: "Gaming assets", correct: true },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What is proof of stake?",
        options: [
            { text: "Consensus mechanism", correct: true },
            { text: "Mining method", correct: false },
            { text: "Token locking system", correct: true },
            { text: "Reward program", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a DEX?",
        options: [
            { text: "Decentralized exchange", correct: true },
            { text: "Trading platform", correct: true },
            { text: "No intermediary needed", correct: true },
            { text: "Cryptocurrency wallet", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is token bridging?",
        options: [
            { text: "Cross-chain transfer", correct: true },
            { text: "Token swapping", correct: false },
            { text: "Asset migration", correct: true },
            { text: "Network connection", correct: true },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What is a blockchain fork?",
        options: [
            { text: "Protocol change", correct: true },
            { text: "Network split", correct: true },
            { text: "New blockchain", correct: true },
            { text: "Software update", correct: false },
            { text: "All of the above", correct: false }
        ]
    }
];

// Quiz options for each level
export const levelZero_quizOptions = firstStageQuizSets[0];
export const levelOne_quizOptions = firstStageQuizSets[1];
export const levelTwo_quizOptions = firstStageQuizSets[2];
export const levelThree_quizOptions = firstStageQuizSets[3];
export const levelFour_quizOptions = firstStageQuizSets[4];
export const levelFive_quizOptions = firstStageQuizSets[5];
export const levelSix_quizOptions = firstStageQuizSets[6];
export const levelSeven_quizOptions = firstStageQuizSets[7];
export const levelEight_quizOptions = firstStageQuizSets[8]

export const secondStage_levelZero = secondStageQuizSets[0];
export const secondStage_levelOne = secondStageQuizSets[1];
export const secondStage_levelTwo = secondStageQuizSets[2];
export const secondStage_levelThree = secondStageQuizSets[3];
export const secondStage_levelFour = secondStageQuizSets[4];
export const secondStage_levelFive = secondStageQuizSets[5];
export const secondStage_levelSix = secondStageQuizSets[6];
export const secondStage_levelSeven = secondStageQuizSets[7];
export const secondStage_levelEight = secondStageQuizSets[8];

export const thirdStageQuizSets: QuizSet[] = [
    {
        question: "What is a zero-knowledge proof?",
        options: [
            { text: "Cryptographic verification method", correct: true },
            { text: "Proof without revealing data", correct: true },
            { text: "Empty blockchain block", correct: false },
            { text: "Type of private key", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is MEV (Maximal Extractable Value)?",
        options: [
            { text: "Block ordering profit", correct: true },
            { text: "Mining reward", correct: false },
            { text: "Transaction frontrunning", correct: true },
            { text: "Network fee", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a rollup?",
        options: [
            { text: "Layer 2 scaling solution", correct: true },
            { text: "Transaction bundling", correct: true },
            { text: "Smart contract collection", correct: false },
            { text: "Blockchain merger", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is composability in DeFi?",
        options: [
            { text: "Protocol interoperability", correct: true },
            { text: "Smart contract linking", correct: true },
            { text: "Money Lego building", correct: true },
            { text: "Token creation", correct: false },
            { text: "All of the above", correct: true }
        ]
    },
    {
        question: "What is a flash loan?",
        options: [
            { text: "Uncollateralized loan", correct: true },
            { text: "Single-transaction loan", correct: true },
            { text: "Instant approval loan", correct: false },
            { text: "Long-term loan", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a sidechain?",
        options: [
            { text: "Independent blockchain", correct: true },
            { text: "Connected to mainnet", correct: true },
            { text: "Alternative consensus", correct: true },
            { text: "Backup network", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is account abstraction?",
        options: [
            { text: "Smart contract wallets", correct: true },
            { text: "Simplified user experience", correct: true },
            { text: "Custom transaction logic", correct: true },
            { text: "Account privacy", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a state channel?",
        options: [
            { text: "Off-chain transactions", correct: true },
            { text: "Direct participant link", correct: true },
            { text: "Reduced gas fees", correct: true },
            { text: "Network partition", correct: false },
            { text: "All of the above", correct: false }
        ]
    },
    {
        question: "What is a recursive zero-knowledge proof?",
        options: [
            { text: "Proof verifying proofs", correct: true },
            { text: "Scalability solution", correct: true },
            { text: "Complex computation proof", correct: true },
            { text: "Transaction privacy", correct: false },
            { text: "All of the above", correct: false }
        ]
    }
];

// Add these exports
export const thirdStage_levelZero = thirdStageQuizSets[0];
export const thirdStage_levelOne = thirdStageQuizSets[1];
export const thirdStage_levelTwo = thirdStageQuizSets[2];
export const thirdStage_levelThree = thirdStageQuizSets[3];
export const thirdStage_levelFour = thirdStageQuizSets[4];
export const thirdStage_levelFive = thirdStageQuizSets[5];
export const thirdStage_levelSix = thirdStageQuizSets[6];
export const thirdStage_levelSeven = thirdStageQuizSets[7];
export const thirdStage_levelEight = thirdStageQuizSets[8];

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
    return firstStageQuizSets[index % firstStageQuizSets.length];
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

export const verifyLevelProgression = () => {
    const level1Time = parseInt(localStorage.getItem('level1_completion') || '0');
    const level2Time = parseInt(localStorage.getItem('level2_completion') || '0');
    const level3Time = parseInt(localStorage.getItem('level3_completion') || '0');
    const level4Time = parseInt(localStorage.getItem('level4_completion') || '0');
    const level5Time = parseInt(localStorage.getItem('level5_completion') || '0');
    const level6Time = parseInt(localStorage.getItem('level6_completion') || '0');
    const level7Time = parseInt(localStorage.getItem('level7_completion') || '0');
    const level8Time = parseInt(localStorage.getItem('level8_completion') || '0');

    // Verify timestamps are in chronological order
    if (level1Time === 0 || level2Time === 0 || level3Time === 0 || 
        level4Time === 0 || level5Time === 0 || level6Time === 0 || 
        level7Time === 0 || level8Time === 0) {
        return false;
    }

    return (
        level1Time < level2Time &&
        level2Time < level3Time &&
        level3Time < level4Time &&
        level4Time < level5Time &&
        level5Time < level6Time &&
        level6Time < level7Time &&
        level7Time < level8Time
    );
}; 