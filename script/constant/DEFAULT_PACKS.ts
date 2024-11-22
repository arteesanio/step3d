import TIERPACK_LINKS_JSON from "./TIERPACKS.json"

export const TIERPACK_COLORS = [
    ["#b5b5b5", "#999999", "#ffffff"], // webpov
    ["#A7FEDB", "#18FB9F", "#7824eC"], // Solana Season
    ["#FFCB9B", "#FfFbaC", "#a12F00"], // AI Future
    ["#d0f0FF", "#a0e2FF", "#333333"], // Coinbase Ventures
    ["#FDD9B0", "#FBBF7D", "#ffffff"], // a16z
    ["#D2FFD2", "#ffffff", "#000000"], // paradigm
    ["#eAFcFf", "#bAF9Ff", "#e0f0e0"], // winkelvoss
    ["#dddddd", "#999999", "#ff6600"], // btc/neco
    ["#ddeeff", "#f0f0f0", "#000000"],  // Layer 1

    ["#Ffeff0", "#F8d7e8", "#8D002B"],  // technology\npoet

]


// Volumen 1: Introducción a la blockchain y al ecosistema de Solana.
// Volumen 2: Conceptos básicos de criptomonedas y su uso en la vida diaria.
// Volumen 3: Creación y gestión de monederos digitales en Solana.
// Volumen 4: Cómo realizar staking y obtener rendimientos con tus criptomonedas.
// Volumen 5: Exploración de tokens no fungibles (NFT) en la red de Solana.
// Volumen 6: Introducción a las finanzas descentralizadas (DeFi) en Solana.
// Volumen 7: Desarrollo de aplicaciones descentralizadas (dApps) en Solana.
// Volumen 8: Seguridad en la blockchain y protección de activos digitales.
// Volumen 9: Uso de dominios .sol y su integración en el ecosistema.
// Volumen 10: Futuras actualizaciones y el roadmap de Solana.

export const TIERPACK_NAMES = [
    "Getting\nStarted",
    
    "Crypto\nBasics",
    "Digital\nWallets",
    "Staking\nRewards",

    "NFT\nExploring",
    "DeFi\nBasics",
    "dApp\nBuilding",
    "Blockchain\nSafety",
    "Web3\nDomains",

    "Future\nTech",
]




const baseImageLink = '@/../packs'
export const TIERPACK_IMAGES = [
    `${baseImageLink}/_webpov.png`,
    

    `${baseImageLink}/_sol.png`,
    `${baseImageLink}/__ai.png`,
    `${baseImageLink}/__coinbase.png`,

    `${baseImageLink}/__a16z.png`,
    `${baseImageLink}/_paradigm.png`,
    `${baseImageLink}/_winkelvoss.png`,
    `${baseImageLink}/_bitcoin.png`,
    `${baseImageLink}/__layer1.png`,

    `${baseImageLink}/__techpoet.png`,


]


export function getTierPackLinks(tierpacks:any[], basePackUrl:string):string[] {
    const TIERPACK_LINKS = tierpacks.map(pack => {
        let url = basePackUrl;
        Object.entries(pack).forEach(([key, value], index) => {
            const params = encodeURIComponent(JSON.stringify(value));
            url += `${index === 0 ? '' : '&'}${key}=${params}`;
        });
        return url;
    });
    return TIERPACK_LINKS;
}

// export const basePackUrl = "/?"
export const basePackUrl = process.env.NODE_ENV === "production"? "https://webqub.com/trade/?" : "http://localhost:3800/trade/?"

export const TIERPACK_LINKS = getTierPackLinks(TIERPACK_LINKS_JSON ,basePackUrl);