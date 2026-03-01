/**
 * Netlify Function: subscribe
 *
 * Handles newsletter subscription via Brevo (formerly Sendinblue) API.
 * Receives email, optional name, and sections array from the frontend form.
 *
 * Endpoint: POST /.netlify/functions/subscribe
 * Body: { email: string, name?: string, sections?: string[] }
 *
 * Required environment variables (set in Netlify dashboard):
 *   BREVO_API_KEY        — your Brevo API key
 *   BREVO_LIST_ID        — numeric ID of your Brevo contact list
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

    const { email, name, sections } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'A valid email address is required' }),
        };
    }

    try {
        // Log payload before sending
        const payload = {
            email,
            attributes: {
                FIRSTNAME: firstname || '',
                LASTNAME: lastname || '',
                SECTIONS:  sections ? sections.join(', ') : '',
            },
            listIds:       [Number(process.env.BREVO_LIST_ID)],
            updateEnabled: true,
        };
        // console.log('[subscribe] Sending to Brevo:', JSON.stringify(payload));

        // Brevo: create or update contact
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method:  'POST',
            headers: {
                'api-key':      process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Always log the response
        const data = await response.json().catch(() => ({}));
        // console.log('[subscribe] Brevo response:', response.status, JSON.stringify(data));

        // Brevo returns 201 on create, 204 on update
        if (!response.ok && response.status !== 204) {
            throw new Error(data.message || `Brevo error: ${response.status}`);
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
        };

    } catch (error) {
        console.error('[subscribe] Error:', error.message);

        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Subscription failed. Please try again.' }),
        };
    }
};