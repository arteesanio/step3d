import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions";
import { clusterApiUrl, ComputeBudgetInstruction, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const payload:ActionGetResponse = {
        icon: new URL("/solana.png", new URL(request.url).origin).toString(),
        label: "Send Memo",
        description: "Send a memo to the specified address",
        title: "Memo Demo",
    }
    return Response.json( payload, {  headers: ACTIONS_CORS_HEADERS, } );
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
                data: Buffer.from("this is a simple memo msg", "utf8"),
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
