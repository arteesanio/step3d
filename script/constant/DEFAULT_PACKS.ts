import TIERPACK_LINKS_JSON from "./TIERPACKS.json"

export const TIERPACK_COLORS = [
    ["#b5b5b5", "#999999", "#ff0000"], // getting\nstarted
    ["#A7FEDB", "#18FB9F", "#dd4400"], // crypto\nbasics
    ["#FFCB9B", "#FfFbaC", "#a17F00"], // digital\nwallets

    ["#d0f0FF", "#a0e2FF", "#339933"], // staking\nrewards
    ["#FDD9B0", "#FBBF7D", "#00ff00"], // decentralized\napps
    ["#D2FFD2", "#ffffff", "#0077ff"], // defi\nbasics

    ["#eAFcFf", "#bAF9Ff", "#0033cc"], // dapp\ndevelopment
    ["#dddddd", "#999999", "#0000ff"], // blockchain\nsafety
    ["#ddeeff", "#f0f0f0", "#ff00ff"],  // web3\ndomains
    ["#Ffeff0", "#F8d7e8", "#8D002B"],  // 
    ["#dddddd", "#999999", "#ff6600"], // 
    ["#ddeeff", "#f0f0f0", "#000000"],  // 

    ["#Ffeff0", "#F8d7e8", "#8D002B"],  // 

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

export const TIERPACK_NAMES = {
    en: [
        "Getting\nStarted",
        "Crypto\nBasics",
        "Digital\nWallets",

        "Staking\nRewards",
        "Decentralized\nApps",
        "DeFi\nBasics",

        "Dapp\nDevelopment",
        "Blockchain\nSafety",
        "Web3\nDomains",
        "Interoperability",
    ],
    es: [
        "Primeros\nPasos",
        "Conceptos\nBásicos",
        "Monederos\nDigitales",
        "Staking y\nRecompensas",
        "Apps\nDescentralizadas",
        "DeFi\nBásico",
        "Desarrollo\nDapp",
        "Seguridad\nBlockchain",
        "Dominios\nWeb3",
        "Interoperabilidad",
    ]
}




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
export const TIERPACK_REDIRECT_LINKS = [
    `/?lvl=0`,
    

    `/learn`,
    `/learn/connect`,
    `/learn/play`,

    `/learn/trends`,
    `/learn/analysis`,
    `/learn/chart-patterns`,
    `/learn/volume`,
    `/learn/signals`,

    `/learn/invest`,


]
