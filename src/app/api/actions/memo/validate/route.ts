import {  ACTIONS_CORS_HEADERS } from "@solana/actions";
import { Connection } from "@solana/web3.js";
import { NextRequest } from "next/server";
import { createStepUser, getStepUser, getStepUserByAddress, getStepUserByTgId } from "../../../../../../script/webdk";

export async function POST(request: NextRequest) {
    try {
        const body: any = await request.json();
        
        // Extract the signature from the request
        const signature = body.signature;
        if (!signature) {
            return Response.json(
                { valid: false, message: "No signature provided" },
                { status: 400, headers: ACTIONS_CORS_HEADERS }
            );
        }

        // Connect to Solana and verify the transaction
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
        
        // Get transaction status
        const status = await connection.getSignatureStatus(signature);

        const makerIp = request.headers.get('x-forwarded-for') || request.ip;
        const quiz_results = body.quiz_results;
        // Check if transaction was confirmed
        if (status.value?.confirmationStatus === 'confirmed' || 
            status.value?.confirmationStatus === 'finalized') {
            const addr = body.sol_address
            const tgid = body.telegram_id
            // check if address is valid and user exists
            if (addr) {
                const userByAddress = await getStepUserByAddress(addr)
                if (!userByAddress) {
                    const newUserByAddress = await createStepUser({
                        sol_address: addr,
                        telegram_id: body.telegram_id,
                        tg_name: body.tg_name,
                        created_ip: makerIp,
                        updated_ip: makerIp,
                        memo_sign: signature,
                        is_completed: true,
                        streak_points: 1,
                        temp_points: 1,
                        quiz_results: quiz_results,
                    })
                
                    return Response.json(
                        { 
                            valid: true,
                            message: "Transaction confirmed successfully and user created newUserByAddress",
                            user: newUserByAddress
                        },
                        { headers: ACTIONS_CORS_HEADERS }
                    );
                } else {
                    return Response.json(
                        {
                            valid:  true,
                            message: "Transaction confirmed successfully and user already exists",
                            user: userByAddress
                        },
                        { headers: ACTIONS_CORS_HEADERS }
                    );
                }
            } else if (tgid) {
                const userByTgid = await getStepUserByTgId(tgid)
                if (!userByTgid) {
                    const newUserByTgid = await createStepUser({
                        telegram_id: tgid,
                        tg_name: body.tg_name,
                        sol_address: addr,
                        created_ip: makerIp,
                        updated_ip: makerIp,
                        is_completed: true,
                        streak_points: 1,
                        temp_points: 1,
                        quiz_results: quiz_results,
                    })
                    return Response.json(
                        { 
                            valid: true,
                            message: "Transaction confirmed successfully and user created newUserByTgid",
                            user: newUserByTgid
                        },
                        { headers: ACTIONS_CORS_HEADERS }
                    );
                }
            }
        } else {
            return Response.json(
                { 
                    valid: false,
                    message: "Transaction not confirmed"
                },
                { headers: ACTIONS_CORS_HEADERS }
            );
        }

    } catch (error) {
        console.error("Validation error:", error);
        return Response.json(
            { 
                valid: false,
                message: "Error validating transaction"
            },
            { 
                status: 500,
                headers: ACTIONS_CORS_HEADERS 
            }
        );
    }
}

export const OPTIONS = POST; 