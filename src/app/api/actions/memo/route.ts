import { createCanvas } from "canvas";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions";
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     const payload:ActionGetResponse = {
//         icon: new URL("/solana.png", new URL(request.url).origin).toString(),
//         label: "Send Memo",
//         description: "Send a memo to the specified address",
//         title: "Memo Demo",
//     }
//     return Response.json( payload, {  headers: ACTIONS_CORS_HEADERS, } );
// }

export async function GET(request: NextRequest) {
    const livePrice = await fetchLivePrice("solana");

    // Generate dynamic image
    const dynamicImageUrl = generateDynamicImage(livePrice, request);

    const payload: ActionGetResponse = {
        icon: dynamicImageUrl, // Include the dynamically generated image URL
        label: `Send Memo`, 
        description: `Send a memo to the specified address. The current price of Solana is $${livePrice}`,
        title: "Live Memo Price Tracker",
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

// Fetch live price
async function fetchLivePrice(asset: string): Promise<number> {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`);
        const data = await response.json();
        return data[asset]?.usd || 0; // Return price or 0
    } catch (error) {
        console.error("Error fetching price:", error);
        return 0; // Default to 0 on error
    }
}

// Generate dynamic image
function generateDynamicImage(livePrice: number, request: NextRequest): string {
    const canvas = createCanvas(500, 200);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#20232a"; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add title
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#61dafb";
    ctx.fillText("Live SOL Price", 20, 40);

    // Display live price
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`$${livePrice}`, 20, 100);

    // Footer
    ctx.font = "italic 16px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText("Data from CoinGecko", 20, 180);

    // Save the image
    const buffer = canvas.toBuffer("image/png");

    // For demonstration, serve the image as a Base64-encoded URL
    // In production, consider saving to a CDN or S3 bucket
    const base64Image = buffer.toString("base64");
    return `data:image/png;base64,${base64Image}`;
}

export const OPTIONS = GET

export async function POST(request: NextRequest) {
    try {
        const body:ActionPostRequest = await request.json();
        console.log(body);
        let theAddress:PublicKey;

        try {
            theAddress = new PublicKey(body.account);
        } catch (error) {
            return Response.json("Invalid account address", { status: 400, headers: ACTIONS_CORS_HEADERS });
        }

        

        const transaction = new Transaction()
        transaction.add(
            ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1000 }),
            new TransactionInstruction({
                programId: new PublicKey(MEMO_PROGRAM_ID),
                data: Buffer.from("Your registration is being processed...", "utf8"),
                keys: [],
            })
        );
        transaction.feePayer = theAddress;

        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        const respPayload:ActionPostResponse = await createPostResponse({
            fields: {
                transaction,
                type: "transaction"
            },
        });
        return Response.json(respPayload, { headers: ACTIONS_CORS_HEADERS });
    } catch (error) {
        return Response.json("Unknown NEXTJS api error", { status: 400 });
    }
}
