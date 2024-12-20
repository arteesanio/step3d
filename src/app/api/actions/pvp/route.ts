import { createCanvas, registerFont } from "canvas";
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions";
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const fontPath = path.join(process.cwd(), 'public', 'fonts', 'raleway.ttf');


// Add this near the top of your file, after the imports
// You'll need to add these font files to your project
// registerFont('./public/fonts/Roboto-Regular.ttf', { family: 'Roboto' });
// registerFont('./public/fonts/Roboto-Bold.ttf', { family: 'Roboto', weight: 'bold' });
// registerFont('./public/fonts/Roboto-Italic.ttf', { family: 'Roboto', style: 'italic' });
// registerFont('./public/fonts/raleway.ttf', { family: 'Raleway' });
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
    // get address url param
    const address = request.nextUrl.searchParams.get('address') || "";
    // Generate dynamic image
    const dynamicImageUrl = generateDynamicImage(livePrice, address, request);

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
function generateDynamicImage(livePrice: number, address: string, request: NextRequest): string {
    registerFont(fontPath, { family: 'Raleway' });
    const canvas = createCanvas(500, 250);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#20232a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add title
    ctx.font = "20px Raleway";
    ctx.fillStyle = "#61dafb";
    ctx.textBaseline = "top";
    ctx.fillText("Live SOL Price", 20, 40);

    // Display live price
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "top";
    ctx.fillText(`$${livePrice.toFixed(2)}`, 20, 100);

    if (address) {
        // Footer
        ctx.fillStyle = "#cccccc";
        ctx.textBaseline = "top";
        ctx.fillText(`Target Address: ${address}`, 20, 180);
    }

    const buffer = canvas.toBuffer("image/png");
    const base64Image = buffer.toString("base64");
    return `data:image/png;base64,${base64Image}`;
}

export const OPTIONS = GET

export async function POST(request: NextRequest) {
    try {
        const body:ActionPostRequest = await request.json();
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
