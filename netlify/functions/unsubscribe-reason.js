/**
 * Netlify Function: unsubscribe-reason
 *
 * Receives optional feedback after a user unsubscribes.
 * Best-effort — non-critical.
 *
 * Endpoint: POST /.netlify/functions/unsubscribe-reason
 * Body: { email: string, reason: string, other?: string }
 */

export default async function handler(req) {

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body;
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { email, reason, other } = body;

    if (!email || !reason) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    console.log('[unsubscribe-reason] Received:', {
        email,
        reason,
        other: other || null,
        timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}