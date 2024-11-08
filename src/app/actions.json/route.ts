import { ACTIONS_CORS_HEADERS } from "@solana/actions";

export async function GET(request: Request) {
    const payload = {
        "rules": [
            {
                "pathPattern": "/*",
                "url": "/api/actions/donate"
            }
        ]
    }
    return NextResponse.json(payload, {
        headers: {
            ACTIONS_CORS_HEADERS
        }
    });
}
