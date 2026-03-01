/**
 * Netlify Function: unsubscribe
 *
 * Removes a contact from Brevo mailing list.
 *
 * Endpoint: POST /.netlify/functions/unsubscribe
 * Body: { email: string }
 *
 * Required environment variables:
 *   BREVO_API_KEY
 *   BREVO_LIST_ID
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

    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'A valid email address is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch(
            `https://api.brevo.com/v3/contacts/lists/${process.env.BREVO_LIST_ID}/contacts/remove`,
            {
                method:  'POST',
                headers: {
                    'api-key':      process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: [email] }),
            }
        );

        const data = await response.json().catch(() => ({}));
        console.log('[unsubscribe] Brevo response:', response.status, JSON.stringify(data));

        // 404 means contact not found — treat as success
        if (!response.ok && response.status !== 404) {
            throw new Error(data.message || `Brevo error: ${response.status}`);
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('[unsubscribe] Error:', error.message);
        return new Response(JSON.stringify({ error: 'Unsubscribe failed. Please try again.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}