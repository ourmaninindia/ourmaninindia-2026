/**
 * Netlify Function: contact
 *
 * Handles contact form submissions via SendGrid.
 *
 * Endpoint: POST /.netlify/functions/contact
 * Body: { name: string, email: string, message: string }
 *
 * Required environment variables (set in Netlify dashboard):
 *   SENDGRID_API_KEY
 *   CONTACT_EMAIL       — recipient address (your inbox)
 *   CONTACT_FROM_EMAIL  — verified sender address in SendGrid
 */

exports.handler = async function (event) {

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Invalid JSON' }),
        };
    }

    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'All fields are required' }),
        };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'A valid email address is required' }),
        };
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
                    subject: `New contact form message from ${name}`,
                }],
                from:    { email: process.env.CONTACT_FROM_EMAIL },
                reply_to: { email, name },
                content: [{
                    type:  'text/plain',
                    value: `Name:    ${name}\nEmail:   ${email}\n\nMessage:\n${message}`,
                }],
            }),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.errors?.[0]?.message || 'SendGrid request failed');
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
        };

    } catch (error) {
        console.error('[contact] Error:', error.message);

        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to send message. Please try again.' }),
        };
    }
};