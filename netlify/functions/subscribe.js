/**
 * Netlify Function: subscribe
 *
 * Handles newsletter subscription via ConvertKit API.
 * Receives email, optional name, and sections array from the frontend form.
 *
 * Endpoint: POST /.netlify/functions/subscribe
 * Body: { email: string, name?: string, sections?: string[] }
 *
 * Required environment variables (set in Netlify dashboard):
 *   CONVERTKIT_API_KEY
 *   CONVERTKIT_FORM_ID
 */

exports.handler = async function (event) {

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid JSON' }),
        };
    }

    const { email, name, sections } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'A valid email address is required' }),
        };
    }

    try {
        // Build ConvertKit payload
        // sections are stored as a custom field — adjust field name to match
        // your ConvertKit custom fields if needed
        const payload = {
            api_secret:    process.env.CONVERTKIT_API_KEY,
            email:      email,
            first_name: name || '',
            fields: {
                sections: sections ? sections.join(', ') : '',
            },
        };

        const response = await fetch(
            `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
            {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload),
            }
        );

        const data = await response.json();
console.log('[subscribe] ConvertKit response:', JSON.stringify(data));
        if (!response.ok) {
            throw new Error(data.message || 'ConvertKit subscription failed');
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
