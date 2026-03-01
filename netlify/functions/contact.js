/**
 * Netlify Function: contact
 *
 * Handles contact form submissions via SendGrid.
 *
 * Endpoint: POST /.netlify/functions/contact
 * Body: { name: string, email: string, subject: string, message: string }
 *
 * Required environment variables:
 *   SENDGRID_API_KEY
 *   CONTACT_EMAIL       — recipient address (your inbox)
 *   CONTACT_FROM_EMAIL  — verified sender address in SendGrid
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

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'A valid email address is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method:  'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
                'Content-Type':  'application/json',
            },
            body: JSON.stringify({
                personalizations: [{
                    to:      [{ email: process.env.CONTACT_EMAIL }],
                    subject: subject,
                }],
                from:     { email: process.env.CONTACT_FROM_EMAIL },
                reply_to: { email, name },
                content:  [{
                    type:  'text/plain',
                    value: `Name:    ${name}\nEmail:   ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
                }],
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.errors?.[0]?.message || 'SendGrid request failed');
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('[contact] Error:', error.message);
        return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}