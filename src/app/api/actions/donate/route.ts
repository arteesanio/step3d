import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import { NextRequest } from "next/server";

const DONATION_ADDRESS = "6cwD1a7RXFKeTjtPmM6g4fXEsLtWS2CWFjR2oNJWrpCG";
const DONATION_AMOUNT = 0.01 * LAMPORTS_PER_SOL; // 0.01 SOL in lamports

export async function GET(request: NextRequest) {
    const payload: ActionGetResponse = {
        icon: new URL("/solana.png", new URL(request.url).origin).toString(),
        label: "Send Donation",
        description: "Send a 0.01 SOL donation",
        title: "Donation",
    }
    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

export const OPTIONS = GET;

export async function POST(request: NextRequest) {
    try {
        const body: ActionPostRequest = await request.json();
        let fromAddress: PublicKey;
        try {
            fromAddress = new PublicKey(body.account);
        } catch (error) {
            return Response.json("Invalid account address", { status: 400, headers: ACTIONS_CORS_HEADERS });
        }

        const toAddress = new PublicKey(DONATION_ADDRESS);

        const transaction = new Transaction();
        
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: fromAddress,
                toPubkey: toAddress,
                lamports: DONATION_AMOUNT,
            })
        );

        transaction.feePayer = fromAddress;

        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const respPayload: ActionPostResponse = await createPostResponse({
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
