import crypto from "crypto";

export async function handler(event, context) {
    const redirectUri = new URL("/.netlify/functions/oauth-callback", "https://appeal.horizondevelopment.xyz");

    const state = crypto.randomBytes(25).toString("hex");

    return {
        statusCode: 303,
        headers: {
            "Location": `https://discord.com/api/oauth2/authorize?client_id=${encodeURIComponent(process.env.DISCORD_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify&prompt=none&state=${state}`,
            "Set-Cookie": `__Secure-CSRFState=${state}; Domain=appeal.horizondevelopment.xyz; Path=/.netlify/functions/oauth-callback; Secure; HttpOnly; SameSite=Lax`
        }
    };
}
