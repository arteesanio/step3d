import {  ACTIONS_CORS_HEADERS } from "@solana/actions";
import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { NextRequest } from "next/server";
import { createStepUser, getStepUser, getStepUserByAddress, getStepUserByTgId } from "../../../../../../script/webdk";

const sendTokenToThisAddress = async (addr: PublicKey) => {
    try {
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
        
        // Convert secret key from base58 string to Uint8Array and create keypair
        const secretKey = bs58.decode(process.env.WALLET_PRIVATE_KEY!);
        const fromWallet = Keypair.fromSecretKey(secretKey);
        
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromWallet.publicKey,
                toPubkey: new PublicKey(addr),
                lamports: 0.004 * 1000000000, // 0.01 SOL in lamports
            })
        );

        // Send and confirm transaction
        const signature = await connection.sendTransaction(transaction, [fromWallet]);
        await connection.confirmTransaction(signature);
        
        console.log('Sent 0.01 SOL to', addr.toString(), 'Transaction:', signature);
        return signature;
    } catch (error) {
        console.error('Error sending reward SOL:', error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: any = await request.json();
        const signature = body.signature;
        const makerIp = request.headers.get('x-forwarded-for') || request.ip;
        const quiz_results = body.quiz_results;
        const tgid = body.telegram_id;
        const addr = body.sol_address;

        // If no signature, but telegram ID exists, create/return user based on telegram ID
        if (!signature && tgid) {
            const userByTgid = await getStepUserByTgId(tgid);
            
            const userByAddress = await getStepUserByAddress(addr)
            if (!!userByAddress) {
                return Response.json(
                    {
                        valid: false,
                        message: "User already exists with this address, incorrect creation order",
                        user: userByAddress
                    },
                    { headers: ACTIONS_CORS_HEADERS }
                );
            }
            if (!userByTgid) {
                const newUserByTgid = await createStepUser({
                    sol_link: addr,
                    telegram_id: tgid,
                    tg_name: body.tg_name,
                    created_ip: makerIp,
                    updated_ip: makerIp,
                    is_completed: false,
                    streak_points: 1,
                    temp_points: 1,
                    quiz_results: quiz_results,
                });
                return Response.json(
                    {
                        valid: true,
                        message: "User created with Telegram ID only",
                        user: newUserByTgid
                    },
                    { headers: ACTIONS_CORS_HEADERS }
                );
            }
            return Response.json(
                {
                    valid: true,
                    message: "User already exists with this Telegram ID",
                    user: userByTgid
                },
                { headers: ACTIONS_CORS_HEADERS }
            );
        }

        // If no signature and no telegram ID, return error
        if (!signature) {
            return Response.json(
                { valid: false, message: "No signature or Telegram ID provided" },
                { status: 400, headers: ACTIONS_CORS_HEADERS }
            );
        }

        // Connect to Solana and verify the transaction
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!);
        
        // Get transaction status
        const status = await connection.getSignatureStatus(signature);

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
                        created_ip: makerIp,
                        updated_ip: makerIp,
                        memo_sign: signature,
                        is_completed: true,
                        streak_points: 1,
                        temp_points: 1,
                        quiz_results: quiz_results,
                    })
                    sendTokenToThisAddress(addr);
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