/**
 * Netlify Function: unsubscribe-reason
 *
 * Receives optional feedback after a user unsubscribes.
 * Logs the reason and optionally forwards it to your email or analytics.
 *
 * Endpoint: POST /api/unsubscribe-reason
 * Body: { email: string, reason: string, other?: string }
 *
 * This is a best-effort endpoint — the unsubscribe has already succeeded
 * before this is called, so failures here are non-critical.
 */

export default async function handler(req, context) {

    // Only accept POST
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

    // Log for Netlify function logs (visible in Netlify dashboard)
    console.log('Unsubscribe reason received:', {
        email,
        reason,
        other: other || null,
        timestamp: new Date().toISOString(),
    });

    // ── Optional: forward to your email provider ─────────────────────
    // If you use Mailchimp, ConvertKit, etc. you could store the reason
    // as a subscriber note or tag here. Example placeholder:
    //
    // await fetch('https://your-email-provider/api/notes', {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${process.env.EMAIL_API_KEY}` },
    //     body: JSON.stringify({ email, note: reason }),
    // });
    // ─────────────────────────────────────────────────────────────────

    return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}