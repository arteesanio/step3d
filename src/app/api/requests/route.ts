import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { NextRequest } from "next/server";
import { createSolanaRequest, checkExistingSolanaRequest, checkExistingStepUser } from "@/../script/webdk";

export async function POST(request: NextRequest) {
    try {
        const body: any = await request.json();
        const makerIp = request.headers.get('x-forwarded-for') || request.ip;
        const quiz_results = body.quiz_results;
        const tgid = body.telegram_id;
        const addr = body.sol_address;
        const tg_name = body.tg_name;

        if (!addr) {
            return Response.json(
                { 
                    valid: false, 
                    message: "Both Telegram ID and Solana address are required" 
                },
                { 
                    status: 400, 
                    headers: ACTIONS_CORS_HEADERS 
                }
            );
        }

        // Check for existing solana_request with this address
        const existingRequest = await checkExistingSolanaRequest(addr);
        if (existingRequest) {
            return Response.json(
                { 
                    valid: false, 
                    message: "A request with this Solana address already exists" 
                },
                { 
                    status: 400, 
                    headers: ACTIONS_CORS_HEADERS 
                }
            );
        }

        // Check for existing step_user with this address
        const existingStepUser = await checkExistingStepUser(addr);
        if (existingStepUser) {
            return Response.json(
                { 
                    valid: false, 
                    message: "This Solana address is already registered" 
                },
                { 
                    status: 400, 
                    headers: ACTIONS_CORS_HEADERS 
                }
            );
        }

        // Create a request record
        const requestObj = await createSolanaRequest({
            telegram_id: tgid,
            tg_name: tg_name,
            sol_address: addr,
            created_ip: makerIp,
            quiz_results: quiz_results,
            status: 'pending'
        });

        return Response.json(
            {
                valid: true,
                message: "Request saved successfully",
                requestObj: requestObj
            },
            { headers: ACTIONS_CORS_HEADERS }
        );

    } catch (error) {
        console.error("Request creation error:", error);
        return Response.json(
            { 
                valid: false,
                message: "Error creating request"
            },
            { 
                status: 500,
                headers: ACTIONS_CORS_HEADERS 
            }
        );
    }
}

export const OPTIONS = POST;
